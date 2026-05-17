import { MeController } from "./me.controller";
import { AuthenticatedRequest } from "../auth/authenticated-request";
import { UsageService } from "../usage/usage.service";
import { UsersService } from "../users/users.service";

describe("MeController", () => {
  it("returns the authenticated user", () => {
    const user = {
      id: "8b443c30-3f2b-43ef-82f2-2118c54cd26f",
      supabaseUserId: "supabase-user-1",
      email: "user@example.com",
      displayName: null,
      authProvider: "email",
      createdAt: new Date(),
      updatedAt: new Date(),
      profile: {
        id: "e1253da6-c54c-4921-8b3c-b5932c20c31b",
        userId: "8b443c30-3f2b-43ef-82f2-2118c54cd26f",
        preferredLanguage: "en",
        timezone: "Africa/Cairo",
        onboardingCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };
    const usersService = new UsersService({} as never);
    const controller = new MeController(usersService, {} as UsageService);

    expect(controller.getMe({ user } as AuthenticatedRequest)).toEqual({
      id: user.id,
      email: "user@example.com",
      display_name: null,
      profile: {
        preferred_language: "en",
        timezone: "Africa/Cairo",
        onboarding_completed: false,
      },
    });
  });

  it("returns subscription summary for the authenticated user", async () => {
    const usageService = {
      getSubscriptionSummary: jest.fn().mockResolvedValue({
        plan: { code: "free" },
      }),
    };
    const controller = new MeController(
      {} as UsersService,
      usageService as unknown as UsageService
    );

    await expect(
      controller.getSubscription({
        user: { id: "user-1" },
      } as AuthenticatedRequest)
    ).resolves.toEqual({ plan: { code: "free" } });
    expect(usageService.getSubscriptionSummary).toHaveBeenCalledWith("user-1");
  });
});
