import { Injectable, ServiceUnavailableException } from "@nestjs/common";
import OpenAI from "openai";

const DEFAULT_EMBEDDING_MODEL = "text-embedding-3-small";

@Injectable()
export class SearchEmbeddingProvider {
  private readonly client: OpenAI | null;
  private readonly model: string;

  constructor() {
    this.model = process.env.OPENAI_EMBEDDING_MODEL ?? DEFAULT_EMBEDDING_MODEL;
    this.client = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;
  }

  async embed(input: string): Promise<number[]> {
    if (!this.client) {
      throw new ServiceUnavailableException("Semantic search requires OPENAI_API_KEY.");
    }

    const response = await this.client.embeddings.create({
      model: this.model,
      input,
      encoding_format: "float",
    });

    return response.data[0]?.embedding ?? [];
  }
}
