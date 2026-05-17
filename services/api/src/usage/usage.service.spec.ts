import { UsageService } from "./usage.service";
import { PrismaService } from "../prisma/prisma.service";

describe("UsageService", () => {
  const userId = "7c80b8ba-b880-44e6-bf5c-cae227fc0f68";
  const now = new Date("2026-05-17T12:00:00.000Z");
  const freePlan = {
    id: "free-plan-id",
    code: "free",
    name: "Free",
    monthlyLinkLimit: 30,
    monthlyAiSummaryLimit: 20,
    monthlySemanticSearchLimit: 10,
    maxCategories: 3,
    featuresJson: {},
    createdAt: now,
    updatedAt: now,
  };
  const proPlan = {
    id: "pro-plan-id",
    code: "pro",
    name: "Pro",
    monthlyLinkLimit: 500,
    monthlyAiSummaryLimit: 500,
    monthlySemanticSearchLimit: 500,
    maxCategories: null,
    featuresJson: {},
    createdAt: now,
    updatedAt: now,
  };
  const usage = {
    id: "usage-id",
    userId,
    periodKey: "2026-05",
    savedLinksCount: 4,
    aiSummariesCount: 3,
    semanticSearchCount: 1,
    youtubeAnalysisCount: 0,
    pdfAnalysisCount: 0,
    createdAt: now,
    updatedAt: now,
  };

  let prisma: {
    plan: { findUnique: jest.Mock };
    userSubscription: { findFirst: jest.Mock };
    usageCounter: { upsert: jest.Mock };
  };
  let service: UsageService;

  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(now);
    prisma = {
      plan: { findUnique: jest.fn().mockResolvedValue(freePlan) },
      userSubscription: { findFirst: jest.fn().mockResolvedValue(null) },
      usageCounter: { upsert: jest.fn().mockResolvedValue(usage) },
    };
    service = new UsageService(prisma as unknown as PrismaService);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("falls back to FREE for a new user", async () => {
    await expect(service.getCurrentPlan(userId)).resolves.toMatchObject({
      code: "free",
      monthlyLinkLimit: 30,
    });
  });

  it("checks limits against the current plan", async () => {
    await expect(service.canSaveLink(userId)).resolves.toBe(true);
    await expect(service.canGenerateSummary(userId)).resolves.toBe(true);
    await expect(service.canUseSemanticSearch(userId)).resolves.toBe(true);

    prisma.usageCounter.upsert.mockResolvedValue({
      ...usage,
      savedLinksCount: 30,
      aiSummariesCount: 20,
      semanticSearchCount: 10,
    });

    await expect(service.canSaveLink(userId)).resolves.toBe(false);
    await expect(service.canGenerateSummary(userId)).resolves.toBe(false);
    await expect(service.canUseSemanticSearch(userId)).resolves.toBe(false);
  });

  it("increments usage by type", async () => {
    await service.incrementUsage(userId, "semantic_searches");

    expect(prisma.usageCounter.upsert).toHaveBeenCalledWith({
      where: {
        userId_periodKey: {
          userId,
          periodKey: "2026-05",
        },
      },
      create: {
        userId,
        periodKey: "2026-05",
        savedLinksCount: 0,
        aiSummariesCount: 0,
        semanticSearchCount: 1,
      },
      update: {
        semanticSearchCount: {
          increment: 1,
        },
      },
    });
  });

  it("uses an active paid subscription", async () => {
    prisma.userSubscription.findFirst.mockResolvedValue({
      id: "subscription-id",
      userId,
      provider: "revenuecat",
      providerCustomerId: null,
      providerSubscriptionId: null,
      entitlement: "pro",
      status: "active",
      currentPeriodStart: now,
      currentPeriodEnd: new Date("2026-06-17T12:00:00.000Z"),
      createdAt: now,
      updatedAt: now,
    });
    prisma.plan.findUnique.mockImplementation(({ where }: { where: { code: string } }) =>
      Promise.resolve(where.code === "pro" ? proPlan : freePlan)
    );

    await expect(service.getCurrentPlan(userId)).resolves.toMatchObject({
      code: "pro",
      monthlyLinkLimit: 500,
    });
  });

  it("falls back to FREE when paid subscription is expired", async () => {
    prisma.userSubscription.findFirst.mockResolvedValue(null);
    prisma.plan.findUnique.mockImplementation(({ where }: { where: { code: string } }) =>
      Promise.resolve(where.code === "free" ? freePlan : null)
    );

    await expect(service.getSubscriptionSummary(userId)).resolves.toMatchObject({
      plan: {
        code: "free",
      },
      subscription: {
        status: "active",
        entitlement: "free",
      },
      remaining: {
        saved_links: 26,
        ai_summaries: 17,
        semantic_searches: 9,
      },
    });
  });
});
