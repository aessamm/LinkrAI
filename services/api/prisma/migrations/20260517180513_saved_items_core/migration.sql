-- CreateTable
CREATE TABLE "usage_counters" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "period_key" TEXT NOT NULL,
    "saved_links_count" INTEGER NOT NULL DEFAULT 0,
    "ai_summaries_count" INTEGER NOT NULL DEFAULT 0,
    "semantic_search_count" INTEGER NOT NULL DEFAULT 0,
    "youtube_analysis_count" INTEGER NOT NULL DEFAULT 0,
    "pdf_analysis_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usage_counters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "is_ai_generated" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saved_items" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "category_id" UUID,
    "url" TEXT NOT NULL,
    "normalized_url" TEXT NOT NULL,
    "canonical_url" TEXT,
    "title" TEXT,
    "description" TEXT,
    "thumbnail_url" TEXT,
    "source_domain" TEXT,
    "source_platform" TEXT,
    "content_type" TEXT,
    "language" TEXT,
    "summary" TEXT,
    "short_summary" TEXT,
    "raw_text" TEXT,
    "main_points" JSONB,
    "processing_status" TEXT NOT NULL DEFAULT 'pending',
    "extraction_status" TEXT,
    "processing_error" TEXT,
    "user_notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "saved_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saved_item_tags" (
    "saved_item_id" UUID NOT NULL,
    "tag_id" UUID NOT NULL,

    CONSTRAINT "saved_item_tags_pkey" PRIMARY KEY ("saved_item_id","tag_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usage_counters_user_id_period_key_key" ON "usage_counters"("user_id", "period_key");

-- CreateIndex
CREATE UNIQUE INDEX "categories_user_id_slug_key" ON "categories"("user_id", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "tags_user_id_slug_key" ON "tags"("user_id", "slug");

-- CreateIndex
CREATE INDEX "saved_items_user_id_idx" ON "saved_items"("user_id");

-- CreateIndex
CREATE INDEX "saved_items_normalized_url_idx" ON "saved_items"("normalized_url");

-- CreateIndex
CREATE INDEX "saved_items_category_id_idx" ON "saved_items"("category_id");

-- CreateIndex
CREATE INDEX "saved_items_source_domain_idx" ON "saved_items"("source_domain");

-- CreateIndex
CREATE INDEX "saved_items_processing_status_idx" ON "saved_items"("processing_status");

-- CreateIndex
CREATE INDEX "saved_items_created_at_idx" ON "saved_items"("created_at");

-- AddForeignKey
ALTER TABLE "usage_counters" ADD CONSTRAINT "usage_counters_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_items" ADD CONSTRAINT "saved_items_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_items" ADD CONSTRAINT "saved_items_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_item_tags" ADD CONSTRAINT "saved_item_tags_saved_item_id_fkey" FOREIGN KEY ("saved_item_id") REFERENCES "saved_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_item_tags" ADD CONSTRAINT "saved_item_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
