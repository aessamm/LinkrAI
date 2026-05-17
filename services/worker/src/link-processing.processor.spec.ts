import { Job } from "bullmq";
import { LinkProcessingProcessor } from "./link-processing.processor";

describe("LinkProcessingProcessor", () => {
  it("marks saved item processing then completed", async () => {
    const prisma = {
      savedItem: {
        findFirst: jest.fn().mockResolvedValue({
          id: "saved-item-1",
          userId: "user-1",
          normalizedUrl: "https://example.com/article",
        }),
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
      },
    };
    const linkExtractor = {
      extract: jest.fn().mockResolvedValue({
        title: "Article title",
        description: "Article description",
        image: "https://example.com/image.jpg",
        canonicalUrl: "https://example.com/article",
        sourceDomain: "example.com",
        contentType: "article",
        rawText: "Long readable article text.",
        extractionStatus: "partial_content",
        error: null,
      }),
    };
    const processor = new LinkProcessingProcessor(prisma as never, linkExtractor as never);

    await expect(
      processor.process({
        data: {
          savedItemId: "saved-item-1",
          userId: "user-1",
        },
      } as Job)
    ).resolves.toEqual({
      savedItemId: "saved-item-1",
      status: "completed",
    });

    expect(prisma.savedItem.updateMany).toHaveBeenNthCalledWith(1, {
      where: {
        id: "saved-item-1",
        userId: "user-1",
        deletedAt: null,
      },
      data: {
        processingStatus: "processing",
        processingError: null,
      },
    });
    expect(prisma.savedItem.updateMany).toHaveBeenNthCalledWith(2, {
      where: {
        id: "saved-item-1",
        userId: "user-1",
        deletedAt: null,
      },
      data: {
        processingStatus: "completed",
        extractionStatus: "partial_content",
        processingError: null,
        title: "Article title",
        description: "Article description",
        thumbnailUrl: "https://example.com/image.jpg",
        canonicalUrl: "https://example.com/article",
        sourceDomain: "example.com",
        contentType: "article",
        rawText: "Long readable article text.",
      },
    });
  });

  it("marks saved item failed when simulated processing fails", async () => {
    const prisma = {
      savedItem: {
        findFirst: jest.fn().mockResolvedValue({
          id: "saved-item-1",
          userId: "user-1",
          normalizedUrl: "https://example.com/article",
        }),
        updateMany: jest
          .fn()
          .mockResolvedValueOnce({ count: 1 })
          .mockRejectedValueOnce(new Error("database failed"))
          .mockResolvedValueOnce({ count: 1 }),
      },
    };
    const linkExtractor = {
      extract: jest.fn().mockResolvedValue({
        title: null,
        description: null,
        image: null,
        canonicalUrl: null,
        sourceDomain: "example.com",
        contentType: "unknown",
        rawText: null,
        extractionStatus: "failed",
        error: "fetch failed",
      }),
    };
    const processor = new LinkProcessingProcessor(prisma as never, linkExtractor as never);

    await expect(
      processor.process({
        data: {
          savedItemId: "saved-item-1",
          userId: "user-1",
        },
      } as Job)
    ).rejects.toThrow("database failed");

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
