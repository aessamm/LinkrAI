import { LinkExtractor } from "./link-extractor";

describe("LinkExtractor", () => {
  it("returns failed extraction output when fetch fails", async () => {
    const fetcher = {
      fetch: jest.fn().mockRejectedValue(new Error("network failed")),
    };
    const htmlExtractor = {
      extract: jest.fn(),
    };
    const extractor = new LinkExtractor(fetcher as never, htmlExtractor as never);

    await expect(extractor.extract("https://example.com/fail")).resolves.toEqual({
      title: null,
      description: null,
      image: null,
      canonicalUrl: null,
      sourceDomain: "example.com",
      contentType: "unknown",
      rawText: null,
      extractionStatus: "failed",
      error: "network failed",
    });
  });
});
