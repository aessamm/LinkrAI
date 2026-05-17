import { WorkerUsageService } from "./worker-usage.service";

describe("WorkerUsageService", () => {
  it("increments AI summary usage for the current period", async () => {
    jest.useFakeTimers().setSystemTime(new Date("2026-05-17T12:00:00.000Z"));
    const prisma = {
      usageCounter: {
        upsert: jest.fn().mockResolvedValue({}),
      },
    };
    const service = new WorkerUsageService(prisma as never);

    await service.incrementAiSummaries("user-1");

    expect(prisma.usageCounter.upsert).toHaveBeenCalledWith({
      where: {
        userId_periodKey: {
          userId: "user-1",
          periodKey: "2026-05",
        },
      },
      create: {
        userId: "user-1",
        periodKey: "2026-05",
        aiSummariesCount: 1,
      },
      update: {
        aiSummariesCount: {
          increment: 1,
        },
      },
    });
    jest.useRealTimers();
  });
});
