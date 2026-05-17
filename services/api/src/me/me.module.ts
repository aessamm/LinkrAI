import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { UsageModule } from "../usage/usage.module";
import { UsersModule } from "../users/users.module";
import { MeController } from "./me.controller";

@Module({
  imports: [AuthModule, UsersModule, UsageModule],
  controllers: [MeController],
})
export class MeModule {}
