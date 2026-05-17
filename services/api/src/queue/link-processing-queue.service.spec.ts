import { LinkProcessingQueueService } from "./link-processing-queue.service";
import { PROCESS_SAVED_ITEM_JOB } from "./link-processing.types";

describe("LinkProcessingQueueService", () => {
  it("enqueues saved item processing jobs with retry policy", async () => {
    const add = jest.fn().mockResolvedValue({ id: "job-1" });
    const service = new LinkProcessingQueueService({ add } as never);

    await expect(
      service.enqueueSavedItem({
        savedItemId: "saved-item-1",
        userId: "user-1",
      })
    ).resolves.toBe("job-1");

    expect(add).toHaveBeenCalledWith(
      PROCESS_SAVED_ITEM_JOB,
      {
        savedItemId: "saved-item-1",
        userId: "user-1",
      },
      {
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 2000,
        },
        removeOnComplete: true,
        removeOnFail: false,
      }
    );
  });
});
