import { HtmlExtractor } from "./html-extractor";
import { ExtractionResult } from "./types";
import { UrlFetcher } from "./url-fetcher";

export class LinkExtractor {
  constructor(
    private readonly fetcher = new UrlFetcher(),
    private readonly htmlExtractor = new HtmlExtractor()
  ) {}

  async extract(url: string): Promise<ExtractionResult> {
    try {
      const fetchResult = await this.fetcher.fetch(url);
      return this.htmlExtractor.extract(fetchResult);
    } catch (error) {
      return {
        title: null,
        description: null,
        image: null,
        canonicalUrl: null,
        sourceDomain: new URL(url).hostname.replace(/^www\./, ""),
        contentType: url.toLowerCase().endsWith(".pdf") ? "pdf" : "unknown",
        rawText: null,
        extractionStatus: "failed",
        error: error instanceof Error ? error.message : "Unknown extraction error.",
      };
    }
  }
}
