# DESIGN.md — Linkrai Design System

## 1. Product Identity

**Product Name:** Linkrai  
**Arabic Name:** لينكراي  
**Primary Tagline:** Your AI memory for saved links.  
**Arabic Tagline:** ذاكرتك الذكية لكل رابط حفظته.

Linkrai is an AI-powered personal memory app for saved links. It helps users save URLs from anywhere, understand them with AI, organize them automatically, and find them later by meaning.

This design system defines a unique visual identity for Linkrai. It must be treated as an independent product identity and must not inherit Code Clouders colors, styling, gradients, mascot language, or brand assets.

---

## 2. Design Direction

### 2.1 Core Concept

Linkrai should feel like:

> A calm AI memory space where saved links become organized, searchable knowledge.

The visual identity is based on the idea of **memory threads**: every saved link becomes a connected memory node that can be recalled later through AI search.

### 2.2 Personality

The interface should feel:

- Smart
- Calm
- Clear
- Personal
- Trustworthy
- Modern
- Lightweight
- Search-focused
- AI-native, but not noisy

### 2.3 Design Keywords

```text
Memory
Recall
Links
Threads
Signals
Knowledge
Clarity
Search
Personal AI
Calm productivity
```

### 2.4 What Linkrai Should Not Look Like

Linkrai should not look like:

- A generic bookmark manager.
- A heavy enterprise dashboard.
- A social media app.
- A notes app clone.
- A flashy AI toy.
- A Code Clouders-branded product.
- A dark navy/orange corporate interface.

---

## 3. Unique Visual Language

### 3.1 Visual Metaphor

The core visual metaphor is:

> Links become memory signals.

Use subtle visuals inspired by:

- Connected dots.
- Memory threads.
- Soft search glow.
- Small link nodes.
- Knowledge cards.
- AI recall signals.
- Timeline fragments.
- Semantic clusters.

Avoid excessive futuristic elements. The product should feel practical and elegant.

### 3.2 Signature Visual Elements

Use these elements consistently:

1. **Memory Thread Lines**  
   Thin curved or straight lines connecting saved items, tags, or categories.

2. **Recall Glow**  
   A soft cyan/violet glow used around search and AI-related areas.

3. **Knowledge Cards**  
   Clean cards containing link summaries, categories, and tags.

4. **Semantic Chips**  
   Rounded tags that feel searchable and interactive.

5. **AI Signal Badge**  
   A small AI indicator used only when AI has generated content.

---

## 4. Brand Color System

Linkrai must use its own color palette.

The recommended direction is **calm light surfaces + electric AI accents + deep readable text**.

### 4.1 Core Palette

```text
Memory Indigo       #4F46E5
Recall Cyan         #06B6D4
Signal Violet       #8B5CF6
Fresh Mint          #10B981
Deep Ink            #0F172A
Cloud White         #FFFFFF
Mist Background     #F8FAFC
Soft Slate          #E2E8F0
Slate Text          #334155
Muted Text          #64748B
```

### 4.2 Why This Palette

- **Memory Indigo** gives the app a strong identity and product seriousness.
- **Recall Cyan** represents search, recall, and AI signals.
- **Signal Violet** gives a modern AI-native feel without becoming childish.
- **Fresh Mint** supports success and completed states.
- **Deep Ink** gives strong readability and premium contrast.
- **Mist Background** keeps the UI calm and lightweight.

### 4.3 Primary Brand Gradient

Use gradients sparingly.

```text
Primary Gradient:
#4F46E5 → #06B6D4

AI Gradient:
#8B5CF6 → #06B6D4

Success Gradient:
#10B981 → #06B6D4
```

Rules:

- Do not use gradients on every card.
- Use gradients for onboarding visuals, AI search areas, premium CTAs, and empty states.
- Keep regular UI components mostly flat and clean.

---

# 5. Light Theme

## 5.1 Light Theme Tokens

