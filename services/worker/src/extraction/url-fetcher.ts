import { FetchResult } from "./types";

export class UrlFetcher {
  constructor(private readonly timeoutMs = 10000) {}

  async fetch(url: string): Promise<FetchResult> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          "user-agent": "LinkraiBot/0.1 (+https://linkrai.app)",
          accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
        redirect: "follow",
      });

      if (!response.ok) {
        throw new Error(`Fetch failed with status ${response.status}`);
      }

      return {
        finalUrl: response.url || url,
        contentType: response.headers.get("content-type"),
        html: await response.text(),
      };
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error(`Fetch timed out after ${this.timeoutMs}ms`);
      }
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  }
}
