# 04 — AI Pipeline Plan

## 1. Goal

Process saved links asynchronously and enrich them with metadata, summaries, categories, tags, and embeddings.

## 2. Why Async

URL extraction, AI summarization, and embeddings can be slow or fail. The API should respond quickly and let workers handle processing in the background.

## 3. Pipeline Stages

```text
1. Normalize URL
2. Fetch metadata
3. Detect content type
4. Extract available content
5. Determine extraction status
6. Detect language
7. Generate summary
8. Generate short summary
9. Generate keywords/tags
10. Suggest category
11. Generate embedding
12. Save outputs
13. Update processing status
14. Notify user later
```

## 4. Extraction Status

Use one of:

```text
full_content
partial_content
metadata_only
failed
```

## 5. Processing Status

Use one of:

```text
pending
processing
completed
failed
```

## 6. Content Type Detection

Initial types:

```text
article
video
social_post
pdf
unknown
```

MVP priority:

1. Web article
2. Generic metadata
3. YouTube metadata/transcript if available later
4. PDF later

## 7. Worker Design

Use BullMQ processors:

```text
link-processing.queue
```

Processor responsibilities:

- Load saved item
- Mark as `processing`
- Run extraction
- Run AI if usage allows
- Save output
- Mark as `completed`
- On failure, save error and mark `failed`

## 8. AI Provider Abstraction

Create interface:

```ts
interface AiProvider {
  summarize(input: SummarizeInput): Promise<SummarizeResult>;
  generateTags(input: TagsInput): Promise<TagsResult>;
  classifyCategory(input: CategoryInput): Promise<CategoryResult>;
  embed(input: EmbeddingInput): Promise<number[]>;
}
```

## 9. Prompting Rules

### Summary

Return:

- `title`
- `short_summary`
- `detailed_summary`
- `language`
- `main_points`

### Tags

Return 5–10 clean tags.

### Category

Return one recommended category name. Prefer existing categories if provided.

### Safety

Do not generate unsupported claims. Summaries should be based only on extracted content/metadata.

## 10. Fallback Strategy

If full article extraction fails:

- Use Open Graph title/description.
- Store item as `metadata_only`.
- Generate a limited summary only if there is enough metadata.
- Clearly mark that content analysis is partial.

## 11. Usage Tracking

Increment AI usage only when summary generation actually runs successfully.

## 12. Future Enhancements

- YouTube transcript extraction
- PDF text extraction
- Screenshot/OCR support
- Duplicate detection
- Clustering
- Weekly digest
- Chat with saved library