```text
theme.light.background.primary       = #FFFFFF
theme.light.background.secondary     = #F8FAFC
theme.light.background.tertiary      = #F1F5F9

theme.light.surface.primary          = #FFFFFF
theme.light.surface.secondary        = #F8FAFC
theme.light.surface.elevated         = #FFFFFF
theme.light.surface.memory           = #EEF2FF
theme.light.surface.ai               = #ECFEFF
theme.light.surface.violet           = #F5F3FF

theme.light.border.subtle            = #E2E8F0
theme.light.border.default           = #CBD5E1
theme.light.border.focus             = #06B6D4

theme.light.text.primary             = #0F172A
theme.light.text.secondary           = #334155
theme.light.text.tertiary            = #64748B
theme.light.text.disabled            = #94A3B8
theme.light.text.inverse             = #FFFFFF

theme.light.primary.default          = #4F46E5
theme.light.primary.hover            = #4338CA
theme.light.primary.pressed          = #3730A3
theme.light.primary.subtle           = #EEF2FF

theme.light.accent.default           = #06B6D4
theme.light.accent.hover             = #0891B2
theme.light.accent.pressed           = #0E7490
theme.light.accent.subtle            = #ECFEFF

theme.light.ai.default               = #8B5CF6
theme.light.ai.hover                 = #7C3AED
theme.light.ai.subtle                = #F5F3FF

theme.light.success.default          = #10B981
theme.light.success.subtle           = #ECFDF5

theme.light.warning.default          = #F59E0B
theme.light.warning.subtle           = #FFFBEB

theme.light.error.default            = #EF4444
theme.light.error.subtle             = #FEF2F2

theme.light.info.default             = #0EA5E9
theme.light.info.subtle              = #F0F9FF

theme.light.shadow.soft              = rgba(15, 23, 42, 0.06)
theme.light.shadow.medium            = rgba(15, 23, 42, 0.10)
theme.light.overlay                  = rgba(15, 23, 42, 0.48)
```

## 5.2 Light Theme Usage

Use light theme as the default experience.

Recommended usage:

- Main background: Mist Background or Cloud White.
- Cards: Cloud White.
- Main CTA: Memory Indigo.
- AI/search highlights: Recall Cyan or Signal Violet.
- Tags: Subtle cyan/violet surfaces.
- Success states: Fresh Mint.
- Warnings: Amber only when needed.

---

# 6. Dark Theme

## 6.1 Dark Theme Tokens

```text
theme.dark.background.primary        = #080B14
theme.dark.background.secondary      = #0F172A
theme.dark.background.tertiary       = #111827

theme.dark.surface.primary           = #0F172A
theme.dark.surface.secondary         = #111827
theme.dark.surface.elevated          = #172033
theme.dark.surface.memory            = #1E1B4B
theme.dark.surface.ai                = #0E3742
theme.dark.surface.violet            = #2E1065

theme.dark.border.subtle             = #1E293B
theme.dark.border.default            = #334155
theme.dark.border.focus              = #22D3EE

theme.dark.text.primary              = #F8FAFC
theme.dark.text.secondary            = #CBD5E1
theme.dark.text.tertiary             = #94A3B8
theme.dark.text.disabled             = #64748B
theme.dark.text.inverse              = #0F172A

theme.dark.primary.default           = #818CF8
theme.dark.primary.hover             = #A5B4FC
theme.dark.primary.pressed           = #C7D2FE
theme.dark.primary.subtle            = #1E1B4B

theme.dark.accent.default            = #22D3EE
theme.dark.accent.hover              = #67E8F9
theme.dark.accent.pressed            = #A5F3FC
theme.dark.accent.subtle             = #0E3742

theme.dark.ai.default                = #A78BFA
theme.dark.ai.hover                  = #C4B5FD
theme.dark.ai.subtle                 = #2E1065

theme.dark.success.default           = #34D399
theme.dark.success.subtle            = #052E2B

theme.dark.warning.default           = #FBBF24
theme.dark.warning.subtle            = #3B2A0A

theme.dark.error.default             = #F87171
theme.dark.error.subtle              = #3F1515

theme.dark.info.default              = #38BDF8
theme.dark.info.subtle               = #082F49

theme.dark.shadow.soft               = rgba(0, 0, 0, 0.24)
theme.dark.shadow.medium             = rgba(0, 0, 0, 0.36)
theme.dark.overlay                   = rgba(0, 0, 0, 0.64)
```

## 6.2 Dark Theme Usage

Dark theme should feel like a calm memory workspace.

Rules:

- Avoid pure black as the only background.
- Use deep ink and slate surfaces.
- Use cyan and violet as subtle AI accents.
- Use borders more than shadows.
- Maintain high readability.
- Avoid neon overload.

---

# 7. Semantic Color Usage

