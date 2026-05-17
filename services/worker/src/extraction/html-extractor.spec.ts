import { HtmlExtractor } from "./html-extractor";

describe("HtmlExtractor", () => {
  const extractor = new HtmlExtractor();

  it("extracts article metadata and readable text", () => {
    const paragraphs = Array.from(
      { length: 12 },
      (_, index) =>
        `<p>This is paragraph ${index} with useful article content for Linkrai extraction tests.</p>`
    ).join("");
    const result = extractor.extract({
      finalUrl: "https://example.com/posts/test?utm=1",
      contentType: "text/html; charset=utf-8",
      html: `
        <html>
          <head>
            <title>Fallback title</title>
            <link rel="canonical" href="/posts/test" />
            <meta property="og:title" content="Readable Article" />
            <meta name="description" content="A useful article description." />
            <meta property="og:image" content="/image.jpg" />
            <meta property="og:type" content="article" />
          </head>
          <body>
            <article>
              <h1>Readable Article</h1>
              ${paragraphs}
            </article>
          </body>
        </html>
      `,
    });

    expect(result).toMatchObject({
      title: "Readable Article",
      description: "A useful article description.",
      image: "https://example.com/image.jpg",
      canonicalUrl: "https://example.com/posts/test",
      sourceDomain: "example.com",
      contentType: "article",
      extractionStatus: "full_content",
      error: null,
    });
    expect(result.rawText).toContain("useful article content");
  });

  it("stores metadata-only output when readable text is unavailable", () => {
    const result = extractor.extract({
      finalUrl: "https://example.com/card",
      contentType: "text/html",
      html: `
        <html>
          <head>
            <meta property="og:title" content="Metadata Card" />
            <meta property="og:description" content="Only metadata is available." />
          </head>
          <body></body>
        </html>
      `,
    });

    expect(result).toMatchObject({
      title: "Metadata Card",
      description: "Only metadata is available.",
      contentType: "unknown",
      extractionStatus: "metadata_only",
    });
    expect(result.rawText).toBeNull();
  });

  it("detects videos, social posts, and PDFs", () => {
    expect(
      extractor.extract({
        finalUrl: "https://youtube.com/watch?v=abc",
        contentType: "text/html",
        html: "<html><head><title>Video</title></head><body></body></html>",
      }).contentType
    ).toBe("video");

    expect(
      extractor.extract({
        finalUrl: "https://twitter.com/example/status/1",
        contentType: "text/html",
        html: "<html><head><title>Post</title></head><body></body></html>",
      }).contentType
    ).toBe("social_post");

    expect(
      extractor.extract({
        finalUrl: "https://example.com/file.pdf",
        contentType: "application/pdf",
        html: "",
      }).contentType
    ).toBe("pdf");
  });
});
