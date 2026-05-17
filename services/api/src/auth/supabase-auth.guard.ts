import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { verify } from "jsonwebtoken";
import { UsersService } from "../users/users.service";
import type { AuthenticatedRequest } from "./authenticated-request";

interface SupabaseJwtPayload {
  sub?: unknown;
  email?: unknown;
  app_metadata?: {
    provider?: unknown;
  };
}

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = this.getBearerToken(request.headers.authorization);
    const jwtSecret = this.configService.get<string>("SUPABASE_JWT_SECRET");

    if (!jwtSecret) {
      throw new UnauthorizedException("Authentication is not configured.");
    }

    const payload = await this.verifyToken(token, jwtSecret);
    const supabaseUserId = this.getStringClaim(payload.sub);
    const email = this.getStringClaim(payload.email);

    if (!supabaseUserId || !email) {
      throw new UnauthorizedException("Invalid authentication token.");
    }

    request.user = await this.usersService.findOrCreateFromSupabase({
      supabaseUserId,
      email,
      authProvider: this.getStringClaim(payload.app_metadata?.provider),
    });

    return true;
  }

  private getBearerToken(authorizationHeader: string | undefined): string {
    if (!authorizationHeader) {
      throw new UnauthorizedException("Missing authentication token.");
    }

    const [scheme, token] = authorizationHeader.split(" ");
    if (scheme !== "Bearer" || !token) {
      throw new UnauthorizedException("Invalid authentication header.");
    }

    return token;
  }

  private async verifyToken(token: string, jwtSecret: string): Promise<SupabaseJwtPayload> {
    try {
      const payload = verify(token, jwtSecret);
      if (typeof payload === "string") {
        throw new UnauthorizedException("Invalid authentication token.");
      }
      return payload as SupabaseJwtPayload;
    } catch {
      throw new UnauthorizedException("Invalid authentication token.");
    }
  }

  private getStringClaim(value: unknown): string | undefined {
    return typeof value === "string" && value.trim().length > 0 ? value : undefined;
  }
}
