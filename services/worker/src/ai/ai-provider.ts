export interface AiEnrichmentInput {
  title: string | null;
  description: string | null;
  sourceDomain: string | null;
  contentType: string | null;
  rawText: string | null;
  existingCategories: string[];
}

export interface AiEnrichmentResult {
  summary: string;
  shortSummary: string;
  language: string;
  tags: string[];
  suggestedCategory: string;
  mainPoints: string[];
}

export interface AiProvider {
  enrich(input: AiEnrichmentInput): Promise<AiEnrichmentResult>;
  embed(input: string): Promise<number[]>;
}
