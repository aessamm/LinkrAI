# Linkrai — Application Brief

## 1. Overview

**Linkrai** is an AI-powered personal memory app for saved links.

Users often save videos, articles, social media posts, websites, tools, and resources across different platforms, but later struggle to remember where they saved them, what they were about, or how to find them again.

Linkrai solves this problem by allowing users to save any URL from anywhere, then using AI to understand the content, summarize it, categorize it, extract useful keywords, and make it searchable later by meaning — not only by exact words.

---

## 2. Product Positioning

Linkrai is not just a bookmark manager.

It is:

> **An AI memory for every link you save.**

The app helps users turn scattered links into an organized, searchable, AI-powered knowledge library.

---

## 3. Core Problem

Many users currently save links by:

- Sending links to themselves on WhatsApp or Telegram.
- Saving bookmarks in the browser.
- Adding links to notes apps.
- Using platform-specific save buttons.
- Copying links into random documents or chats.

The problem is that saved links quickly become messy, unorganized, and hard to retrieve.

Users usually forget:

- Why they saved the link.
- What the link was about.
- Which platform it came from.
- Which category it belongs to.
- What keyword to search for later.

---

## 4. Solution

Linkrai allows users to save any URL and automatically creates a smart memory record for it.

For each saved link, the app can:

- Extract metadata.
- Detect the source platform.
- Analyze available content.
- Generate an AI summary.
- Suggest or create a category.
- Generate tags and keywords.
- Store the original URL.
- Enable keyword search.
- Enable semantic search by meaning.
- Help users find saved links later using natural language.

---

## 5. Target Users

### 5.1 Primary Users

- Professionals who save business, productivity, and learning resources.
- Founders and entrepreneurs collecting market insights and ideas.
- Students and researchers saving educational materials.
- Content creators collecting inspiration and references.
- Marketers saving campaigns, trends, and competitor content.
- Developers saving technical articles, documentation, tools, and tutorials.

### 5.2 Secondary Users

- Consultants.
- Product managers.
- Designers.
- Sales teams.
- Knowledge workers.
- Anyone who saves links frequently and struggles to organize them.

---

## 6. Main Use Cases

### 6.1 Save Articles for Later

A user finds an article and shares the URL to Linkrai.  
The app summarizes it, tags it, and saves it under the right category.

### 6.2 Save Social Media Posts

A user finds a useful LinkedIn post, X/Twitter thread, Facebook post, or other social content.  
Linkrai saves the available metadata and summarizes the content when accessible.

### 6.3 Save YouTube Videos

A user saves a YouTube video.  
Linkrai extracts the title, thumbnail, metadata, and later can analyze transcript if available.

### 6.4 Save Business Ideas

A founder saves market research links, competitor pages, pricing pages, and product ideas.  
Later, they search using natural language like:

> “Show me the links about SaaS pricing ideas.”

### 6.5 Save Learning Resources

A student or professional saves courses, tutorials, technical guides, and videos.  
Linkrai organizes them automatically into topics.

### 6.6 Search by Meaning

Instead of remembering the exact title or keyword, the user can search by meaning:

> “The article about AI tools for clinics.”

Linkrai returns relevant saved links even if the exact words are different.

---

## 7. Key Features

## 7.1 Link Saving

Users can save URLs manually or through the mobile share sheet.

### Feature Details

- Paste URL manually.
- Share URL from other apps.
- Save from browser.
- Save from social media apps.
- Immediate confirmation after saving.
- Background processing after saving.

---

## 7.2 AI Summary

Linkrai generates a concise summary for each saved link.

### Feature Details

- Short summary.
- Detailed summary later.
- Language detection.
- Arabic and English support.
- Summary based on available content.
- Clear indication if only partial content was available.

---

## 7.3 Auto Categorization

The app automatically assigns saved links to relevant categories.

### Feature Details

- Detect existing related categories.
- Create a new category when needed.
- Allow users to manually change categories.
- Show category badges on saved link cards.

Example categories:

- AI
- Business
- Marketing
- Development
- Design
- Productivity
- Research
- Learning
- Videos
- Tools

---

## 7.4 Tags and Keywords

Linkrai generates useful tags and keywords for better organization and search.

### Feature Details

- AI-generated tags.
- Editable tags.
- Searchable keywords.
- Tags shown on link cards and details screen.

---

## 7.5 Semantic Search

Users can search saved links by meaning, not just exact keywords.

### Feature Details

- Natural language search.
- AI-powered retrieval.
- Search across summaries, tags, titles, categories, and content.
- Ranking by relevance.
- Future support for advanced filters.

Example searches:

