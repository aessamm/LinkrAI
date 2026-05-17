import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { getRedisConnection } from "./redis-connection";
import { LINK_PROCESSING_QUEUE } from "./link-processing.types";
import { LinkProcessingQueueService } from "./link-processing-queue.service";

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connection: getRedisConnection(configService.get<string>("REDIS_URL")),
      }),
    }),
    BullModule.registerQueue({
      name: LINK_PROCESSING_QUEUE,
    }),
  ],
  providers: [LinkProcessingQueueService],
  exports: [LinkProcessingQueueService],
})
export class QueueModule {}
