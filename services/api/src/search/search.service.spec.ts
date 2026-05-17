import { HttpException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UsageService } from "../usage/usage.service";
import { SearchEmbeddingProvider } from "./embedding.provider";
import { SearchService } from "./search.service";

describe("SearchService", () => {
  const userId = "7c80b8ba-b880-44e6-bf5c-cae227fc0f68";
  const createdAt = new Date("2026-05-17T12:00:00.000Z");
  const savedItem = {
    id: "d84b4860-2402-44db-9122-1676e06574d0",
    title: "Vector search notes",
    url: "https://example.com/vector-search",
    thumbnailUrl: null,
    shortSummary: "Semantic search with embeddings.",
    processingStatus: "completed",
    createdAt,
    category: { id: "db0f9b39-44f5-4cc3-b684-9964f22b3c42", name: "Research" },
    savedItemTags: [{ tag: { name: "AI" } }],
  };

  let prisma: {
    savedItem: {
      findMany: jest.Mock;
      count: jest.Mock;
    };
    $queryRaw: jest.Mock;
  };
  let usageService: jest.Mocked<Pick<UsageService, "canUseSemanticSearch" | "incrementUsage">>;
  let embeddingProvider: jest.Mocked<Pick<SearchEmbeddingProvider, "embed">>;
  let service: SearchService;

  beforeEach(() => {
    prisma = {
      savedItem: {
        findMany: jest.fn().mockResolvedValue([savedItem]),
        count: jest.fn().mockResolvedValue(1),
      },
      $queryRaw: jest.fn().mockResolvedValue([
        {
          id: savedItem.id,
          title: savedItem.title,
          url: savedItem.url,
          thumbnail_url: null,
          short_summary: savedItem.shortSummary,
          processing_status: "completed",
          created_at: createdAt,
          category_id: savedItem.category.id,
          category_name: savedItem.category.name,
          tags: ["AI"],
          score: 0.91,
        },
      ]),
    };
    usageService = {
      canUseSemanticSearch: jest.fn().mockResolvedValue(true),
      incrementUsage: jest.fn().mockResolvedValue({}),
    };
    embeddingProvider = {
      embed: jest.fn().mockResolvedValue([0.1, 0.2, 0.3]),
    };
    service = new SearchService(
      prisma as unknown as PrismaService,
      usageService as unknown as UsageService,
      embeddingProvider as unknown as SearchEmbeddingProvider
    );
  });

  it("runs keyword search only within the authenticated user's items", async () => {
    const result = await service.search(userId, { q: "embeddings", mode: "keyword" });

    expect(prisma.savedItem.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          userId,
          deletedAt: null,
          OR: expect.arrayContaining([
            { title: { contains: "embeddings", mode: "insensitive" } },
          ]),
        }),
      })
    );
    expect(embeddingProvider.embed).not.toHaveBeenCalled();
    expect(result.items[0]).toMatchObject({
      id: savedItem.id,
      match_type: "keyword",
      tags: ["AI"],
    });
  });

  it("runs semantic search with usage enforcement and increments usage", async () => {
    const result = await service.search(userId, {
      q: "articles about finding similar memories",
      mode: "semantic",
      tag: "AI",
      source_platform: "web",
    });

    expect(usageService.canUseSemanticSearch).toHaveBeenCalledWith(userId);
    expect(embeddingProvider.embed).toHaveBeenCalledWith("articles about finding similar memories");
    expect(prisma.$queryRaw).toHaveBeenCalledTimes(1);
    expect(usageService.incrementUsage).toHaveBeenCalledWith(userId, "semantic_searches");
    expect(result.items[0]).toMatchObject({
      id: savedItem.id,
      score: 0.91,
      match_type: "semantic",
    });
  });

  it("rejects semantic search when the user's monthly limit is exhausted", async () => {
    usageService.canUseSemanticSearch.mockResolvedValue(false);

    await expect(service.search(userId, { q: "meaning", mode: "semantic" })).rejects.toBeInstanceOf(
      HttpException
    );
    expect(embeddingProvider.embed).not.toHaveBeenCalled();
    expect(usageService.incrementUsage).not.toHaveBeenCalled();
  });

  it("combines keyword and semantic results for hybrid search", async () => {
    const result = await service.search(userId, { q: "vector memory", mode: "hybrid" });

    expect(prisma.savedItem.findMany).toHaveBeenCalled();
    expect(prisma.$queryRaw).toHaveBeenCalled();
    expect(usageService.incrementUsage).toHaveBeenCalledWith(userId, "semantic_searches");
    expect(result.items[0]).toMatchObject({
      id: savedItem.id,
      match_type: "hybrid",
    });
  });
});