```text
Memory Indigo:
- Primary buttons
- Active tabs
- Important actions
- Selected states
- Main brand moments

Recall Cyan:
- Search focus
- AI retrieval
- Active input borders
- Semantic search indicators
- Link memory signals

Signal Violet:
- AI summary badges
- AI-generated content
- Smart categorization
- Premium AI moments

Fresh Mint:
- Completed processing
- Synced status
- Successful save
- Active subscription

Amber:
- Partial analysis
- Near usage limit
- Metadata-only extraction

Red:
- Failed analysis
- Invalid URL
- Payment failure

Slate:
- Normal text
- Cards
- Borders
- Neutral UI
```

---

# 8. Typography

## 8.1 Font Direction

Use clean, modern, highly readable fonts.

### Recommended English Font

```text
Inter
```

### Recommended Arabic Font

```text
IBM Plex Sans Arabic
```

Fallback:

```text
system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
```

## 8.2 Type Scale

```text
Display / Hero:       34px / 42px / 700
Page Title:           26px / 34px / 700
Section Title:        20px / 28px / 700
Card Title:           16px / 24px / 650
Body:                 14px / 22px / 400
Body Strong:          14px / 22px / 600
Caption:              12px / 18px / 400
Micro:                11px / 16px / 500
Button:               14px / 20px / 650
```

## 8.3 Typography Rules

- Saved link card titles should be readable in 1–2 lines.
- Summaries should be comfortable to scan.
- Tags should use short text.
- Avoid dense paragraphs in mobile list views.
- Use generous line height for Arabic.

---

# 9. Spacing System

Use an 8-point system.

```text
space.0   = 0
space.1   = 4
space.2   = 8
space.3   = 12
space.4   = 16
space.5   = 20
space.6   = 24
space.8   = 32
space.10  = 40
space.12  = 48
space.16  = 64
```

## 9.1 Mobile Spacing

```text
Screen horizontal padding: 16px
Screen vertical section gap: 24px
Card padding: 16px
Compact card padding: 12px
Bottom sheet padding: 20px
```

## 9.2 Web Spacing

```text
Dashboard page padding: 24px to 32px
Sidebar width: 260px
Content max width: 1200px
Card grid gap: 16px to 24px
```

---

# 10. Radius System

```text
radius.xs      = 6px
radius.sm      = 8px
radius.md      = 12px
radius.lg      = 16px
radius.xl      = 20px
radius.2xl     = 28px
radius.full    = 999px
```

Recommended:

```text
Buttons:             14px
Cards:               20px
Inputs:              16px
Bottom sheets:       28px top corners
Tags/Badges:         Full pill
Modals:              28px
Search bars:         18px to full pill
```

The product should feel soft, modern, and personal.

---

# 11. Elevation & Borders

## 11.1 Light Theme

Use very soft shadows.

```text
Card Shadow:
0px 6px 20px rgba(15, 23, 42, 0.06)

Elevated Shadow:
0px 18px 45px rgba(15, 23, 42, 0.12)
```

## 11.2 Dark Theme

Prefer surface elevation and borders.

```text
Card:
border: 1px solid theme.dark.border.subtle

Elevated:
surface.elevated + shadow.medium
```

---

# 12. Iconography

Use rounded, minimal, line-based icons.

Recommended icon style:

```text
Size: 20px / 24px
Stroke: 1.75px to 2px
Corners: rounded
Style: outline-first
```

## 12.1 Core Icons

```text
Link:              chain/link icon
Save:              bookmark-plus icon
AI Summary:        sparkle-document icon
Memory:            connected-nodes icon
Search:            magnifier icon
Semantic Search:   magnifier + sparkle
Category:          folder or stacked-cards icon
Tags:              tag icon
Processing:        pulse / loader
Completed:         check-circle
Failed:            alert-circle
Usage:             gauge / progress ring
Subscription:      diamond / upgrade arrow
Settings:          gear
```

## 12.2 Icon Rules

- Use AI sparkle icons only for AI-generated actions/content.
- Do not decorate every screen with AI symbols.
- Use source favicons when available.
- If no favicon exists, use a neutral link icon.

---

# 13. Illustration Style

Illustrations should be custom to Linkrai.

## 13.1 Illustration Direction

Use abstract, clean, product-focused illustrations:

