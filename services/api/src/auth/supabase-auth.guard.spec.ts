import { ConfigService } from "@nestjs/config";
import { UnauthorizedException } from "@nestjs/common";
import { sign } from "jsonwebtoken";
import { SupabaseAuthGuard } from "./supabase-auth.guard";
import { UsersService } from "../users/users.service";

const jwtSecret = "test-supabase-secret";

describe("SupabaseAuthGuard", () => {
  const request = {
    headers: {} as Record<string, string>,
  };
  const context = {
    switchToHttp: () => ({
      getRequest: () => request,
    }),
  };
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
      timezone: null,
      onboardingCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };

  let usersService: jest.Mocked<Pick<UsersService, "findOrCreateFromSupabase">>;
  let guard: SupabaseAuthGuard;

  beforeEach(() => {
    request.headers = {};
    usersService = {
      findOrCreateFromSupabase: jest.fn().mockResolvedValue(user),
    };
    guard = new SupabaseAuthGuard(
      new ConfigService({ SUPABASE_JWT_SECRET: jwtSecret }),
      usersService as unknown as UsersService
    );
  });

  it("rejects missing token", async () => {
    await expect(guard.canActivate(context as never)).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it("rejects invalid token", async () => {
    request.headers.authorization = "Bearer invalid-token";

    await expect(guard.canActivate(context as never)).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it("creates local user from valid Supabase token", async () => {
    const token = createToken();
    request.headers.authorization = `Bearer ${token}`;

    await expect(guard.canActivate(context as never)).resolves.toBe(true);
    expect(usersService.findOrCreateFromSupabase).toHaveBeenCalledWith({
      supabaseUserId: "supabase-user-1",
      email: "user@example.com",
      authProvider: "email",
    });
    expect(request).toHaveProperty("user", user);
  });
});

function createToken() {
  return sign(
    {
      sub: "supabase-user-1",
      email: "user@example.com",
      app_metadata: { provider: "email" },
    },
    jwtSecret,
    {
      algorithm: "HS256",
      expiresIn: "1h",
    }
  );
}
