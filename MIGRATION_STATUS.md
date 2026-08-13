# Migration status

- [x] Astro + Cloudflare Worker foundation created.
- [x] Live visual tokens extracted from Elementor kit and centralized in `src/styles/tokens.css`.
- [x] Shared accessible layout, core static routes, metadata, Organization/WebSite schema, robots and sitemap implemented.
- [x] D1 lead ledger migration and Queue producer boundary created; Turnstile, Zoho, Resend and queue consumer require credentials/resource IDs.
- [x] Core URLs discovered through the public navigation are represented in the route inventory.
- [x] Imported 111 published WordPress pages, articles and projects into the static content data source; all original routes, content dates and exported SEO fields are retained.
- [x] Indexed 380 WordPress attachment paths into `data/legacy-media-map.json` for the required R2 copy stage.
- [x] Copied the 380 exported legacy media objects locally under their original `/wp-content/uploads/**` paths, ready for an R2 upload.
- [x] Rebuilt the shared responsive UI system: visual page heroes, full-width container/grid scale, local Outfit typography, mobile navigation, premium contact layout, content prose, journal/project cards, and expanded footer.
- [x] Added image metadata to imported content and connected page and archive compositions to local migrated assets.
- [x] Rebuilt the homepage in the original source order with all major live modules: dual promotional panels, about, client logos, sustainability, metrics, four services, expertise, six-step process, four projects, testimonials, gallery and CTA. Removed the visible project placeholder copy.
- [x] Removed legacy inline SVG controls, duplicate imported H1 elements and unavailable WordPress derivative `srcset` paths; verified 225 rendered content-image sources and all imported internal links resolve locally.
- [x] Replaced the generic About rendering with a structured, image-led editorial page: hero, company story, mission/vision, core values, journey metrics, differentiators, and CTA.
- [x] Added an accessible client-logo grid to About, removed client logos from decorative backgrounds, and applied a shared structured content frame, service process, and closing CTA to all standard imported pages.
- [ ] Obtain owner-authorized WordPress export, signed URL inventory, media manifest, and approved page content/metadata to complete parity migration.
- [ ] Insert real Cloudflare D1 ID and bind R2/Queues after resource creation; never invent these values.
- [ ] Migrate original media to R2/Sanity and replace the temporary local hero asset during the media stage.
- [ ] Implement Zoho/Resend consumer and Turnstile validation once secret values and field map are supplied.

## Deliberate deviations / review items

- The blueprint refers to an approved palette but does not list its values. Tokens use the actual public Elementor global values extracted from the live home page.
- The blueprint's pre-build `wrangler.jsonc` `main` pointer is incompatible with the pinned current Cloudflare adapter because that worker file does not exist until after Astro builds. The adapter supplies the generated Worker entry at build/deploy time, so the source configuration leaves it out.
- The blueprint pins TypeScript 7.0.2, while the available Astro checker has a TypeScript 5 peer range. The build currently uses Astro's integrated compilation; add a compatible checker only after its TypeScript 7 support is confirmed, rather than forcing an invalid peer dependency.
- The workspace had no source application, WordPress export, image files, CMS access, Cloudflare resource IDs or CRM/email credentials. The build is therefore a foundation and core-route implementation, not a signed full-content parity release.

## Verified migration report — 2026-08-05

| Measure | Verified result |
| --- | ---: |
| Published WordPress records discovered | 111 |
| Published pages | 17 |
| Journal posts | 80 |
| Portfolio projects | 14 |
| Published record routes generated | 111 / 111 |
| Local files under WordPress uploads | 389 |
| Legacy attachment paths in media manifest | 380 |
| Homepage source modules implemented | 13 / 13 major modules |
| Production build | Passing |

Route/content coverage is 100% for the supplied WXR export. This is not a claim of 100% visual parity: exact screenshot comparison remains blocked because no interactive browser was available in this session. Cloudflare resource bindings, Turnstile, Zoho and Resend also remain deployment-owner tasks because their IDs, credentials and approved field mapping are not present in the repository.
