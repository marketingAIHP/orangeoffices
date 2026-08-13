# Orange Offices UI-parity audit

Status: baseline only — no UI-source changes are included in this audit.

## Source and scope

- Design source of truth: `https://orangeoffices.in/`
- Migrated routes: 17 pages, 80 journal posts, 14 portfolio pages
- Current implementation: Astro/Cloudflare, not Next.js or Tailwind. The requested visual-parity rules apply; no framework migration is required for the UI work.
- Evidence captured: live home, About, Services and Clients page structure; local WordPress export; current Astro templates and tokens.

## Original UI inventory

| Route family | Original composition | Current composition | Required parity work |
| --- | --- | --- | --- |
| Home | Header; image hero; two split promotional panels; About/metric block; client logos; sustainability feature; metrics; service cards; expertise; design process; project carousel; testimonials; gallery; CTA; newsletter footer | Hero; simplified about; metric row; generic service/project cards; CTA | Recreate each original section in the original order using the exported images, content and interaction pattern. |
| About | Hero; about split; mission/vision; values; journey metrics; differentiators; audience cards; why-us; client logos; team; CTA | Custom editorial interpretation with several original sections missing/reordered | Restore original section order, audience/why-us/team modules and their original layout; remove non-source visual changes. |
| Services | Hero; intro feature; service cards; CTA; process; benefit cards; CTA | Generic hero plus imported/raw content or generic three-step panel | Build the original service landing-page sequence and cards. |
| Clients | Hero; testimonials; extensive client-logo gallery; CTA | Generic imported-content frame | Create the original testimonial and logo-gallery composition, with contained logo assets. |
| Collections/projects | Project listing; individual visual case-study pages | Generic grid and raw imported body | Match listing/card rhythm and project case-study image/content layouts. |
| Journal/posts | Journal archive and article pages | Generic card archive and raw article frame | Match article archive card geometry and original reading layout without modifying content/SEO. |
| Gallery/contact/legal | Dedicated gallery, contact/form, and simple legal layouts | Generic shells, custom contact | Audit each at desktop/tablet/mobile and recreate original blocks, form and footer placement. |
| Shared chrome | Header/nav, mobile nav, CTA styles, footer with newsletter/social links | Simplified nav/footer, no newsletter/social UI | Rebuild once as reusable source-matching shared components. |

## Fix plan — required before UI edits

| Issue | Reason | Current | Original | Required fix | Priority | Files affected | Expected result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Home section order and modules differ | Previous work redesigned/simplified source pages | 5 broad custom sections | Full WordPress module sequence | Build source-order home modules from WXR assets/content | P0 | `src/pages/index.astro`, new components, `global.css` | Same information hierarchy and scroll sequence |
| Shared header/footer differ | Existing shared layout was simplified | Missing newsletter/social controls and original spacing | Original two-level nav behavior and expanded footer | Measure original chrome, rebuild reusable header/footer | P0 | `BaseLayout.astro`, components, CSS | Consistent parity on every route |
| About has missing source modules | Custom editorial version replaced source structure | Mission/vision/values only in a new order | Includes audience, why-us, client logo and team modules | Restore all source sections in source order | P0 | `AboutPage.astro`, CSS | Same About-page story and visual rhythm |
| Services and Clients are generic | Imported HTML has no Elementor layout reconstruction | Raw prose/content rail | Dedicated source landing pages | Create source-matched page compositions | P0 | route template, new page components, CSS | No raw WordPress layout appearance |
| Image sizing/positioning is inconsistent | Generic selectors impose shared image constraints | Arbitrary max-heights/aspect ratios | Per-section source image frames | Replace with per-source-component image ratios/positions | P0 | `global.css`, page components | Image/text balance matches original |
| Typography and spacing are unmeasured | Current CSS uses a new “premium marketing” system | Approximate clamps/spacing | Elementor source scale and container rhythm | Extract source CSS values, codify tokens, apply per breakpoint | P0 | `tokens.css`, `global.css` | Measurable typography/spacing parity |
| Cards, buttons and overlays are simplified | Shared generic cards superseded original patterns | Uniform cards and buttons | Multiple distinct Elementor card/CTA variants | Implement reusable source variants instead of generic cards | P1 | components, CSS | Original card hierarchy and hover behavior |
| Archive and detail-page layouts are generic | WXR carries content, not layout | One raw prose frame | Distinct blog/project templates | Build article and project templates from original layouts | P1 | `[...slug].astro`, new components, CSS | Correct archive/detail presentation |
| Responsive behavior is unverified | No viewport-by-viewport visual comparison exists | Only broad 760px/1024px rules | Source-specific desktop/tablet/mobile behavior | Capture and compare at 320, 375, 390, 414, 768, 820, 1024, 1280, 1440 and 1920 | P0 | all styling/components | No broken or divergent responsive layout |

## Execution checklist

- [ ] Capture original desktop/tablet/mobile references for every page family.
- [ ] Extract source values for typography, palette, container widths, spacing, cards, buttons and motion.
- [ ] Establish a reusable source-matching component set without altering routes, metadata, schema or content.
- [ ] Rebuild shared chrome, then Home, About, Services, Clients, Collections/projects, Journal/posts, Gallery, Contact and legal pages.
- [ ] Validate every route and required viewport with side-by-side evidence.
- [ ] Report measured visual/layout/typography/spacing/color/responsive parity only after comparison evidence exists.

## Baseline metrics

No similarity percentage is asserted at baseline. An honest 90–99% score requires page screenshots at matching viewports; it cannot be derived from HTML text or build success alone.
