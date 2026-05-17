import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { UsageService } from "../usage/usage.service";
import { SearchSavedItemsDto } from "./dto/search-saved-items.dto";
import { SearchEmbeddingProvider } from "./embedding.provider";

type SearchItem = {
  id: string;
  title: string | null;
  url: string;
  thumbnailUrl: string | null;
  shortSummary: string | null;
  processingStatus: string;
  createdAt: Date;
  category: { id: string; name: string } | null;
  savedItemTags: { tag: { name: string } }[];
};

type SemanticRow = {
  id: string;
  title: string | null;
  url: string;
  thumbnail_url: string | null;
  short_summary: string | null;
  processing_status: string;
  created_at: Date;
  category_id: string | null;
  category_name: string | null;
  tags: string[] | null;
  score: number;
};

type SearchResponseItem = {
  id: string;
  title: string | null;
  url: string;
  thumbnail_url: string | null;
  short_summary: string | null;
  category: { id: string; name: string | null } | null;
  tags: string[];
  processing_status: string;
  created_at: string;
  score: number;
  match_type: "keyword" | "semantic" | "hybrid";
};

@Injectable()
export class SearchService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usageService: UsageService,
    private readonly embeddingProvider: SearchEmbeddingProvider
  ) {}

  async search(userId: string, query: SearchSavedItemsDto) {
    const mode = query.mode ?? "keyword";
    if (mode === "semantic") {
      return this.semanticSearch(userId, query);
    }

    if (mode === "hybrid") {
      return this.hybridSearch(userId, query);
    }

    return this.keywordSearch(userId, query);
  }

  private async keywordSearch(userId: string, query: SearchSavedItemsDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const where = this.buildKeywordWhere(userId, query);
    const [items, total] = await Promise.all([
      this.prisma.savedItem.findMany({
        where,
        include: this.includeRelations(),
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.savedItem.count({ where }),
    ]);

    return this.paginate(
      items.map((item) => ({ ...this.toKeywordResponse(item), score: 1, match_type: "keyword" })),
      page,
      limit,
      total
    );
  }

  private async semanticSearch(userId: string, query: SearchSavedItemsDto) {
    await this.ensureSemanticSearchAllowed(userId);
    const embedding = await this.embeddingProvider.embed(query.q);
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const rows = await this.findSemanticRows(userId, query, embedding, limit, (page - 1) * limit);
    await this.usageService.incrementUsage(userId, "semantic_searches");

    return this.paginate(
      rows.map((row) => this.toSemanticResponse(row, "semantic")),
      page,
      limit,
      rows.length
    );
  }

  private async hybridSearch(userId: string, query: SearchSavedItemsDto) {
    await this.ensureSemanticSearchAllowed(userId);
    const embedding = await this.embeddingProvider.embed(query.q);
    const limit = query.limit ?? 20;
    const page = query.page ?? 1;
    const where = this.buildKeywordWhere(userId, query);
    const [keywordItems, semanticRows] = await Promise.all([
      this.prisma.savedItem.findMany({
        where,
        include: this.includeRelations(),
        orderBy: { createdAt: "desc" },
        take: limit,
      }),
      this.findSemanticRows(userId, query, embedding, limit, 0),
    ]);
    await this.usageService.incrementUsage(userId, "semantic_searches");

    const byId = new Map<string, SearchResponseItem>();
    for (const item of keywordItems) {
      byId.set(item.id, { ...this.toKeywordResponse(item), score: 0.5, match_type: "keyword" });
    }

    for (const row of semanticRows) {
      const semantic = this.toSemanticResponse(row, "semantic");
      const existing = byId.get(row.id);
      byId.set(row.id, existing ? { ...semantic, score: Math.max(existing.score, semantic.score), match_type: "hybrid" } : semantic);
    }

    const items = [...byId.values()]
      .sort((a, b) => b.score - a.score)
      .slice((page - 1) * limit, page * limit)
      .map((item) => ({ ...item, match_type: item.match_type === "semantic" ? "hybrid" : item.match_type }));

    return this.paginate(items, page, limit, byId.size);
  }

  private async ensureSemanticSearchAllowed(userId: string) {
    if (await this.usageService.canUseSemanticSearch(userId)) {
      return;
    }

    throw new HttpException(
      {
        code: "upgrade_required",
        message: "You have reached your monthly semantic search limit.",
        current_plan: "free",
        required_action: "upgrade",
        limit_type: "semantic_searches",
      },
      HttpStatus.PAYMENT_REQUIRED
    );
  }

  private buildKeywordWhere(userId: string, query: SearchSavedItemsDto): Prisma.SavedItemWhereInput {
    const q = query.q.trim();
    return {
      userId,
      deletedAt: null,
      categoryId: query.category_id,
      sourcePlatform: query.source_platform,
      createdAt: this.buildDateFilter(query),
      savedItemTags: query.tag
        ? {
            some: {
              tag: {
                slug: this.slugify(query.tag),
              },
            },
          }
        : undefined,
      OR: [
        { title: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
        { summary: { contains: q, mode: "insensitive" } },
        { shortSummary: { contains: q, mode: "insensitive" } },
        { rawText: { contains: q, mode: "insensitive" } },
        { url: { contains: q, mode: "insensitive" } },
        { sourceDomain: { contains: q, mode: "insensitive" } },
      ],
    };
  }

  private async findSemanticRows(
    userId: string,
    query: SearchSavedItemsDto,
    embedding: number[],
    limit: number,
    offset: number
  ): Promise<SemanticRow[]> {
    const vector = this.toVectorLiteral(embedding);
    const filters = this.buildSemanticFilters(query);
    return this.prisma.$queryRaw<SemanticRow[]>`
      SELECT
        si.id,
        si.title,
        si.url,
        si.thumbnail_url,
        si.short_summary,
        si.processing_status,
        si.created_at,
        c.id AS category_id,
        c.name AS category_name,
        COALESCE(array_agg(t.name) FILTER (WHERE t.name IS NOT NULL), '{}') AS tags,
        1 - (si.embedding <=> ${vector}::vector) AS score
      FROM saved_items si
      LEFT JOIN categories c ON c.id = si.category_id
      LEFT JOIN saved_item_tags sit ON sit.saved_item_id = si.id
      LEFT JOIN tags t ON t.id = sit.tag_id
      WHERE si.user_id = ${userId}::uuid
        AND si.deleted_at IS NULL
        AND si.embedding IS NOT NULL
        ${filters}
      GROUP BY si.id, c.id, c.name
      ORDER BY si.embedding <=> ${vector}::vector ASC
      LIMIT ${limit}
      OFFSET ${offset}
    `;
  }

  private buildSemanticFilters(query: SearchSavedItemsDto) {
    const clauses: Prisma.Sql[] = [];
    if (query.category_id) {
      clauses.push(Prisma.sql`AND si.category_id = ${query.category_id}::uuid`);
    }
    if (query.source_platform) {
      clauses.push(Prisma.sql`AND si.source_platform = ${query.source_platform}`);
    }
    if (query.from) {
      clauses.push(Prisma.sql`AND si.created_at >= ${new Date(query.from)}`);
    }
    if (query.to) {
      clauses.push(Prisma.sql`AND si.created_at <= ${new Date(query.to)}`);
    }
    if (query.tag) {
      clauses.push(Prisma.sql`
        AND EXISTS (
          SELECT 1
          FROM saved_item_tags sit_filter
          JOIN tags t_filter ON t_filter.id = sit_filter.tag_id
          WHERE sit_filter.saved_item_id = si.id
            AND t_filter.slug = ${this.slugify(query.tag)}
        )
      `);
    }

    return clauses.length ? Prisma.join(clauses, "\n") : Prisma.empty;
  }

  private includeRelations() {
    return {
      category: true,
      savedItemTags: {
        include: {
          tag: true,
        },
      },
    } satisfies Prisma.SavedItemInclude;
  }

  private buildDateFilter(query: SearchSavedItemsDto): Prisma.DateTimeFilter | undefined {
    if (!query.from && !query.to) {
      return undefined;
    }

    return {
      gte: query.from ? new Date(query.from) : undefined,
      lte: query.to ? new Date(query.to) : undefined,
    };
  }

  private toKeywordResponse(item: SearchItem) {
    return {
      id: item.id,
      title: item.title,
      url: item.url,
      thumbnail_url: item.thumbnailUrl,
      short_summary: item.shortSummary,
      category: item.category ? { id: item.category.id, name: item.category.name } : null,
      tags: item.savedItemTags.map((savedItemTag) => savedItemTag.tag.name),
      processing_status: item.processingStatus,
      created_at: item.createdAt.toISOString(),
    };
  }

  private toSemanticResponse(row: SemanticRow, matchType: "semantic" | "hybrid"): SearchResponseItem {
    return {
      id: row.id,
      title: row.title,
      url: row.url,
      thumbnail_url: row.thumbnail_url,
      short_summary: row.short_summary,
      category: row.category_id ? { id: row.category_id, name: row.category_name } : null,
      tags: row.tags ?? [],
      processing_status: row.processing_status,
      created_at: row.created_at.toISOString(),
      score: Number(row.score),
      match_type: matchType,
    };
  }

  private paginate<T>(items: T[], page: number, limit: number, total: number) {
    return {
      items,
      pagination: {
        page,
        limit,
        total,
        total_pages: Math.ceil(total / limit),
      },
    };
  }

  private toVectorLiteral(embedding: number[]): string {
    return `[${embedding.map((value) => Number(value).toFixed(8)).join(",")}]`;
  }

  private slugify(value: string): string {
    return value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
}