- “AI tools for nutrition clinics”
- “Marketing ideas for SaaS”
- “Videos about productivity”
- “Articles about pricing strategies”

---

## 7.6 Library

The Library is the main place where all saved links appear.

### Feature Details

- Saved link cards.
- Search bar.
- Category filters.
- Tags preview.
- Processing status.
- Source platform.
- Saved date.
- Thumbnail when available.

---

## 7.7 Link Details

Each saved item has a detailed page.

### Feature Details

- Title.
- Source.
- Original URL.
- Thumbnail.
- AI summary.
- Category.
- Tags.
- Notes.
- Processing status.
- Open original link action.
- Edit category/tags.
- Delete or archive link.

---

## 7.8 Processing States

The app clearly shows the status of each saved link.

### Supported States

- Pending.
- Processing.
- Completed.
- Failed.
- Partial analysis.
- Metadata only.

This is important because some platforms may not allow full content extraction.

---

## 7.9 User Account

Users can register and access their saved links across devices.

### Feature Details

- Email registration.
- Login.
- Password reset.
- Google login.
- Apple login later.
- User profile.
- Secure authentication.

---

## 7.10 Subscription and Usage Limits

The app supports subscription plans with usage limits.

### Suggested Plans

#### Free Plan

- Limited saved links per month.
- Limited AI summaries.
- Basic search.
- Basic categories.

#### Pro Plan

- More saved links.
- More AI summaries.
- Semantic search.
- Unlimited categories.
- Weekly digest.

#### Power Plan

- Higher usage limits.
- Advanced AI processing.
- YouTube transcript analysis.
- PDF/link deep analysis later.
- Priority processing.

---

## 7.11 Usage Tracking

The system tracks user usage monthly.

### Tracked Actions

- Saved links.
- AI summaries.
- Semantic searches.
- YouTube analysis later.
- PDF analysis later.

If a user reaches the limit, the backend returns an upgrade-required response.

---

## 7.12 Notifications

Notifications can help users stay engaged.

### Possible Notifications

- Link analysis completed.
- Weekly saved links digest.
- Usage limit warning.
- Failed link processing.
- Suggested review of saved links.

---

## 7.13 Weekly Digest

A weekly digest can summarize what the user saved during the week.

### Digest Content

- Recently saved links.
- Top categories.
- Important summaries.
- Suggested links to revisit.
- Search prompts based on saved content.

---

## 8. MVP Scope

The first MVP should focus on the core save-and-retrieve experience.

### MVP Must-Have Features

- User registration and login.
- Save URL manually.
- Save URL from mobile share sheet.
- Link metadata extraction.
- AI summary.
- Auto category.
- AI-generated tags.
- Library screen.
- Link details screen.
- Keyword search.
- Basic semantic search.
- Usage limits.
- Subscription-ready structure.
- Light and dark theme support.

### MVP Should-Have Features

- Google login.
- Processing status updates.
- Local mobile cache.
- Manual category/tag editing.
- Basic subscription screen.
- Weekly digest later.

### Out of MVP Scope

- Team workspaces.
- Public collections.
- Browser extension.
- PDF deep analysis.
- Advanced YouTube transcript analysis.
- Collaboration.
- Import from browser bookmarks.
- Full notes editor.
- Knowledge graph.

---

## 9. Future Features

### 9.1 Browser Extension

Allow users to save links directly from Chrome, Edge, or Firefox.

### 9.2 WhatsApp / Telegram Bot

Users can forward links to a bot and have them saved automatically.

### 9.3 AI Chat with Saved Links

Users can ask questions across their saved library.

Example:

> “What did I save about CRM automation?”

### 9.4 Collections

Users can group saved links into manual collections.

### 9.5 Public Sharing

Users can share curated collections with others.

### 9.6 Team Workspace

Teams can save, categorize, and search shared resources.

### 9.7 PDF Analysis

Users can save PDF links or upload PDFs and receive summaries.

### 9.8 YouTube Transcript Analysis

Analyze video transcripts when available and summarize key points.

### 9.9 Smart Reminders

Remind users to revisit saved links based on topics and priority.

---

## 10. User Flow

### 10.1 Save Link Flow

1. User finds a useful URL.
2. User shares it to Linkrai or pastes it manually.
3. Linkrai creates a saved item immediately.
4. The item status becomes `Pending`.
5. Backend queues the processing job.
6. Worker extracts metadata and content.
7. AI generates summary, category, tags, and embeddings.
8. Item status becomes `Completed`.
9. User can search and revisit it anytime.

---

### 10.2 Search Flow

1. User opens Search.
2. User types a keyword or natural language query.
3. Backend searches titles, summaries, tags, categories, and embeddings.
4. Results are ranked by relevance.
5. User opens the most relevant saved item.

