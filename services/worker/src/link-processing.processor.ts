import { PrismaClient } from "@prisma/client";
import { Job } from "bullmq";
import { LinkExtractor } from "./extraction/link-extractor";
import { LinkProcessingJobData } from "./queue";

export class LinkProcessingProcessor {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly linkExtractor = new LinkExtractor()
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

      await this.prisma.savedItem.updateMany({
        where: {
          id: savedItemId,
          userId,
          deletedAt: null,
        },
        data: {
          processingStatus: "completed",
          extractionStatus: extraction.extractionStatus,
          processingError: extraction.error,
          title: extraction.title,
          description: extraction.description,
          thumbnailUrl: extraction.image,
          canonicalUrl: extraction.canonicalUrl,
          sourceDomain: extraction.sourceDomain,
          contentType: extraction.contentType,
          rawText: extraction.rawText,
        },
      });

      console.log(`Completed saved item ${savedItemId}`);
      return { savedItemId, status: "completed" };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown processing error.";
      await this.markFailed(savedItemId, userId, message);
      throw error;
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
