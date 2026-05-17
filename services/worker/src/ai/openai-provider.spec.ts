import { OpenAiProvider } from "./openai-provider";
import OpenAI from "openai";

jest.mock("openai", () => jest.fn());

describe("OpenAiProvider", () => {
  it("returns null from env factory when OPENAI_API_KEY is missing", () => {
    const previous = process.env.OPENAI_API_KEY;
    delete process.env.OPENAI_API_KEY;

    expect(OpenAiProvider.fromEnv()).toBeNull();

    if (previous === undefined) {
      delete process.env.OPENAI_API_KEY;
    } else {
      process.env.OPENAI_API_KEY = previous;
    }
  });

  it("uses OpenAI structured output for enrichment", async () => {
    const create = jest.fn().mockResolvedValue({
      output_text: JSON.stringify({
        summary: "Detailed summary.",
        shortSummary: "Short summary.",
        language: "en",
        tags: ["AI", "Research"],
        suggestedCategory: "Research",
        mainPoints: ["Point one"],
      }),
    });
    (OpenAI as unknown as jest.Mock).mockImplementation(() => ({
      responses: { create },
      embeddings: { create: jest.fn() },
    }));
    const provider = new OpenAiProvider("test-key", "test-model");

    await expect(
      provider.enrich({
        title: "Title",
        description: "Description",
        sourceDomain: "example.com",
        contentType: "article",
        rawText: "Readable text",
        existingCategories: ["Research"],
      })
    ).resolves.toEqual({
      summary: "Detailed summary.",
      shortSummary: "Short summary.",
      language: "en",
      tags: ["AI", "Research"],
      suggestedCategory: "Research",
      mainPoints: ["Point one"],
    });

    expect(create).toHaveBeenCalledWith(
      expect.objectContaining({
        model: "test-model",
        text: expect.objectContaining({
          format: expect.objectContaining({
            type: "json_schema",
            name: "linkrai_enrichment",
            strict: true,
          }),
        }),
      })
    );
  });

  it("creates embeddings with the configured embedding model", async () => {
    const create = jest.fn().mockResolvedValue({
      data: [{ embedding: [0.1, 0.2, 0.3] }],
    });
    (OpenAI as unknown as jest.Mock).mockImplementation(() => ({
      responses: { create: jest.fn() },
      embeddings: { create },
    }));
    const provider = new OpenAiProvider("test-key", "summary-model", "embedding-model");

    await expect(provider.embed("Searchable article text")).resolves.toEqual([0.1, 0.2, 0.3]);

    expect(create).toHaveBeenCalledWith({
      model: "embedding-model",
      input: "Searchable article text",
      encoding_format: "float",
    });
  });
});
