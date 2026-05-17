import { HttpException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { LinkProcessingQueueService } from "../queue/link-processing-queue.service";
import { UsageService } from "../usage/usage.service";
import { SavedItemsService } from "./saved-items.service";

describe("SavedItemsService", () => {
  const userId = "7c80b8ba-b880-44e6-bf5c-cae227fc0f68";
  const itemId = "d84b4860-2402-44db-9122-1676e06574d0";
  const createdAt = new Date("2026-05-17T12:00:00.000Z");
  const savedItem = {
    id: itemId,
    userId,
    categoryId: null,
    url: "https://Example.com/article/#section",
    normalizedUrl: "https://example.com/article",
    canonicalUrl: null,
    title: null,
    description: null,
    thumbnailUrl: null,
    sourceDomain: "example.com",
    sourcePlatform: null,
    contentType: null,
    language: null,
    summary: null,
    shortSummary: null,
    rawText: null,
    mainPoints: null,
    processingStatus: "pending",
    extractionStatus: null,
    processingError: null,
    userNotes: null,
    createdAt,
    updatedAt: createdAt,
    deletedAt: null,
    category: null,
    savedItemTags: [],
  };

  let prisma: {
    savedItem: {
      create: jest.Mock;
      findFirst: jest.Mock;
      update: jest.Mock;
      findMany: jest.Mock;
      count: jest.Mock;
    };
    category: {
      findFirst: jest.Mock;
    };
    savedItemTag: {
      deleteMany: jest.Mock;
      create: jest.Mock;
    };
    tag: {
      upsert: jest.Mock;
    };
  };
  let usageService: jest.Mocked<Pick<UsageService, "canSaveLink" | "incrementUsage">>;
  let linkProcessingQueueService: jest.Mocked<Pick<LinkProcessingQueueService, "enqueueSavedItem">>;
  let service: SavedItemsService;

  beforeEach(() => {
    prisma = {
      savedItem: {
        create: jest.fn().mockResolvedValue(savedItem),
        findFirst: jest.fn().mockResolvedValue(savedItem),
        update: jest.fn().mockResolvedValue(savedItem),
        findMany: jest.fn().mockResolvedValue([savedItem]),
        count: jest.fn().mockResolvedValue(1),
      },
      category: {
        findFirst: jest.fn(),
      },
      savedItemTag: {
        deleteMany: jest.fn().mockResolvedValue({ count: 0 }),
        create: jest.fn().mockResolvedValue({}),
      },
      tag: {
        upsert: jest.fn().mockResolvedValue({
          id: "7350f720-4fda-4377-a382-9ff3c53fb629",
          name: "AI",
          slug: "ai",
        }),
      },
    };
    usageService = {
      canSaveLink: jest.fn().mockResolvedValue(true),
      incrementUsage: jest.fn().mockResolvedValue(undefined),
    };
    linkProcessingQueueService = {
      enqueueSavedItem: jest.fn().mockResolvedValue("job-1"),
    };
    service = new SavedItemsService(
      prisma as unknown as PrismaService,
      usageService as unknown as UsageService,
      linkProcessingQueueService as unknown as LinkProcessingQueueService
    );
  });

  it("saves a link within the user's limit", async () => {
    const result = await service.create(userId, {
      url: "https://Example.com/article/#section",
    });

    expect(usageService.canSaveLink).toHaveBeenCalledWith(userId);
    expect(prisma.savedItem.create).toHaveBeenCalledWith({
      data: {
        userId,
        url: "https://Example.com/article/#section",
        normalizedUrl: "https://example.com/article",
        sourceDomain: "example.com",
        processingStatus: "pending",
      },
    });
    expect(usageService.incrementUsage).toHaveBeenCalledWith(userId, "saved_links");
    expect(linkProcessingQueueService.enqueueSavedItem).toHaveBeenCalledWith({
      savedItemId: itemId,
      userId,
    });
    expect(result).toEqual({
      id: itemId,
      url: "https://Example.com/article/#section",
      normalized_url: "https://example.com/article",
      title: null,
      processing_status: "pending",
      created_at: "2026-05-17T12:00:00.000Z",
    });
  });

  it("rejects saving a link over the user's limit", async () => {
    usageService.canSaveLink.mockResolvedValue(false);

    await expect(
      service.create(userId, {
        url: "https://example.com/article",
      })
    ).rejects.toMatchObject({
      message: "You have reached your monthly saved links limit.",
    });
    expect(prisma.savedItem.create).not.toHaveBeenCalled();
    expect(usageService.incrementUsage).not.toHaveBeenCalled();
    expect(linkProcessingQueueService.enqueueSavedItem).not.toHaveBeenCalled();
  });

  it("prevents access to another user's item", async () => {
    prisma.savedItem.findFirst.mockResolvedValue(null);

    await expect(service.findOne(userId, itemId)).rejects.toBeInstanceOf(NotFoundException);
    expect(prisma.savedItem.findFirst).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          id: itemId,
          userId,
          deletedAt: null,
        },
      })
    );
  });

  it("updates an owned item", async () => {
    const result = await service.update(userId, itemId, {
      title: "Updated title",
      tags: ["AI", "Research"],
      user_notes: "Important reference.",
    });

    expect(prisma.savedItem.update).toHaveBeenCalledWith({
      where: { id: itemId },
      data: {
        title: "Updated title",
        categoryId: undefined,
        userNotes: "Important reference.",
      },
    });
    expect(prisma.savedItemTag.deleteMany).toHaveBeenCalledWith({
      where: { savedItemId: itemId },
    });
    expect(prisma.tag.upsert).toHaveBeenCalledTimes(2);
    expect(result).toEqual({
      id: itemId,
      updated: true,
    });
  });

  it("soft deletes an owned item", async () => {
    const result = await service.remove(userId, itemId);

    expect(prisma.savedItem.update).toHaveBeenCalledWith({
      where: { id: itemId },
      data: { deletedAt: expect.any(Date) },
    });
    expect(result).toEqual({
      id: itemId,
      deleted: true,
    });
  });
});
