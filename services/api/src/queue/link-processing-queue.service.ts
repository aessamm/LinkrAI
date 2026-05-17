import { InjectQueue } from "@nestjs/bullmq";
import { Injectable, Logger } from "@nestjs/common";
import { Queue } from "bullmq";
import {
  LINK_PROCESSING_QUEUE,
  LinkProcessingJobData,
  PROCESS_SAVED_ITEM_JOB,
} from "./link-processing.types";

@Injectable()
export class LinkProcessingQueueService {
  private readonly logger = new Logger(LinkProcessingQueueService.name);

  constructor(
    @InjectQueue(LINK_PROCESSING_QUEUE)
    private readonly queue: Queue<LinkProcessingJobData>
  ) {}

  async enqueueSavedItem(data: LinkProcessingJobData): Promise<string | undefined> {
    const job = await this.queue.add(PROCESS_SAVED_ITEM_JOB, data, {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 2000,
      },
      removeOnComplete: true,
      removeOnFail: false,
    });

    this.logger.log(`Enqueued saved item ${data.savedItemId} as job ${job.id}`);
    return job.id;
  }
}
