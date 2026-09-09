# Orange Offices UI/UX Audit

Audited **9 September 2026** against the running local development site at `http://localhost:4321/` in `C:\orangeoffices`.

## Reports

1. [Shared Mobile + Desktop Enhancements](01-shared-mobile-desktop.md) — 13 findings
2. [Mobile-Only Enhancements](02-mobile-only.md) — 7 findings
3. [Desktop-Only Enhancements](03-desktop-only.md) — 6 findings
4. [Cross-Report Summary](04-cross-report-summary.md) — top 10, quick wins, larger improvements, and launch concerns

Each finding includes priority, location, current issue, recommended change, rationale, expected impact, and relative effort. Findings are assigned to one report. Related device-specific implementations refer to shared work without repeating it as a new shared issue.

## Scope and method

The in-app browser connection was unavailable. A separate local headless Chrome session was used for rendered inspection and interactions. No website source, package manifest, or deployment was changed. Audit artifacts are contained in this directory; temporary browser tooling was installed outside the repository.

| Coverage | Pages / conditions |
| --- | --- |
| Main page captures at 390×900 and 1440×900 | Home, About, Services, Collections, Contact, Journal, Anand Rathi Wealth project, Bespoke Office Interior Design, Gallery, Privacy, Terms, Thank-you |
| Additional rendered checks | Clients on mobile and desktop; the office-space-planning article on mobile and desktop |
| Width checks | Home/header at 320, 768, 1024, and 1920px, each 900px high |
| Short mobile navigation | 390×667 and 390×480 |
| Interaction checks | Mobile menu open and Escape close; intentionally invalid contact submission; primary button hover; project lightbox opening, keyboard next, and Escape close |
| Source inspection | Shared layout, design tokens and CSS cascade, navigation data, marketing components, route composition, form/server validation, project lightbox, article TOC, and reveal/orbit behavior |

This is a representative-template audit, not an exhaustive inspection of every article, all 14 projects, or every service-detail URL. It is not a production performance benchmark, complete accessibility certification, real-device Safari test, or conversion experiment. There was no valid lead submission, telephone call, email, deployment, or external communication.

Reduced motion was enabled for repeatable page captures; motion recommendations are based on inspected animation code. Fonts were awaited and pages were scrolled to trigger lazy loading, but some sectional screenshots still caught lazy media loading. The Clients video was not verified playing; its black capture is not classified as proof of a permanently broken player. Third-party map/video reliability and throttled-network performance remain unverified.

Full-page screenshots contain the local Astro development toolbar in some views. It is not a production design finding. Automatic overflow measurements include offscreen descendants of the closed mobile menu, which were excluded from findings. The project’s empty lightbox image placeholder appears in the raw image check and was not classified as a visible broken image.

## Evidence

- [Page measurements and extracted visible text](evidence.json)
- [Interaction and header checks](interactions.json)
- [Section measurements, short-menu and lightbox checks](details.json)
- [Screenshots](screenshots/)

Measured vertical positions are approximate document coordinates in the stated local viewports. They demonstrate ordering and distance; they are not universal fold positions. Recommendations about hierarchy, visual sophistication, and expected conversion effects are professional judgments derived from the observed design, not findings from user interviews or analytics.

## Implementation entry points

| Area | Main files |
| --- | --- |
| Shared header/footer and navigation | `src/layouts/BaseLayout.astro`, `src/lib/site.ts` |
| Typography, components, breakpoints | `src/styles/tokens.css`, `src/styles/global.css` |
| Contact flow | `src/components/ContactPage.astro`, `src/components/ContactForm.astro`, `src/pages/api/leads.ts` |
| Home storytelling | `src/components/HomePage.astro` |
| Project discovery and presentation | `src/components/CollectionsPage.astro`, `src/components/ProjectPage.astro` |
| Journal and shared page composition | `src/components/JournalPage.astro`, `src/pages/[...slug].astro` |
| Motion and principle controls | `src/components/AnimationRuntime.astro` |
| Client proof | `src/components/ClientsPage.astro` |

## Accessibility references

Contrast recommendations refer to [W3C WCAG 2.2 contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html). Target-size recommendations distinguish comfortable 44–48px product targets from [WCAG 2.2’s minimum criterion and exceptions](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).