- Floating link cards.
- Connected memory nodes.
- Search beam finding a card.
- AI thread organizing cards into clusters.
- Personal knowledge library.
- Minimal abstract browser/social cards.

## 13.2 Illustration Colors

Use:

```text
Memory Indigo
Recall Cyan
Signal Violet
Soft Slate
White
```

Do not use orange corporate accents or Code Clouders mascot elements.

## 13.3 Illustration Rules

- Keep illustrations minimal.
- Avoid text inside illustrations.
- Use generous whitespace.
- Avoid generic robot imagery.
- Avoid heavy 3D unless used very subtly in marketing.

---

# 14. Motion System

Motion should be quiet and useful.

## 14.1 Motion Personality

Use motion for:

- Link saved confirmation.
- AI processing progress.
- Summary reveal.
- Search result appearance.
- Category assignment.
- Pull-to-refresh.
- Paywall plan selection.

Avoid motion for:

- Decorative constant glowing.
- Distracting loops.
- Excessive page transitions.

## 14.2 Motion Timing

```text
Micro interaction:      120ms
Standard transition:    180ms
Screen transition:      240ms
AI processing pulse:    1200ms loop
```

## 14.3 Processing Animation

Use a subtle sequence:

```text
Saved → Reading link → Summarizing → Organizing → Ready
```

This can appear as small progress steps or animated status text.

---

# 15. Component System

## 15.1 Buttons

### Primary Button

Used for main actions.

```text
Light background: Memory Indigo
Dark background:  Light Indigo
Text:             White or Deep Ink depending on contrast
Radius:           14px
Height:           48px
```

### Accent Button

Used for AI actions or semantic search.

```text
Background: Recall Cyan or AI Gradient
Text:       Deep Ink or White depending on contrast
```

### Secondary Button

```text
Background: Surface secondary
Border:     Subtle border
Text:       Primary text
```

### Ghost Button

Used for toolbar actions.

```text
Background: Transparent
Text:       Secondary text
```

### Destructive Button

```text
Background: Error subtle or Error default
Text:       Error default or White
```

---

## 15.2 Inputs

Input types:

- URL input
- Search input
- Email input
- Password input
- Category input
- Tag input
- Notes input

## 15.3 Search Input

Search is a strategic product component.

The search input should feel intelligent.

Recommended placeholder:

```text
Search by meaning, topic, or source...
```

Arabic:

```text
ابحث بالمعنى، الموضوع، أو المصدر...
```

Focused state:

- Border uses Recall Cyan.
- Optional soft glow.
- Semantic search hint below input.

---

## 15.4 Saved Link Card

This is the most important component.

### Required Content

- Source favicon/icon
- Title
- Source domain
- Short summary
- Category badge
- Tags preview
- Processing status
- Saved date
- Thumbnail when available

### Card Hierarchy

1. Title
2. Short summary
3. Category + tags
4. Source + date
5. Status

### Visual Rules

- Title maximum 2 lines.
- Summary maximum 3 lines in list view.
- Thumbnail optional; do not force it.
- Cards should feel calm, not crowded.
- Status should be visible but not dominant.

---

## 15.5 AI Summary Card

Used in link details.

### Required Content

- AI-generated label
- Summary text
- Processing quality status:
  - Full analysis
  - Partial analysis
  - Metadata only
- Optional regenerate action later

### Visual Style

Use:

```text
Light: theme.light.surface.ai
Dark:  theme.dark.surface.ai
Accent: Recall Cyan or Signal Violet
```

---

## 15.6 Category Badge

Category badges should be readable and lightweight.

Examples:

```text
AI Tools
Marketing
Research
Videos
Design
Business
Development
```

Style:

- Rounded pill.
- Subtle background.
- Small icon optional.
- Avoid too many colors at once.

---

## 15.7 Tag Chips

Tags are secondary to categories.

Style:

- Smaller than category badges.
- Tertiary text.
- Subtle slate/cyan/violet background.
- Wrapping layout.

---

## 15.8 Status Badges

```text
Pending:        Info
Processing:     Info + pulse
Completed:      Success
Failed:         Error
Partial:        Warning
Metadata Only:  Warning
```

---

## 15.9 Usage Progress Component

Used in subscription/usage screen.

Should show:

- Current plan.
- Used / limit.
- Progress bar or ring.
- Upgrade CTA when close to limit.

Warnings:

```text
80% usage: show soft warning.
100% usage: show upgrade required state.
```

