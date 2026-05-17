import { Readability } from "@mozilla/readability";
import * as cheerio from "cheerio";
import { JSDOM } from "jsdom";
import { ContentType, ExtractionResult, ExtractionStatus, FetchResult } from "./types";

const FULL_CONTENT_MIN_LENGTH = 500;
const PARTIAL_CONTENT_MIN_LENGTH = 120;

export class HtmlExtractor {
  extract(fetchResult: FetchResult): ExtractionResult {
    const $ = cheerio.load(fetchResult.html);
    const canonicalUrl = this.absoluteUrl(
      this.firstValue(
        $('link[rel="canonical"]').attr("href"),
        $('meta[property="og:url"]').attr("content")
      ),
      fetchResult.finalUrl
    );
    const sourceUrl = canonicalUrl ?? fetchResult.finalUrl;
    const sourceDomain = new URL(sourceUrl).hostname.replace(/^www\./, "");
    const title = this.clean(
      this.firstValue(
        $('meta[property="og:title"]').attr("content"),
        $('meta[name="twitter:title"]').attr("content"),
        $("title").first().text(),
        $("h1").first().text()
      )
    );
    const description = this.clean(
      this.firstValue(
        $('meta[name="description"]').attr("content"),
        $('meta[property="og:description"]').attr("content"),
        $('meta[name="twitter:description"]').attr("content")
      )
    );
    const image = this.absoluteUrl(
      this.firstValue(
        $('meta[property="og:image"]').attr("content"),
        $('meta[name="twitter:image"]').attr("content")
      ),
      fetchResult.finalUrl
    );
    const rawText = this.extractReadableText(fetchResult.html, fetchResult.finalUrl);
    const contentType = this.detectContentType(fetchResult, $, sourceDomain);
    const extractionStatus = this.getExtractionStatus(rawText, title, description);

    return {
      title,
      description,
      image,
      canonicalUrl,
      sourceDomain,
      contentType,
      rawText,
      extractionStatus,
      error: null,
    };
  }

  private extractReadableText(html: string, url: string): string | null {
    try {
      const dom = new JSDOM(html, { url });
      const article = new Readability(dom.window.document).parse();
      return this.clean(article?.textContent);
    } catch {
      return null;
    }
  }

  private detectContentType(
    fetchResult: FetchResult,
    $: cheerio.CheerioAPI,
    sourceDomain: string
  ): ContentType {
    const lowerUrl = fetchResult.finalUrl.toLowerCase();
    const lowerContentType = fetchResult.contentType?.toLowerCase() ?? "";
    const ogType = $('meta[property="og:type"]').attr("content")?.toLowerCase() ?? "";

    if (lowerContentType.includes("pdf") || lowerUrl.endsWith(".pdf")) {
      return "pdf";
    }

    if (
      ogType.includes("video") ||
      sourceDomain.includes("youtube.com") ||
      sourceDomain.includes("youtu.be") ||
      sourceDomain.includes("vimeo.com")
    ) {
      return "video";
    }

    if (
      sourceDomain.includes("twitter.com") ||
      sourceDomain.includes("x.com") ||
      sourceDomain.includes("facebook.com") ||
      sourceDomain.includes("linkedin.com") ||
      sourceDomain.includes("instagram.com") ||
      ogType.includes("social")
    ) {
      return "social_post";
    }

    if (ogType.includes("article") || $("article").length > 0) {
      return "article";
    }

    return "unknown";
  }

  private getExtractionStatus(
    rawText: string | null,
    title: string | null,
    description: string | null
  ): ExtractionStatus {
    const length = rawText?.length ?? 0;

    if (length >= FULL_CONTENT_MIN_LENGTH) {
      return "full_content";
    }

    if (length >= PARTIAL_CONTENT_MIN_LENGTH) {
      return "partial_content";
    }

    if (title || description) {
      return "metadata_only";
    }

    return "failed";
  }

  private absoluteUrl(value: string | null, baseUrl: string): string | null {
    if (!value) {
      return null;
    }

    try {
      return new URL(value, baseUrl).toString();
    } catch {
      return null;
    }
  }

  private firstValue(...values: Array<string | undefined>): string | null {
    return values.find((value) => value && value.trim().length > 0)?.trim() ?? null;
  }

  private clean(value: string | null | undefined): string | null {
    const cleaned = value?.replace(/\s+/g, " ").trim();
    return cleaned && cleaned.length > 0 ? cleaned : null;
  }
}
