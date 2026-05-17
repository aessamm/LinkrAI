import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import type { Request, Response } from "express";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    if (status >= 500) {
      this.logger.error(exception);
    }

    response.status(status).json({
      code: this.getCode(exception, status),
      message: this.getMessage(exception),
      details: this.getDetails(exception),
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }

  private getCode(exception: unknown, status: number): string {
    if (status === HttpStatus.UNAUTHORIZED) {
      return "unauthorized";
    }

    if (status === HttpStatus.BAD_REQUEST) {
      return "validation_error";
    }

    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      if (this.isRecord(response) && typeof response.code === "string") {
        return response.code;
      }
    }

    return status >= 500 ? "internal_server_error" : "request_error";
  }

  private getMessage(exception: unknown): string {
    if (!(exception instanceof HttpException)) {
      return "Internal server error.";
    }

    const response = exception.getResponse();
    if (typeof response === "string") {
      return response;
    }

    if (this.isRecord(response)) {
      const message = response.message;
      return Array.isArray(message) ? "Invalid input." : String(message ?? exception.message);
    }

    return exception.message;
  }

  private getDetails(exception: unknown): unknown[] {
    if (!(exception instanceof HttpException)) {
      return [];
    }

    const response = exception.getResponse();
    if (!this.isRecord(response)) {
      return [];
    }

    return Array.isArray(response.message) ? response.message : [];
  }

  private isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
  }
}
