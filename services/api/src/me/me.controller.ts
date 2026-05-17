import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthenticatedRequest } from "../auth/authenticated-request";
import { SupabaseAuthGuard } from "../auth/supabase-auth.guard";
import { UsageService } from "../usage/usage.service";
import { UsersService } from "../users/users.service";

@Controller("me")
@UseGuards(SupabaseAuthGuard)
export class MeController {
  constructor(
    private readonly usersService: UsersService,
    private readonly usageService: UsageService
  ) {}

  @Get()
  getMe(@Req() request: AuthenticatedRequest) {
    return this.usersService.toMeResponse(request.user);
  }

  @Get("subscription")
  getSubscription(@Req() request: AuthenticatedRequest) {
    return this.usageService.getSubscriptionSummary(request.user.id);
  }
}
