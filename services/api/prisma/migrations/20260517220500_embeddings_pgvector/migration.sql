CREATE EXTENSION IF NOT EXISTS vector;

ALTER TABLE "saved_items"
ADD COLUMN "embedding" vector(1536);

CREATE INDEX "saved_items_embedding_idx"
ON "saved_items"
USING ivfflat ("embedding" vector_cosine_ops)
WITH (lists = 100);
