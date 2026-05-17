export type ContentType = "article" | "video" | "social_post" | "pdf" | "unknown";
export type ExtractionStatus = "full_content" | "partial_content" | "metadata_only" | "failed";

export interface FetchResult {
  finalUrl: string;
  contentType: string | null;
  html: string;
}

export interface ExtractionResult {
  title: string | null;
  description: string | null;
  image: string | null;
  canonicalUrl: string | null;
  sourceDomain: string;
  contentType: ContentType;
  rawText: string | null;
  extractionStatus: ExtractionStatus;
  error: string | null;
}