---

# 16. Empty States

## 16.1 Library Empty State

```text
Title:
Your link memory starts here.

Body:
Save articles, videos, posts, and websites. Linkrai will summarize and organize them for you.

CTA:
Add your first link
```

Arabic:

```text
Title:
ذاكرتك للروابط تبدأ من هنا.

Body:
احفظ المقالات والفيديوهات والمنشورات والمواقع، ولينكراي هيلخصها وينظمها لك.

CTA:
احفظ أول رابط
```

## 16.2 Search Empty State

```text
Title:
Search by meaning.

Body:
Try asking for an idea, topic, source, or anything you remember from a saved link.

Examples:
AI tools
SaaS pricing
Nutrition clinic chatbot
Marketing ideas
```

## 16.3 No Results State

```text
Title:
No matching memories found.

Body:
Try a broader search or use different wording.
```

## 16.4 Failed Processing State

```text
Title:
We saved the link, but could not fully analyze it.

Body:
The original link is still available. You can try reprocessing it later.
```

---

# 17. Loading & Processing States

Use skeletons for lists and cards.

Use clear processing messages for saved items:

```text
Saving link...
Reading content...
Generating summary...
Choosing category...
Creating tags...
Preparing search memory...
Ready
```

Arabic:

```text
جاري حفظ الرابط...
جاري قراءة المحتوى...
جاري إنشاء الملخص...
جاري اختيار التصنيف...
جاري إنشاء الوسوم...
جاري تجهيز الذاكرة للبحث...
تم التجهيز
```

---

# 18. Navigation

## 18.1 Mobile Navigation

Use bottom navigation with 4 tabs:

```text
Library
Search
Categories
Settings
```

Arabic:

```text
المكتبة
البحث
التصنيفات
الإعدادات
```

## 18.2 Primary Action

The Add Link action must always be easy to access.

Recommended options:

- Floating action button.
- Prominent button in Library header.
- Share extension for system-level capture.

## 18.3 Navigation Rules

- Keep navigation predictable.
- Do not hide Search.
- Do not bury Subscription/Usage.
- Link Details should be one tap from Library.

---

# 19. Screen Specifications

## 19.1 Onboarding

### Goal

Explain the product quickly.

### Suggested Slides

1. Save links from anywhere.
2. AI summarizes and organizes.
3. Find ideas later by meaning.

### Design

- Abstract memory-thread illustration.
- Minimal text.
- Strong primary CTA.
- Skip option.

---

## 19.2 Login / Register

### Goal

Fast account access.

### Required Elements

- Email/password.
- Google sign-in.
- Apple sign-in later.
- Password reset.
- Privacy reassurance.

### Visual Direction

Clean, trustworthy, and minimal.

---

## 19.3 Library

### Goal

Show saved links clearly.

### Required Elements

- Page title.
- Search bar.
- Add Link action.
- Usage mini indicator.
- Category filters.
- Saved link list.
- Processing states.

Recommended title:

```text
Your Link Memory
```

Arabic:

```text
ذاكرة روابطك
```

---

## 19.4 Add Link

### Goal

Manual URL saving.

### Required Elements

- URL input.
- Optional note.
- Optional category.
- Save button.
- Validation feedback.

After save:

- Create item immediately.
- Show processing status.
- Return to Library or open Details.

---

## 19.5 Shared Link Capture

### Goal

Fast save from external apps.

### Required Elements

- URL preview.
- Source/domain.
- Save button.
- Optional quick note.
- Confirmation state.

The flow must be fast and low-friction.

---

## 19.6 Link Details

### Goal

Detailed view of a saved memory.

### Sections

1. Title and source.
2. Open original link.
3. AI Summary.
4. Category.
5. Tags.
6. Notes.
7. Processing quality.
8. Actions:
   - Edit.
   - Reprocess.
   - Archive.
   - Delete.

---

## 19.7 Search

### Goal

Retrieve saved knowledge.

### Required Elements

- Large semantic search bar.
- Search examples.
- Recent searches.
- Filters.
- Result cards.

Recommended helper text:

```text
Search by idea, topic, source, or anything you remember.
```

---

## 19.8 Categories

### Goal

Browse organized knowledge.

### Required Elements

- Category list or grid.
- Item count.
- AI-generated indicator.
- Recent item preview.
- Edit action.

---

## 19.9 Subscription / Usage

