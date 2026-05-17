import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const plans = [
  {
    code: "free",
    name: "Free",
    monthlyLinkLimit: 30,
    monthlyAiSummaryLimit: 20,
    monthlySemanticSearchLimit: 10,
    maxCategories: 3,
    featuresJson: {},
  },
  {
    code: "pro",
    name: "Pro",
    monthlyLinkLimit: 500,
    monthlyAiSummaryLimit: 500,
    monthlySemanticSearchLimit: 500,
    maxCategories: null,
    featuresJson: {},
  },
  {
    code: "power",
    name: "Power",
    monthlyLinkLimit: 2000,
    monthlyAiSummaryLimit: 2000,
    monthlySemanticSearchLimit: 2000,
    maxCategories: null,
    featuresJson: {},
  },
];

async function main() {
  for (const plan of plans) {
    await prisma.plan.upsert({
      where: { code: plan.code },
      create: plan,
      update: plan,
    });
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