---

### 10.3 Subscription Flow

1. User starts on Free plan.
2. User saves and summarizes links within monthly limits.
3. When the user reaches a limit, the app shows an upgrade prompt.
4. User upgrades to Pro or Power.
5. Backend updates subscription status and usage limits.
6. User continues using higher limits.

---

## 11. Technical Overview

### 11.1 Recommended Stack

#### Mobile

- Flutter.
- Riverpod.
- GoRouter.
- Dio.
- Drift / SQLite.
- Firebase Cloud Messaging.
- Native Share Extension.

#### Backend

- NestJS.
- TypeScript.
- PostgreSQL.
- Prisma or Drizzle.
- pgvector.
- Redis.
- BullMQ.

#### AI Processing

- Worker service.
- URL metadata extraction.
- Content extraction.
- LLM summarization.
- Category classification.
- Keyword generation.
- Embedding generation.

#### Web Dashboard

- Next.js App Router.
- Tailwind CSS.
- shadcn/ui.

#### Billing

- RevenueCat for mobile subscriptions.
- Stripe/Web billing later.
- Backend-controlled entitlements and limits.

---

## 12. Data Objects

### 12.1 Saved Item

A saved item represents one saved URL.

Main fields:

- ID.
- User ID.
- URL.
- Normalized URL.
- Title.
- Source platform.
- Content type.
- Thumbnail.
- Summary.
- Language.
- Category.
- Tags.
- Processing status.
- Created date.
- Updated date.

---

### 12.2 Category

A category groups related saved items.

Main fields:

- ID.
- User ID.
- Name.
- Is AI generated.
- Created date.

---

### 12.3 Tag

A tag helps users find saved links.

Main fields:

- ID.
- User ID.
- Name.

---

### 12.4 Subscription

A subscription controls user access and limits.

Main fields:

- User ID.
- Plan.
- Status.
- Provider.
- Current period start.
- Current period end.
- Entitlement.

---

## 13. AI Processing Rules

The app must be transparent about AI processing quality.

### Rules

- Do not claim full analysis if only metadata was available.
- Show partial analysis when content extraction is limited.
- Save the link even if analysis fails.
- Allow users to reprocess later.
- Keep the original URL always available.
- Use cost-efficient AI models for regular summaries.
- Use stronger AI models only when needed.

---

## 14. Business Value

Linkrai creates value by helping users:

- Stop losing useful links.
- Save time searching for old resources.
- Organize knowledge automatically.
- Build a personal knowledge base.
- Turn random saved links into usable memory.
- Revisit important ideas at the right time.

---

## 15. Success Metrics

### Product Metrics

- Number of saved links per user.
- Weekly active users.
- Search usage.
- Percentage of processed links.
- Summary generation success rate.
- Share sheet usage.
- Retention after 7 days and 30 days.

### Business Metrics

- Free-to-paid conversion.
- Monthly recurring revenue.
- Average revenue per user.
- Churn rate.
- Usage limit conversion rate.
- Cost per AI summary.

---

## 16. Suggested Taglines

### English

- Your AI memory for saved links.
- Save links. Recall ideas.
- Turn saved links into searchable memory.
- Never lose a useful link again.
- Save anything. Find it by meaning.

### Arabic

- ذاكرتك الذكية لكل رابط حفظته.
- احفظ أي رابط وارجع له بالمعنى.
- لينكراي يحفظلك الفكرة مش اللينك بس.
- كل روابطك المهمة في ذاكرة ذكية واحدة.
- متضيعش لينك مهم تاني.

---

## 17. One-Line Pitch

**Linkrai is an AI-powered app that saves, summarizes, organizes, and helps users rediscover links by meaning.**

---

## 18. Arabic One-Line Pitch

**لينكراي هو تطبيق ذكي يساعدك تحفظ أي رابط، يلخصه، ينظمه، ويخليك ترجع له بعدين بالمعنى مش بس بالكلمات.**

---

## 19. Short Product Brief

Linkrai is a mobile-first AI link memory app designed for people who save a lot of online content but struggle to find it later.

Instead of saving links randomly in chats, bookmarks, or notes, users can share any URL to Linkrai. The app analyzes the link, creates an AI summary, assigns it to the right category, generates tags, and makes it searchable using keyword and semantic search.

The first version focuses on the core user experience: save a link quickly, let AI organize it, and find it later easily.

---

## 20. Final Product Direction

Linkrai should become the user's trusted AI memory for online knowledge.

The product should start simple:

> Save link → AI understands → User finds it later.

Then evolve into a complete personal knowledge assistant for saved content.