### Goal

Show plan, usage, and upgrade path.

### Required Elements

- Current plan.
- Monthly usage.
- Plan cards.
- Upgrade CTA.
- Restore purchases.
- Feature comparison.

### Plan Names

```text
Free
Pro
Power
```

---

## 19.10 Settings

### Required Sections

- Account.
- Theme.
- Language.
- Notifications.
- Subscription.
- Privacy.
- Export data later.
- Logout.

Theme options:

```text
System
Light
Dark
```

---

# 20. Web Dashboard

The web dashboard should use the same identity but can be more spacious.

## 20.1 Layout

Use sidebar navigation.

```text
Sidebar:
- Library
- Search
- Categories
- Tags
- Usage
- Settings

Topbar:
- Global search
- Add Link
- Profile
```

## 20.2 Web Style

- More whitespace than mobile.
- Split-view option for list + details.
- Strong search experience.
- Minimal data density.
- Same theme tokens.

---

# 21. Accessibility

## 21.1 Contrast

All text must meet WCAG AA contrast minimums.

Rules:

- Avoid low-contrast gray body text.
- Ensure cyan text is not too light on white.
- Badges must remain readable.
- Dark mode must not rely on glow only.

## 21.2 Touch Targets

Minimum:

```text
44px x 44px
```

## 21.3 Reduced Motion

Respect reduced motion settings.

If enabled:

- Disable decorative animation loops.
- Keep essential feedback simple.

## 21.4 Text Scaling

Support system text scaling.

Avoid fixed-height cards for summaries.

---

# 22. Arabic & RTL Readiness

Linkrai should support Arabic and English.

## 22.1 RTL Rules

- Mirror layouts.
- Mirror directional icons.
- Keep URLs LTR.
- Use flexible text containers.
- Allow Arabic summaries to be longer.
- Avoid tight horizontal layouts.

## 22.2 Arabic Tone

Arabic UI copy should be simple and human.

Use:

```text
احفظ الرابط
جاري تحليل الرابط
ملخص ذكي
ابحث بالمعنى
تم حفظ الرابط
```

Avoid overly formal or robotic phrasing.

---

# 23. Subscription UX

## 23.1 Paywall Principles

- Clear value.
- Contextual upgrade prompts.
- No aggressive blocking too early.
- Explain limits simply.
- Always show current usage.

## 23.2 Upgrade Required Message

Example:

```text
You reached your monthly AI summary limit.
Upgrade to Pro to summarize more saved links this month.
```

Arabic:

```text
وصلت للحد الشهري للملخصات الذكية.
قم بالترقية إلى Pro لتلخيص روابط أكثر هذا الشهر.
```

---

# 24. AI UX Rules

## 24.1 Transparency

Always tell the truth about extraction quality.

Statuses:

```text
Full analysis completed
Partial analysis completed
Metadata only
Analysis failed
```

## 24.2 No Fake Certainty

Do not imply the AI understood content that was unavailable.

## 24.3 Save Even If AI Fails

The original link must remain saved even if AI analysis fails.

---

# 25. Content Style

## 25.1 English Voice

Clear, calm, direct.

Good:

```text
Saved to your library.
Analyzing this link...
Search by meaning.
Your monthly limit has been reached.
```

Avoid:

```text
Supercharge your infinite AI brain!
```

## 25.2 Arabic Voice

Natural, simple, not overly formal.

Good:

```text
تم حفظ الرابط.
جاري تحليل المحتوى.
ابحث بالمعنى.
وصلت للحد الشهري.
```

Avoid:

```text
قم بتفعيل القوة الخارقة للذكاء الاصطناعي.
```

---

# 26. Implementation Tokens

## 26.1 Flutter Theme Mapping

Suggested mapping:

```text
ColorScheme.primary       = Memory Indigo
ColorScheme.secondary     = Recall Cyan
ColorScheme.tertiary      = Signal Violet
ColorScheme.surface       = surface.primary
ColorScheme.background    = background.primary
ColorScheme.error         = error.default
```

Use custom theme extensions for:

```text
AI surface
Memory surface
Success
Warning
Info
Borders
Text tertiary
Gradients
```

## 26.2 Web CSS Variables

