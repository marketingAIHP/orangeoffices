# Animation and interaction inventory

Audit date: 2026-08-24. Source inspected from the live public homepage HTML and its Elementor configuration; route inventory reviewed from the migrated repository and supplied WordPress export.

## Source implementation

| Technology | Observed use |
| --- | --- |
| Elementor 4.2.3 | Entrance effects expressed as `elementor-invisible` and `data-settings` animation values. |
| Animate.css styles shipped by Elementor | `fadeIn`, `fadeInUp`, `fadeInDown`, `fadeInLeft`, `fadeInRight`, `bounceIn`. |
| Elementor/Swiper 8.4.5 | Gallery, featured-project and testimonial carousels. |
| jQuery Numerator | Animated numerical counters. |
| Elementor nav menu | Desktop submenu and burger menu at tablet/mobile. |

Elementor's supplied animations run once when an invisible element enters view. Its stock animation stylesheet uses a one-second duration; explicit source delays found on the home page are 200ms and 400ms.

## Page/component mapping

| Page family | Source element | Observed behaviour | Trigger/configuration | Responsive behaviour | New owner |
| --- | --- | --- | --- | --- | --- |
| Shared | Primary navigation | Dropdown/burger navigation; submenu state is interactive | Hover/focus desktop, burger at tablet/mobile | Burger enabled at tablet/mobile | `BaseLayout.astro` |
| Shared | Header | No source motion setting was found in the source markup | N/A | N/A | `BaseLayout.astro` |
| Home | Hero heading | `fadeInUp` | Enter view, stock 1s | No source override found | `HomePage.astro` / reveal runtime |
| Home | Hero primary CTA | `fadeInLeft` | Enter view, stock 1s | No source override found | `HomePage.astro` / reveal runtime |
| Home | Hero secondary CTA | `fadeInRight`; hidden on mobile | Enter view, stock 1s | Hidden mobile in source | `HomePage.astro` / reveal runtime |
| Home | Promotional headings and CTAs | `fadeInUp` / `fadeInRight` | Enter view, stock 1s | No source override found | `HomePage.astro` / reveal runtime |
| Home | About split / counter | `fadeInLeft`, image `fadeInDown`, counter `fadeInLeft` | Enter view, stock 1s | No source override found | `HomePage.astro` / reveal runtime |
| Home | Client-logo section | Column `fadeInUp` | Enter view, stock 1s | No source override found | `HomePage.astro` / reveal runtime |
| Home | Sustainability section | `bounceIn` | Enter view, stock 1s | No source override found | `HomePage.astro` / reveal runtime |
| Home | Metric blocks | Four `fadeInLeft` columns | Enter view, stock 1s | No source stagger values supplied | `HomePage.astro` / reveal runtime |
| Home | Services/expertise/process headings | `fadeInUp`, image/columns `fadeInRight` or `fadeInLeft` | Enter view, stock 1s | No source override found | `HomePage.astro` / reveal runtime |
| Home | Featured projects | Nested carousel, `fadeInUp` | 3 desktop / 2 tablet / 1 mobile; infinite; 500ms; bullets; 10px gap; no autoplay setting | 3 / 2 / 1 | `HomePage.astro` / carousel runtime |
| Home | Testimonials | Testimonial carousel, `fadeIn` with 200ms delay | 3 desktop / 2 tablet; loop; 500ms; autoplay 5s; pause hover/interaction; bullets; 10px gap | Source has no explicit mobile value (use one slide to retain legibility) | `HomePage.astro` / carousel runtime |
| Home | Gallery | Nested carousel | 1 slide at all breakpoints; loop; autoplay 5s; 500ms; pause hover/interaction; bullets | 1 / 1 / 1 | Future gallery composition |
| Home | CTA heading | `fadeInDown` | Enter view, stock 1s | No source override found | `HomePage.astro` / reveal runtime |
| About, services, clients, collections, journal, contact, legal, project and article pages | Page-specific entrance animation attributes require capture per live route before an exact assignment | Not inferred from shared Elementor assets | Pending live route-by-route capture | Must be captured at desktop/tablet/mobile | Corresponding page components |

## Deliberate implementation rules

- No animation dependency is added: CSS keyframes, `IntersectionObserver`, and native pointer/keyboard events cover the observed behaviours.
- Hover elevation currently applied generically in the migration is not source evidence and should be removed/restricted in the subsequent per-component visual-parity pass.
- All added motion honours `prefers-reduced-motion`; carousels stop autoplay and reveal states are immediately visible.
- This document is an evidence log, not a claim that uninspected route-family animation settings have been migrated.
