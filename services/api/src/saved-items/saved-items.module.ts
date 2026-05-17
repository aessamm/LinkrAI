import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { QueueModule } from "../queue/queue.module";
import { UsageModule } from "../usage/usage.module";
import { UsersModule } from "../users/users.module";
import { SavedItemsController } from "./saved-items.controller";
import { SavedItemsService } from "./saved-items.service";

@Module({
  imports: [AuthModule, UsersModule, UsageModule, QueueModule],
  controllers: [SavedItemsController],
  providers: [SavedItemsService],
})
export class SavedItemsModule {}
