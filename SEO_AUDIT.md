# Technical SEO Audit

## Confirmed in the repository

- Canonical URLs are generated in the shared layout.
- `/thank-you/` is intentionally `noindex,follow`.
- `robots.txt` allows crawling and points to `https://orangeoffices.in/sitemap_index.xml`.
- Dynamic sitemap generation excludes `/home/`, `/test/`, `/thank-you/`, and `/collections/`.
- Legacy sitemap routes are redirected to the current sitemap route.
- Page, article, and organisation structured data is emitted from the shared layout.
- Article and project templates display breadcrumb navigation.
- `BreadcrumbList` JSON-LD is now emitted by the shared layout for all non-home canonical routes.

## Required next checks

- Validate every generated canonical and sitemap URL against a deployed environment.
- Use Search Console coverage and performance exports to investigate unindexed URLs; the claimed `76/189` figure cannot be validated locally.
- Audit migrated HTML for broken internal links with a deployed crawler.
- Review imported WordPress metadata for duplicate titles/descriptions before changing copy.

## Implemented internal linking

- Journal article conversion cards now link to Services and Projects as well as consultation.
- Services and Projects landing pages include direct consultation and click-to-call CTAs.
- The new checklist landing page has a stable descriptive URL and is automatically included in the existing sitemap through the central page registry.

## Phase 2 page-optimisation status

Top-20 page selection remains blocked pending a Google Search Console export containing URL, impressions, clicks, CTR, and average position. No speculative title or metadata rewrites were made.

The detailed selection and page-review template is in `SEO_OPTIMIZATION_FRAMEWORK.md`.

## Micro-market landing pages

Four unique micro-market pages are live in the source with distinct titles, descriptions, headings and content. They link to relevant services, portfolio, journal and consultation paths. They do not claim a portfolio project was completed in a specific micro-market without evidence.

## Non-destructive policy

No thin, duplicate, category, tag, or archive URL will be deleted or noindexed without Search Console evidence and an approved redirect/content decision.

