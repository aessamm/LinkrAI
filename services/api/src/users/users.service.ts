import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

export type UserWithProfile = Awaited<ReturnType<UsersService["findBySupabaseUserId"]>>;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findBySupabaseUserId(supabaseUserId: string) {
    return this.prisma.user.findUnique({
      where: { supabaseUserId },
      include: { profile: true },
    });
  }

  async findOrCreateFromSupabase(payload: {
    supabaseUserId: string;
    email: string;
    authProvider?: string | null;
  }) {
    const existing = await this.findBySupabaseUserId(payload.supabaseUserId);
    if (existing) {
      return existing;
    }

    return this.prisma.user.create({
      data: {
        supabaseUserId: payload.supabaseUserId,
        email: payload.email,
        authProvider: payload.authProvider,
        profile: {
          create: {},
        },
      },
      include: { profile: true },
    });
  }

  toMeResponse(user: NonNullable<UserWithProfile>) {
    return {
      id: user.id,
      email: user.email,
      display_name: user.displayName,
      profile: {
        preferred_language: user.profile?.preferredLanguage ?? "en",
        timezone: user.profile?.timezone ?? null,
        onboarding_completed: user.profile?.onboardingCompleted ?? false,
      },
    };
  }
}
