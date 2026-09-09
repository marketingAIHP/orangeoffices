# REPORT 3 — Desktop-Only Enhancements

Orange Offices · 9 September 2026

Primary inspection: 1440×900. Targeted home/header checks at 768, 1024, and 1920px. The 768px observation concerns the site's active desktop navigation treatment, which remains enabled above 760px.

## D01 — Switch away from desktop navigation before it becomes compressed

- **Priority:** High
- **Page / Section:** Global header at compact desktop widths
- **Element:** Horizontal navigation, logo allocation, enquiry button
- **Current Issue:** At 768px, all seven links, a 210px logo allocation, and the enquiry button remain in one horizontal row. The button wraps “Get started” onto two lines and reaches approximately x=764px, beyond the intended container’s right edge of roughly 749px. At 1024px the same content fits cleanly.
- **Recommended Change:** Move to the compact menu at a content-driven breakpoint around 900–960px, verified with real labels and text zoom. Keep the desktop CTA label on one line and preserve the intended right gutter. Do not solve this by reducing the already small navigation type.
- **Why It Matters:** A navigation system should change mode before its key action becomes visually squeezed.
- **Expected UX / Design Impact:** More stable header composition on narrow desktop windows and at zoomed layouts. **Effort:** Low.
- **Evidence:** [768px header](screenshots/home-768-top.png), [1024px comparison](screenshots/home-1024-top.png), [geometry](interactions.json).

## D02 — Use the Contact page’s horizontal space for the actual enquiry

- **Priority:** High
- **Page / Section:** Contact → main two-column section
- **Element:** Form panel, decorative image, left introduction
- **Current Issue:** The right-hand form column begins with a 340px photograph, then a large “Get in Touch” heading; the form starts about 1,298px below the document top at 1440px. The left column contains another large display heading and substantial introductory text. A desktop user sees a marketing composition before a usable contact interface.
- **Recommended Change:** Begin the two-column enquiry layout much higher: concise offer and contact reassurance on the left; form aligned to the top on the right. Move the photograph below the form or use a small supporting detail within the left column. Make form headings subordinate to the page title and let the form occupy the strongest visual position.
- **Why It Matters:** Desktop width permits reassurance and data entry to appear together; the current image-first column spends that advantage on repetition.
- **Expected UX / Design Impact:** Earlier form visibility and a clearer task-focused layout. **Effort:** Medium.
- **Evidence:** [Desktop contact composition](screenshots/contact-desktop-form.png). Mobile stacking is a separate change in M02.

## D03 — Reclaim the oversized sticky portfolio introduction column

- **Priority:** Medium
- **Page / Section:** Collections → project grid
- **Element:** Persistent left rail and two-column cards
- **Current Issue:** The project area reserves a substantial left column for a static heading and a short paragraph while the project grid continues for many rows. The screenshot shows a large unused region below the introduction; the available width cannot help visitors compare more projects.
- **Recommended Change:** Place the introduction above the gallery and use a three-column project grid at wide desktop widths, preserving a sensible minimum card width. If filtering is introduced under S05, put a compact filter row above the cards; use a side rail only if it contains a genuinely useful set of controls.
- **Why It Matters:** On large screens, whitespace should clarify relationships rather than reserve a permanent column for a few lines of copy.
- **Expected UX / Design Impact:** Better portfolio overview and less vertical travel between comparable projects. **Effort:** Medium. Card information itself is addressed only in S05.
- **Evidence:** [Sticky portfolio rail](screenshots/collections-desktop-grid.png).

## D04 — Compose the desktop hero around a deliberate photographic focal point

- **Priority:** Medium
- **Page / Section:** Home opening view
- **Element:** Full-width hero image, title region, vertical positioning
- **Current Issue:** At 1440×900 the hero runs almost to the bottom of the first viewport. A large upper image area precedes a title spread across the photograph’s furniture and architectural detail. The room reads as a background layer supporting text, rather than a carefully presented piece of project work.
- **Recommended Change:** After the shared copy edit, use a defined text region around 560–680px wide and position the image’s focal point in the remaining space. Reduce excessive top clearance and tune the hero height against common 768–900px desktop heights. Use a localized gradient behind the copy so the rest of the photograph retains depth and color. Add a discreet project attribution linking to the actual case study where verified.
- **Why It Matters:** This is the strongest opportunity to demonstrate design judgment before the visitor reads detailed copy.
- **Expected UX / Design Impact:** More intentional art direction, clearer brand promise, and earlier awareness of content below. **Effort:** Medium. This is an aesthetic recommendation, not a claim that a full-height hero is inherently unusable.
- **Evidence:** [1440px home hero](screenshots/home-1440-top.png).

## D05 — Give the article sidebar a supporting proportion

- **Priority:** Medium
- **Page / Section:** Journal article body
- **Element:** Reading column and table-of-contents rail
- **Current Issue:** In the sampled office-space-planning article, the desktop table-of-contents panel is roughly 460px wide against a main reading region around 740px. Long heading labels fill a large parallel block at the start of the article, competing with its summary and opening argument.
- **Recommended Change:** Keep the main text at a comfortable reading measure and reduce the rail to roughly 260–320px. Use concise but accurate navigation labels, deliberate nesting, an active-section indicator, and a bounded scroll area when the list exceeds the available height. Place the enquiry prompt below the navigation, with enough separation to distinguish reading assistance from promotion.
- **Why It Matters:** A desktop article can offer useful parallel navigation without giving it nearly equal visual importance to the content.
- **Expected UX / Design Impact:** Better reading focus while retaining quick section access. **Effort:** Medium.
- **Evidence:** [Sample article at 1440px](screenshots/article-1440-top.png). Verify the same proportions on additional articles before rolling out universally.

## D06 — Replace the oversized desktop orbit with a useful principles composition

- **Priority:** Low
- **Page / Section:** Journal → principles feature
- **Element:** Circular illustration and adjacent copy
- **Current Issue:** The desktop feature dedicates a large two-column section to a circular photograph surrounded by named chips, with a heading and paragraph alongside it. This presentation consumes substantial vertical space before repeating the same heading in the detailed principles section.
- **Recommended Change:** When relocating this material under S03, use a compact three-by-two principles layout or a single editorial image paired with three concise principles and a link to the full story. Keep the visual geometry subordinate to reading and project evidence. The interaction correction belongs to S11.
- **Why It Matters:** The large desktop composition gives a decorative concept more prominence than its information value supports.
- **Expected UX / Design Impact:** A more restrained, editorial presentation with better use of horizontal space. **Effort:** Medium; implement with the Journal restructuring.

## Top 5 Priorities

1. **D02:** Put the form at the top of the desktop enquiry composition.
2. **D01:** Correct the crowded header before its current breakpoint.
3. **D03:** Reclaim the portfolio’s mostly empty sticky rail.
4. **D04:** Refine hero focal point, title width, and vertical balance.
5. **D05:** Make article navigation visually subordinate to the reading column.
