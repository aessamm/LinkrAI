import { PrismaClient } from "@prisma/client";

export class CategoryTagService {
  constructor(private readonly prisma: PrismaClient) {}

  async getExistingCategoryNames(userId: string): Promise<string[]> {
    const categories = await this.prisma.category.findMany({
      where: { userId },
      orderBy: { name: "asc" },
      select: { name: true },
    });

    return categories.map((category) => category.name);
  }

  async assignCategoryAndTags(input: {
    userId: string;
    savedItemId: string;
    suggestedCategory: string;
    tags: string[];
  }) {
    const category = await this.findOrCreateCategory(input.userId, input.suggestedCategory);
    const tagIds = await this.findOrCreateTags(input.userId, input.tags);

    await this.prisma.savedItem.update({
      where: { id: input.savedItemId },
      data: { categoryId: category.id },
    });

    await this.prisma.savedItemTag.deleteMany({
      where: { savedItemId: input.savedItemId },
    });

    for (const tagId of tagIds) {
      await this.prisma.savedItemTag.create({
        data: {
          savedItemId: input.savedItemId,
          tagId,
        },
      });
    }

    return { categoryId: category.id, tagIds };
  }

  private async findOrCreateCategory(userId: string, name: string) {
    const cleanName = this.cleanLabel(name, "General");
    const slug = this.slugify(cleanName);
    return this.prisma.category.upsert({
      where: {
        userId_slug: {
          userId,
          slug,
        },
      },
      create: {
        userId,
        name: cleanName,
        slug,
        isAiGenerated: true,
      },
      update: {
        name: cleanName,
      },
    });
  }

  private async findOrCreateTags(userId: string, names: string[]): Promise<string[]> {
    const cleanNames = [
      ...new Set(names.map((name) => this.cleanLabel(name, "")).filter(Boolean)),
    ].slice(0, 10);
    const tagIds: string[] = [];

    for (const name of cleanNames) {
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
      tagIds.push(tag.id);
    }

    return tagIds;
  }

  private cleanLabel(value: string, fallback: string): string {
    const cleaned = value.replace(/\s+/g, " ").trim().slice(0, 80);
    return cleaned || fallback;
  }

  private slugify(value: string): string {
    const slug = value
      .trim()
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, "-")
      .replace(/^-+|-+$/g, "");
    return slug || "general";
  }
}
