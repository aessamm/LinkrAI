import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { LinkProcessingQueueService } from "../queue/link-processing-queue.service";
import { UsageService } from "../usage/usage.service";
import { CreateSavedItemDto } from "./dto/create-saved-item.dto";
import { ListSavedItemsDto } from "./dto/list-saved-items.dto";
import { UpdateSavedItemDto } from "./dto/update-saved-item.dto";

type SavedItemWithRelations = Prisma.SavedItemGetPayload<{
  include: {
    category: true;
    savedItemTags: {
      include: {
        tag: true;
      };
    };
  };
}>;

@Injectable()
export class SavedItemsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usageService: UsageService,
    private readonly linkProcessingQueueService: LinkProcessingQueueService
  ) {}

  async create(userId: string, dto: CreateSavedItemDto) {
    if (!(await this.usageService.canSaveLink(userId))) {
      throw new HttpException(
        {
          code: "upgrade_required",
          message: "You have reached your monthly saved links limit.",
          current_plan: "free",
          required_action: "upgrade",
          limit_type: "saved_links",
        },
        HttpStatus.PAYMENT_REQUIRED
      );
    }

    const normalizedUrl = this.normalizeUrl(dto.url);
    const item = await this.prisma.savedItem.create({
      data: {
        userId,
        url: dto.url,
        normalizedUrl,
        sourceDomain: this.getSourceDomain(normalizedUrl),
        processingStatus: "pending",
      },
    });

    await this.usageService.incrementUsage(userId, "saved_links");
    await this.linkProcessingQueueService.enqueueSavedItem({
      savedItemId: item.id,
      userId,
    });

    return {
      id: item.id,
      url: item.url,
      normalized_url: item.normalizedUrl,
      title: item.title,
      processing_status: item.processingStatus,
      created_at: item.createdAt.toISOString(),
    };
  }

  async findAll(userId: string, query: ListSavedItemsDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const where = this.buildWhere(userId, query);
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

    return {
      items: items.map((item) => this.toListItemResponse(item)),
      pagination: {
        page,
        limit,
        total,
        total_pages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(userId: string, id: string) {
    const item = await this.findOwnedItem(userId, id);
    return this.toDetailResponse(item);
  }

  async update(userId: string, id: string, dto: UpdateSavedItemDto) {
    await this.findOwnedItem(userId, id);

    if (dto.category_id) {
      await this.ensureCategoryBelongsToUser(userId, dto.category_id);
    }

    await this.prisma.savedItem.update({
      where: { id },
      data: {
        title: dto.title,
        categoryId: dto.category_id ?? undefined,
        userNotes: dto.user_notes ?? undefined,
      },
    });

    if (dto.tags) {
      await this.replaceTags(userId, id, dto.tags);
    }

    return {
      id,
      updated: true,
    };
  }

  async remove(userId: string, id: string) {
    await this.findOwnedItem(userId, id);
    await this.prisma.savedItem.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return {
      id,
      deleted: true,
    };
  }

  private async findOwnedItem(userId: string, id: string): Promise<SavedItemWithRelations> {
    const item = await this.prisma.savedItem.findFirst({
      where: {
        id,
        userId,
        deletedAt: null,
      },
      include: this.includeRelations(),
    });

    if (!item) {
      throw new NotFoundException("Saved item not found.");
    }

    return item;
  }

  private async ensureCategoryBelongsToUser(userId: string, categoryId: string) {
    const category = await this.prisma.category.findFirst({
      where: {
        id: categoryId,
        userId,
      },
    });

    if (!category) {
      throw new NotFoundException("Category not found.");
    }
  }

  private async replaceTags(userId: string, savedItemId: string, names: string[]) {
    const uniqueNames = [...new Set(names.map((name) => name.trim()).filter(Boolean))];

    await this.prisma.savedItemTag.deleteMany({
      where: { savedItemId },
    });

    for (const name of uniqueNames) {
      const tag = await this.prisma.tag.upsert({
        where: {
          userId_slug: {
            userId,
            slug: this.slugify(name),
          },
        },
        create: {
          userId,
          name,
          slug: this.slugify(name),
        },
        update: {
          name,
        },
      });

      await this.prisma.savedItemTag.create({
        data: {
          savedItemId,
          tagId: tag.id,
        },
      });
    }
  }

  private buildWhere(userId: string, query: ListSavedItemsDto): Prisma.SavedItemWhereInput {
    return {
      userId,
      deletedAt: null,
      categoryId: query.category_id,
      sourceDomain: query.source_domain,
      processingStatus: query.processing_status,
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
    };
  }

  private buildDateFilter(query: ListSavedItemsDto): Prisma.DateTimeFilter | undefined {
    if (!query.from && !query.to) {
      return undefined;
    }

    return {
      gte: query.from ? new Date(query.from) : undefined,
      lte: query.to ? new Date(query.to) : undefined,
    };
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

  private toListItemResponse(item: SavedItemWithRelations) {
    return {
      id: item.id,
      title: item.title,
      url: item.url,
      thumbnail_url: item.thumbnailUrl,
      short_summary: item.shortSummary,
      category: item.category
        ? {
            id: item.category.id,
            name: item.category.name,
          }
        : null,
      tags: item.savedItemTags.map((savedItemTag) => savedItemTag.tag.name),
      processing_status: item.processingStatus,
      created_at: item.createdAt.toISOString(),
    };
  }

  private toDetailResponse(item: SavedItemWithRelations) {
    return {
      id: item.id,
      url: item.url,
      normalized_url: item.normalizedUrl,
      title: item.title,
      description: item.description,
      thumbnail_url: item.thumbnailUrl,
      source_domain: item.sourceDomain,
      content_type: item.contentType,
      language: item.language,
      summary: item.summary,
      short_summary: item.shortSummary,
      main_points: item.mainPoints,
      category: item.category
        ? {
            id: item.category.id,
            name: item.category.name,
          }
        : null,
      tags: item.savedItemTags.map((savedItemTag) => savedItemTag.tag.name),
      processing_status: item.processingStatus,
      extraction_status: item.extractionStatus,
      user_notes: item.userNotes,
      created_at: item.createdAt.toISOString(),
    };
  }

  private normalizeUrl(rawUrl: string): string {
    const url = new URL(rawUrl);
    url.hash = "";
    url.hostname = url.hostname.toLowerCase();
    if (url.pathname !== "/") {
      url.pathname = url.pathname.replace(/\/+$/, "");
    }
    return url.toString();
  }

  private getSourceDomain(normalizedUrl: string): string {
    return new URL(normalizedUrl).hostname.replace(/^www\./, "");
  }

  private slugify(value: string): string {
    return value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
}
