import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { MeModule } from "./me/me.module";
import { PrismaModule } from "./prisma/prisma.module";
import { QueueModule } from "./queue/queue.module";
import { SavedItemsModule } from "./saved-items/saved-items.module";
import { SearchModule } from "./search/search.module";
import { UsageModule } from "./usage/usage.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    MeModule,
    QueueModule,
    UsageModule,
    SearchModule,
    SavedItemsModule,
  ],
})
export class AppModule {}
