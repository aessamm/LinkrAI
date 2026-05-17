import { PrismaClient } from "@prisma/client";
import { Job } from "bullmq";
import { AiProvider } from "./ai/ai-provider";
import { OpenAiProvider } from "./ai/openai-provider";
import { CategoryTagService } from "./enrichment/category-tag.service";
import { LinkExtractor } from "./extraction/link-extractor";
import { LinkProcessingJobData } from "./queue";
import { WorkerUsageService } from "./usage/worker-usage.service";

export class LinkProcessingProcessor {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly linkExtractor = new LinkExtractor(),
    private readonly aiProvider: AiProvider | null = OpenAiProvider.fromEnv(),
    private readonly usageService = new WorkerUsageService(prisma),
    private readonly categoryTagService = new CategoryTagService(prisma)
  ) {}

  async process(job: Job<LinkProcessingJobData>) {
    const { savedItemId, userId } = job.data;
    console.log(`Processing saved item ${savedItemId} for user ${userId}`);

    try {
      await this.prisma.savedItem.updateMany({
        where: {
          id: savedItemId,
          userId,
          deletedAt: null,
        },
        data: {
          processingStatus: "processing",
          processingError: null,
        },
      });

      const item = await this.prisma.savedItem.findFirst({
        where: {
          id: savedItemId,
          userId,
          deletedAt: null,
        },
      });

      if (!item) {
        throw new Error("Saved item not found.");
      }

      const extraction = await this.linkExtractor.extract(item.normalizedUrl);
      const existingCategories = await this.categoryTagService.getExistingCategoryNames(userId);
      const aiResult = await this.tryAiEnrichment(userId, {
        title: extraction.title ?? item.title,
        description: extraction.description ?? item.description,
        sourceDomain: extraction.sourceDomain,
        contentType: extraction.contentType,
        rawText: extraction.rawText,
        existingCategories,
      });

      if (aiResult.result) {
        await this.categoryTagService.assignCategoryAndTags({
          userId,
          savedItemId,
          suggestedCategory: aiResult.result.suggestedCategory,
          tags: aiResult.result.tags,
        });
        await this.usageService.incrementAiSummaries(userId);
      }

      const embeddingResult = await this.tryEmbedding({
        title: extraction.title ?? item.title,
        description: extraction.description ?? item.description,
        summary: aiResult.result?.summary ?? null,
        shortSummary: aiResult.result?.shortSummary ?? null,
        rawText: extraction.rawText,
      });

      await this.prisma.savedItem.updateMany({
        where: {
          id: savedItemId,
          userId,
          deletedAt: null,
        },
        data: {
          processingStatus: "completed",
          extractionStatus: extraction.extractionStatus,
          title: extraction.title,
          description: extraction.description,
          thumbnailUrl: extraction.image,
          canonicalUrl: extraction.canonicalUrl,
          sourceDomain: extraction.sourceDomain,
          contentType: extraction.contentType,
          rawText: extraction.rawText,
          summary: aiResult.result?.summary,
          shortSummary: aiResult.result?.shortSummary,
          language: aiResult.result?.language,
          mainPoints: aiResult.result?.mainPoints,
          processingError: embeddingResult.error ?? aiResult.error ?? extraction.error,
        },
      });

      if (embeddingResult.embedding) {
        await this.saveEmbedding(savedItemId, userId, embeddingResult.embedding);
      }

      console.log(`Completed saved item ${savedItemId}`);
      return { savedItemId, status: "completed" };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown processing error.";
      await this.markFailed(savedItemId, userId, message);
      throw error;
    }
  }

  private async tryEmbedding(input: {
    title: string | null;
    description: string | null;
    summary: string | null;
    shortSummary: string | null;
    rawText: string | null;
  }) {
    if (!this.aiProvider) {
      return { embedding: null, error: "Embedding skipped: OPENAI_API_KEY is not configured." };
    }

    const text = [input.title, input.description, input.shortSummary, input.summary, input.rawText?.slice(0, 12000)]
      .filter(Boolean)
      .join("\n\n");

    if (!text.trim()) {
      return { embedding: null, error: "Embedding skipped: no extracted text was available." };
    }

    try {
      return { embedding: await this.aiProvider.embed(text), error: null };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown embedding error.";
      return { embedding: null, error: `Embedding failed: ${message}` };
    }
  }

  private async saveEmbedding(savedItemId: string, userId: string, embedding: number[]) {
    const vector = `[${embedding.map((value) => Number(value).toFixed(8)).join(",")}]`;
    await this.prisma.$executeRaw`
      UPDATE saved_items
      SET embedding = ${vector}::vector
      WHERE id = ${savedItemId}::uuid
        AND user_id = ${userId}::uuid
        AND deleted_at IS NULL
    `;
  }

  private async tryAiEnrichment(
    userId: string,
    input: Parameters<NonNullable<AiProvider>["enrich"]>[0]
  ) {
    if (!this.aiProvider) {
      return { result: null, error: "AI enrichment skipped: OPENAI_API_KEY is not configured." };
    }

    if (!(await this.usageService.canGenerateSummary(userId))) {
      return { result: null, error: "AI enrichment skipped: monthly summary limit reached." };
    }

    try {
      return { result: await this.aiProvider.enrich(input), error: null };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown AI enrichment error.";
      return { result: null, error: `AI enrichment failed: ${message}` };
    }
  }

  private async markFailed(savedItemId: string, userId: string, message: string) {
    await this.prisma.savedItem.updateMany({
      where: {
        id: savedItemId,
        userId,
        deletedAt: null,
      },
      data: {
        processingStatus: "failed",
        processingError: message,
      },
    });
  }
}
