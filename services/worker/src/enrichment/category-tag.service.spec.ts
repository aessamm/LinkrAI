import { CategoryTagService } from "./category-tag.service";

describe("CategoryTagService", () => {
  it("prefers existing category slug and attaches generated tags", async () => {
    const prisma = {
      category: {
        upsert: jest.fn().mockResolvedValue({ id: "category-1" }),
      },
      tag: {
        upsert: jest
          .fn()
          .mockResolvedValueOnce({ id: "tag-1" })
          .mockResolvedValueOnce({ id: "tag-2" }),
      },
      savedItem: {
        update: jest.fn().mockResolvedValue({}),
      },
      savedItemTag: {
        deleteMany: jest.fn().mockResolvedValue({ count: 0 }),
        create: jest.fn().mockResolvedValue({}),
      },
    };
    const service = new CategoryTagService(prisma as never);

    await expect(
      service.assignCategoryAndTags({
        userId: "user-1",
        savedItemId: "saved-item-1",
        suggestedCategory: "AI Research",
        tags: ["AI", "Research", "AI"],
      })
    ).resolves.toEqual({
      categoryId: "category-1",
      tagIds: ["tag-1", "tag-2"],
    });

    expect(prisma.category.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { userId_slug: { userId: "user-1", slug: "ai-research" } },
        create: expect.objectContaining({ isAiGenerated: true }),
      })
    );
    expect(prisma.savedItemTag.create).toHaveBeenCalledTimes(2);
  });
});
