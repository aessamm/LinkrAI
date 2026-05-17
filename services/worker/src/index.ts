import { PrismaClient } from "@prisma/client";
import { Worker } from "bullmq";
import { LinkProcessingProcessor } from "./link-processing.processor";
import { LINK_PROCESSING_QUEUE, LinkProcessingJobData } from "./queue";
import { getRedisConnection } from "./redis-connection";

const prisma = new PrismaClient();
const processor = new LinkProcessingProcessor(prisma);

const worker = new Worker<LinkProcessingJobData>(
  LINK_PROCESSING_QUEUE,
  (job) => processor.process(job),
  {
    connection: getRedisConnection(process.env.REDIS_URL),
    concurrency: Number(process.env.WORKER_CONCURRENCY ?? 2),
  }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, error) => {
  console.error(`Job ${job?.id ?? "unknown"} failed: ${error.message}`);
});

async function shutdown() {
  console.log("Shutting down Linkrai worker...");
  await worker.close();
  await prisma.$disconnect();
  process.exit(0);
}

process.on("SIGINT", () => void shutdown());
process.on("SIGTERM", () => void shutdown());

console.log(`Linkrai worker listening on ${LINK_PROCESSING_QUEUE}`);