```css
:root {
  --background-primary: #ffffff;
  --background-secondary: #f8fafc;
  --background-tertiary: #f1f5f9;

  --surface-primary: #ffffff;
  --surface-secondary: #f8fafc;
  --surface-memory: #eef2ff;
  --surface-ai: #ecfeff;
  --surface-violet: #f5f3ff;

  --text-primary: #0f172a;
  --text-secondary: #334155;
  --text-tertiary: #64748b;

  --primary: #4f46e5;
  --accent: #06b6d4;
  --ai: #8b5cf6;
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;

  --border-subtle: #e2e8f0;
  --border-default: #cbd5e1;
}

[data-theme="dark"] {
  --background-primary: #080b14;
  --background-secondary: #0f172a;
  --background-tertiary: #111827;

  --surface-primary: #0f172a;
  --surface-secondary: #111827;
  --surface-memory: #1e1b4b;
  --surface-ai: #0e3742;
  --surface-violet: #2e1065;

  --text-primary: #f8fafc;
  --text-secondary: #cbd5e1;
  --text-tertiary: #94a3b8;

  --primary: #818cf8;
  --accent: #22d3ee;
  --ai: #a78bfa;
  --success: #34d399;
  --warning: #fbbf24;
  --error: #f87171;

  --border-subtle: #1e293b;
  --border-default: #334155;
}
```

---

# 27. Design Acceptance Criteria

A design implementation is acceptable when:

```text
- The interface has a unique Linkrai identity.
- It does not use Code Clouders colors or visual style.
- Light and dark themes are fully supported.
- Saving a link is always easy.
- Search is visually central to the experience.
- Saved link cards are readable and scannable.
- AI summary, category, and tags are clearly visible.
- Processing states are clear.
- Partial/failed extraction is transparent.
- Subscription and usage states are understandable.
- Arabic/RTL support is considered from the start.
- Components use consistent spacing, radius, colors, and typography.
```

---

# 28. Do / Don't

## 28.1 Do

- Use Memory Indigo, Recall Cyan, and Signal Violet.
- Make search feel central.
- Keep cards clean.
- Use AI signals subtly.
- Show processing quality honestly.
- Design for Arabic and English.
- Keep the product calm and premium.

## 28.2 Don't

- Do not use Code Clouders navy/orange palette.
- Do not use mascot-based branding.
- Do not overuse gradients.
- Do not make every element glow.
- Do not hide failed analysis.
- Do not make the app look like a normal bookmark manager.
- Do not overcomplicate the MVP UI.

---

# 29. Suggested First Design Sprint

## Goal

Create the core Linkrai visual system and MVP mobile screens in both light and dark themes.

## Required Screens

```text
1. Onboarding
2. Login
3. Register
4. Library
5. Add Link
6. Shared Link Capture
7. Link Details
8. Search
9. Categories
10. Subscription / Usage
11. Settings
```

## Required Components

```text
Buttons
Inputs
Search bar
Saved link card
AI summary card
Category badge
Tag chip
Status badge
Usage progress
Empty states
Processing states
Error states
```

---

# 30. Prompt for UI Generation Tools

Use this prompt in Google Stitch, Figma AI, or similar tools:

```text
Design a unique modern mobile app UI for Linkrai, an AI-powered personal memory app for saved links.

The app lets users save any URL from social media, websites, articles, or videos. AI analyzes each saved link, generates a summary, auto-categorizes it, extracts tags, and allows users to search saved links later by meaning.

Create both light and dark themes.

Do not use Code Clouders colors, mascot, or corporate visual style. Linkrai needs its own independent identity.

Visual direction:
Calm AI memory space, modern productivity app, clean surfaces, soft rounded cards, connected memory threads, subtle AI search glow, semantic tags, minimal and premium.

Color direction:
Use a unique palette based on Memory Indigo, Recall Cyan, Signal Violet, Fresh Mint, Deep Ink, Cloud White, and Mist Background.

Required screens:
Onboarding, Login, Register, Library, Add Link, Shared Link Capture, Link Details, Search, Categories, Subscription/Usage, Settings.

Important UX:
Saving links must feel fast.
Search should feel central and intelligent.
Show AI summary, category, tags, source, and processing status clearly.
Support future Arabic/RTL layouts.
Avoid clutter and excessive AI glow.
```

---

# 31. Final Direction

Linkrai should visually feel like:

> A personal AI memory layer for everything the user saves online.

The product should look independent, memorable, and focused on one powerful promise:

> Save links now. Recall the right idea later.
