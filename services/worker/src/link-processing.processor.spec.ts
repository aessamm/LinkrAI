import { Job } from "bullmq";
import { LinkProcessingProcessor } from "./link-processing.processor";

describe("LinkProcessingProcessor", () => {
  const savedItem = {
    id: "saved-item-1",
    userId: "user-1",
    normalizedUrl: "https://example.com/article",
    title: null,
    description: null,
  };
  const extraction = {
    title: "Article title",
    description: "Article description",
    image: "https://example.com/image.jpg",
    canonicalUrl: "https://example.com/article",
    sourceDomain: "example.com",
    contentType: "article",
    rawText: "Long readable article text.",
    extractionStatus: "partial_content",
    error: null,
  };
  const aiResult = {
    summary: "Detailed AI summary.",
    shortSummary: "Short AI summary.",
    language: "en",
    tags: ["AI", "Research"],
    suggestedCategory: "Research",
    mainPoints: ["Point one", "Point two"],
  };

  function createMocks() {
    const prisma = {
      savedItem: {
        findFirst: jest.fn().mockResolvedValue(savedItem),
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
      },
      $executeRaw: jest.fn().mockResolvedValue(1),
    };
    const linkExtractor = {
      extract: jest.fn().mockResolvedValue(extraction),
    };
    const aiProvider = {
      enrich: jest.fn().mockResolvedValue(aiResult),
      embed: jest.fn().mockResolvedValue([0.1, 0.2, 0.3]),
    };
    const usageService = {
      canGenerateSummary: jest.fn().mockResolvedValue(true),
      incrementAiSummaries: jest.fn().mockResolvedValue({}),
    };
    const categoryTagService = {
      getExistingCategoryNames: jest.fn().mockResolvedValue(["Research"]),
      assignCategoryAndTags: jest.fn().mockResolvedValue({
        categoryId: "category-1",
        tagIds: ["tag-1", "tag-2"],
      }),
    };

    const processor = new LinkProcessingProcessor(
      prisma as never,
      linkExtractor as never,
      aiProvider,
      usageService as never,
      categoryTagService as never
    );

    return { prisma, linkExtractor, aiProvider, usageService, categoryTagService, processor };
  }

  it("marks saved item processing then completed with AI enrichment", async () => {
    const { prisma, aiProvider, usageService, categoryTagService, processor } = createMocks();

    await expect(processor.process(createJob())).resolves.toEqual({
      savedItemId: "saved-item-1",
      status: "completed",
    });

    expect(aiProvider.enrich).toHaveBeenCalledWith({
      title: "Article title",
      description: "Article description",
      sourceDomain: "example.com",
      contentType: "article",
      rawText: "Long readable article text.",
      existingCategories: ["Research"],
    });
    expect(categoryTagService.assignCategoryAndTags).toHaveBeenCalledWith({
      userId: "user-1",
      savedItemId: "saved-item-1",
      suggestedCategory: "Research",
      tags: ["AI", "Research"],
    });
    expect(usageService.incrementAiSummaries).toHaveBeenCalledWith("user-1");
    expect(aiProvider.embed).toHaveBeenCalledWith(expect.stringContaining("Detailed AI summary."));
    expect(prisma.$executeRaw).toHaveBeenCalledTimes(1);
    expect(prisma.savedItem.updateMany).toHaveBeenNthCalledWith(2, {
      where: {
        id: "saved-item-1",
        userId: "user-1",
        deletedAt: null,
      },
      data: {
        processingStatus: "completed",
        extractionStatus: "partial_content",
        title: "Article title",
        description: "Article description",
        thumbnailUrl: "https://example.com/image.jpg",
        canonicalUrl: "https://example.com/article",
        sourceDomain: "example.com",
        contentType: "article",
        rawText: "Long readable article text.",
        summary: "Detailed AI summary.",
        shortSummary: "Short AI summary.",
        language: "en",
        mainPoints: ["Point one", "Point two"],
        processingError: null,
      },
    });
  });

  it("completes extraction when AI provider fails without incrementing usage", async () => {
    const { prisma, aiProvider, usageService, categoryTagService, processor } = createMocks();
    aiProvider.enrich.mockRejectedValue(new Error("OpenAI unavailable"));

    await expect(processor.process(createJob())).resolves.toEqual({
      savedItemId: "saved-item-1",
      status: "completed",
    });

    expect(categoryTagService.assignCategoryAndTags).not.toHaveBeenCalled();
    expect(usageService.incrementAiSummaries).not.toHaveBeenCalled();
    expect(prisma.savedItem.updateMany).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        data: expect.objectContaining({
          processingStatus: "completed",
          summary: undefined,
          processingError: "AI enrichment failed: OpenAI unavailable",
        }),
      })
    );
  });

  it("keeps item completed when embedding generation fails", async () => {
    const { prisma, aiProvider, processor } = createMocks();
    aiProvider.embed.mockRejectedValue(new Error("embedding unavailable"));

    await expect(processor.process(createJob())).resolves.toEqual({
      savedItemId: "saved-item-1",
      status: "completed",
    });

    expect(prisma.$executeRaw).not.toHaveBeenCalled();
    expect(prisma.savedItem.updateMany).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        data: expect.objectContaining({
          processingStatus: "completed",
          processingError: "Embedding failed: embedding unavailable",
        }),
      })
    );
  });

  it("skips AI when monthly summary usage is exhausted", async () => {
    const { aiProvider, usageService, processor } = createMocks();
    usageService.canGenerateSummary.mockResolvedValue(false);

    await expect(processor.process(createJob())).resolves.toEqual({
      savedItemId: "saved-item-1",
      status: "completed",
    });

    expect(aiProvider.enrich).not.toHaveBeenCalled();
    expect(usageService.incrementAiSummaries).not.toHaveBeenCalled();
  });

  it("marks saved item failed when persistence fails", async () => {
    const { prisma, processor } = createMocks();
    prisma.savedItem.updateMany
      .mockResolvedValueOnce({ count: 1 })
      .mockRejectedValueOnce(new Error("database failed"))
      .mockResolvedValueOnce({ count: 1 });

    await expect(processor.process(createJob())).rejects.toThrow("database failed");

    expect(prisma.savedItem.updateMany).toHaveBeenLastCalledWith({
      where: {
        id: "saved-item-1",
        userId: "user-1",
        deletedAt: null,
      },
      data: {
        processingStatus: "failed",
        processingError: "database failed",
      },
    });
  });
});

function createJob() {
  return {
    data: {
      savedItemId: "saved-item-1",
      userId: "user-1",
    },
  } as Job;
}
