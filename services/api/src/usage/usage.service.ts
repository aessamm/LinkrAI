import { Injectable } from "@nestjs/common";
import { Plan, UsageCounter, UserSubscription } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

export type UsageType = "saved_links" | "ai_summaries" | "semantic_searches";

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

@Injectable()
export class UsageService {
  constructor(private readonly prisma: PrismaService) {}

  async getCurrentPlan(userId: string): Promise<Plan> {
    const subscription = await this.getActiveSubscription(userId);
    const planCode = subscription?.entitlement ?? "free";
    const plan = await this.prisma.plan.findUnique({
      where: { code: planCode },
    });

    if (plan) {
      return plan;
    }

    const freePlan = await this.prisma.plan.findUnique({
      where: { code: "free" },
    });

    return freePlan ?? FREE_PLAN_FALLBACK;
  }

  async getCurrentUsage(userId: string): Promise<UsageCounter> {
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

  async canSaveLink(userId: string): Promise<boolean> {
    const [plan, usage] = await Promise.all([
      this.getCurrentPlan(userId),
      this.getCurrentUsage(userId),
    ]);
    return usage.savedLinksCount < plan.monthlyLinkLimit;
  }

  async canGenerateSummary(userId: string): Promise<boolean> {
    const [plan, usage] = await Promise.all([
      this.getCurrentPlan(userId),
      this.getCurrentUsage(userId),
    ]);
    return usage.aiSummariesCount < plan.monthlyAiSummaryLimit;
  }

  async canUseSemanticSearch(userId: string): Promise<boolean> {
    const [plan, usage] = await Promise.all([
      this.getCurrentPlan(userId),
      this.getCurrentUsage(userId),
    ]);
    return usage.semanticSearchCount < plan.monthlySemanticSearchLimit;
  }

  async incrementUsage(userId: string, usageType: UsageType): Promise<UsageCounter> {
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
        ...this.getIncrementCreateData(usageType),
      },
      update: this.getIncrementUpdateData(usageType),
    });
  }

  async incrementSavedLinks(userId: string): Promise<UsageCounter> {
    return this.incrementUsage(userId, "saved_links");
  }

  async getSubscriptionSummary(userId: string) {
    const [plan, subscription, usage] = await Promise.all([
      this.getCurrentPlan(userId),
      this.getActiveSubscription(userId),
      this.getCurrentUsage(userId),
    ]);

    return {
      plan: {
        code: plan.code,
        name: plan.name,
        limits: {
          monthly_link_limit: plan.monthlyLinkLimit,
          monthly_ai_summary_limit: plan.monthlyAiSummaryLimit,
          monthly_semantic_search_limit: plan.monthlySemanticSearchLimit,
          max_categories: plan.maxCategories,
        },
      },
      subscription: this.toSubscriptionResponse(subscription),
      usage: {
        period_key: usage.periodKey,
        saved_links_count: usage.savedLinksCount,
        ai_summaries_count: usage.aiSummariesCount,
        semantic_search_count: usage.semanticSearchCount,
      },
      remaining: {
        saved_links: Math.max(plan.monthlyLinkLimit - usage.savedLinksCount, 0),
        ai_summaries: Math.max(plan.monthlyAiSummaryLimit - usage.aiSummariesCount, 0),
        semantic_searches: Math.max(plan.monthlySemanticSearchLimit - usage.semanticSearchCount, 0),
      },
    };
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

  private toSubscriptionResponse(subscription: UserSubscription | null) {
    if (!subscription) {
      return {
        status: "active",
        entitlement: "free",
        current_period_start: this.getCurrentPeriodStart().toISOString(),
        current_period_end: this.getCurrentPeriodEnd().toISOString(),
      };
    }

    return {
      status: subscription.status,
      entitlement: subscription.entitlement,
      current_period_start: subscription.currentPeriodStart?.toISOString() ?? null,
      current_period_end: subscription.currentPeriodEnd?.toISOString() ?? null,
    };
  }

  private getIncrementCreateData(usageType: UsageType) {
    return {
      savedLinksCount: usageType === "saved_links" ? 1 : 0,
      aiSummariesCount: usageType === "ai_summaries" ? 1 : 0,
      semanticSearchCount: usageType === "semantic_searches" ? 1 : 0,
    };
  }

  private getIncrementUpdateData(usageType: UsageType) {
    if (usageType === "saved_links") {
      return { savedLinksCount: { increment: 1 } };
    }

    if (usageType === "ai_summaries") {
      return { aiSummariesCount: { increment: 1 } };
    }

    return { semanticSearchCount: { increment: 1 } };
  }

  private getCurrentPeriodKey(): string {
    return new Date().toISOString().slice(0, 7);
  }

  private getCurrentPeriodStart(): Date {
    const now = new Date();
    return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
  }

  private getCurrentPeriodEnd(): Date {
    const now = new Date();
    return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0, 23, 59, 59, 999));
  }
}
