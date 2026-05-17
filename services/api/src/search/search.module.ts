import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { PrismaModule } from "../prisma/prisma.module";
import { UsageModule } from "../usage/usage.module";
import { SearchEmbeddingProvider } from "./embedding.provider";
import { SearchController } from "./search.controller";
import { SearchService } from "./search.service";

@Module({
  imports: [AuthModule, PrismaModule, UsageModule],
  controllers: [SearchController],
  providers: [SearchService, SearchEmbeddingProvider],
})
export class SearchModule {}
