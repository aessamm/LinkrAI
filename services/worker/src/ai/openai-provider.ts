import OpenAI from "openai";
import { AiEnrichmentInput, AiEnrichmentResult, AiProvider } from "./ai-provider";

const DEFAULT_MODEL = "gpt-4o-mini";
const DEFAULT_EMBEDDING_MODEL = "text-embedding-3-small";

export class OpenAiProvider implements AiProvider {
  private readonly client: OpenAI;

  static fromEnv(): OpenAiProvider | null {
    if (!process.env.OPENAI_API_KEY) {
      return null;
    }

    return new OpenAiProvider(
      process.env.OPENAI_API_KEY,
      process.env.OPENAI_SUMMARY_MODEL ?? DEFAULT_MODEL,
      process.env.OPENAI_EMBEDDING_MODEL ?? DEFAULT_EMBEDDING_MODEL
    );
  }

  constructor(
    apiKey: string,
    private readonly model = DEFAULT_MODEL,
    private readonly embeddingModel = DEFAULT_EMBEDDING_MODEL
  ) {
    this.client = new OpenAI({ apiKey });
  }

  async enrich(input: AiEnrichmentInput): Promise<AiEnrichmentResult> {
    const response = await this.client.responses.create({
      model: this.model,
      input: [
        {
          role: "system",
          content:
            "You enrich saved links for Linkrai. Use only the provided metadata and text. Do not invent facts. Return concise, useful organization data.",
        },
        {
          role: "user",
          content: JSON.stringify({
            title: input.title,
            description: input.description,
            source_domain: input.sourceDomain,
            content_type: input.contentType,
            existing_categories: input.existingCategories,
            text: input.rawText?.slice(0, 12000) ?? null,
          }),
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "linkrai_enrichment",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              summary: { type: "string" },
              shortSummary: { type: "string" },
              language: { type: "string" },
              tags: {
                type: "array",
                minItems: 1,
                maxItems: 10,
                items: { type: "string" },
              },
              suggestedCategory: { type: "string" },
              mainPoints: {
                type: "array",
                minItems: 1,
                maxItems: 8,
                items: { type: "string" },
              },
            },
            required: [
              "summary",
              "shortSummary",
              "language",
              "tags",
              "suggestedCategory",
              "mainPoints",
            ],
          },
        },
      },
    });

    return this.parseResponse(response.output_text);
  }

  async embed(input: string): Promise<number[]> {
    const response = await this.client.embeddings.create({
      model: this.embeddingModel,
      input,
      encoding_format: "float",
    });

    return response.data[0]?.embedding ?? [];
  }

  private parseResponse(outputText: string): AiEnrichmentResult {
    const parsed = JSON.parse(outputText) as AiEnrichmentResult;
    return {
      summary: parsed.summary,
      shortSummary: parsed.shortSummary,
      language: parsed.language,
      tags: parsed.tags
        .map((tag) => tag.trim())
        .filter(Boolean)
        .slice(0, 10),
      suggestedCategory: parsed.suggestedCategory.trim(),
      mainPoints: parsed.mainPoints
        .map((point) => point.trim())
        .filter(Boolean)
        .slice(0, 8),
    };
  }
}
