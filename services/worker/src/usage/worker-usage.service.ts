import { Plan, PrismaClient, UsageCounter, UserSubscription } from "@prisma/client";

const FREE_PLAN_FALLBACK: Plan = {
  id: "00000000-0000-0000-0000-000000000000",
  code: "free",
  name: "Free",
  monthlyLinkLimit: 30,
  monthlyAiSummaryLimit: 20,
  monthlySemanticSearchLimit: 10,
  maxCategories: 3,
  featuresJson: {},
  createdAt: new Date(0),
  updatedAt: new Date(0),
};

export class WorkerUsageService {
  constructor(private readonly prisma: PrismaClient) {}

  async canGenerateSummary(userId: string): Promise<boolean> {
    const [plan, usage] = await Promise.all([
      this.getCurrentPlan(userId),
      this.getCurrentUsage(userId),
    ]);

    return usage.aiSummariesCount < plan.monthlyAiSummaryLimit;
  }

  async incrementAiSummaries(userId: string): Promise<UsageCounter> {
    const periodKey = this.getCurrentPeriodKey();
    return this.prisma.usageCounter.upsert({
      where: {
        userId_periodKey: {
          userId,
          periodKey,
        },
      },
      create: {
        userId,
        periodKey,
        aiSummariesCount: 1,
      },
      update: {
        aiSummariesCount: {
          increment: 1,
        },
      },
    });
  }

  private async getCurrentPlan(userId: string): Promise<Plan> {
    const subscription = await this.getActiveSubscription(userId);
    const planCode = subscription?.entitlement ?? "free";
    return (
      (await this.prisma.plan.findUnique({ where: { code: planCode } })) ??
      (await this.prisma.plan.findUnique({ where: { code: "free" } })) ??
      FREE_PLAN_FALLBACK
    );
  }

  private async getCurrentUsage(userId: string): Promise<UsageCounter> {
    const periodKey = this.getCurrentPeriodKey();
    return this.prisma.usageCounter.upsert({
      where: {
        userId_periodKey: {
          userId,
          periodKey,
        },
      },
      create: {
        userId,
        periodKey,
      },
      update: {},
    });
  }

  private async getActiveSubscription(userId: string): Promise<UserSubscription | null> {
    const now = new Date();
    return this.prisma.userSubscription.findFirst({
      where: {
        userId,
        entitlement: {
          in: ["pro", "power"],
        },
        status: {
          in: ["active", "trialing"],
        },
        OR: [{ currentPeriodEnd: null }, { currentPeriodEnd: { gt: now } }],
      },
      orderBy: { updatedAt: "desc" },
    });
  }

  private getCurrentPeriodKey(): string {
    return new Date().toISOString().slice(0, 7);
  }
}
