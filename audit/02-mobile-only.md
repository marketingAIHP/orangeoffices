# REPORT 2 — Mobile-Only Enhancements

Orange Offices · 9 September 2026

Primary inspection: 390px viewport, with targeted 320px and short-height checks. These findings concern stacking, touch, small-screen composition, and mobile navigation. Shared copy, typography roles, form validation, and navigation labels are owned by Report 1.

## M01 — Replace the fixed mobile headline size with a genuinely responsive scale

- **Priority:** High
- **Page / Section:** Home, Contact, Collections, other marketing heroes
- **Element:** Mobile H1 and hero geometry
- **Current Issue:** The small-screen rule forces marketing H1s to 58px below 620px; the measured home H1 is 58px even at 320px, compared with 46px at 768px. At 390px the home headline spans six lines, and Collections places a dash on its own line. This leaves a large title block competing with the photograph and actions.
- **Recommended Change:** Start with a fluid mobile display range around 36–44px, paired with the shared headline edit in S06. Size the hero to its content, with controlled vertical padding rather than relying on a large minimum height. Review at 320, 360, 390, and 430px, with enlarged text. Keep the offer and primary action visible together where the viewport allows; never truncate headings.
- **Why It Matters:** Narrow-screen line wrapping can turn a headline into the dominant scrolling task.
- **Expected UX / Design Impact:** A readable opening proposition, less awkward wrapping, and earlier access to actions. **Effort:** Low–medium.
- **Evidence:** [Home at 390px](screenshots/home-390-top.png), [Collections at 390px](screenshots/_collections_-390-top.png), [measured sizes](interactions.json).

## M02 — Put the enquiry form before supporting contact content

- **Priority:** High
- **Page / Section:** Contact
- **Element:** Single-column stacking order
- **Current Issue:** At 390px, the form starts about 2,023px below the top of the document. The visitor must pass the hero, another large heading, a substantial paragraph, contact tiles, social links, and a photograph before typing.
- **Recommended Change:** Use this mobile order: short consultation heading and reassurance; form; click-to-call alternative; office address and directions; optional supporting image. Place response expectations beside the form. Use a clear full-width submit control, and verify visibility with the virtual keyboard open.
- **Why It Matters:** Mobile visitors arriving through an enquiry CTA should not need several screenfuls of scrolling to find the requested action.
- **Expected UX / Design Impact:** A substantially shorter path to beginning and completing an enquiry. **Effort:** Medium.
- **Evidence:** [Contact opening view](screenshots/_contact_-390-top.png); form position in [page measurements](evidence.json). Desktop’s separate composition issue is D02.

## M03 — Make the full-screen menu work on short viewports

- **Priority:** High
- **Page / Section:** Global mobile header
- **Element:** Expanded navigation panel
- **Current Issue:** The panel is fixed below the 80px header and has `overflow: visible`, without an independently scrollable menu region. Its CTA occupies approximately y=505–549px in the 390×667 check. A shorter viewport can place the last actions below the visible panel. The script supports Escape and link-close, but does not manage background scrolling or focus containment while the screen-covering panel is open.
- **Recommended Change:** Give the panel a dynamic-viewport height and `overflow-y: auto`, with safe-area padding. Prevent background scrolling while open, keep keyboard navigation within the open panel, and return focus to the toggle on close. Retain sufficiently large existing link targets; use a toggle label that reflects open/closed state.
- **Why It Matters:** Landscape use, browser controls, and enlarged text reduce the available menu height.
- **Expected UX / Design Impact:** All destinations remain reachable and the open menu behaves as one coherent interaction. **Effort:** Medium.
- **Evidence:** [Menu at 390×667](screenshots/menu-390-short.png), [short-height menu](screenshots/menu-390-480.png). No recommendation to shrink targets to make the menu fit.

## M04 — Edit the vertical sequence instead of merely stacking desktop modules

- **Priority:** High
- **Page / Section:** Home
- **Element:** Services, process, testimonials, repeated promotional sections
- **Current Issue:** The rendered mobile homepage is approximately 12,446px long. Four services become tall single-column image panels; six process steps and four testimonials are also stacked. Multiple long promotional headings repeat before the final enquiry invitation.
- **Recommended Change:** Keep the initial mobile route compact: proposition → selected proof → two featured projects → concise service choices → process summary → enquiry. Use smaller image-and-text service rows, a compact numbered process, and two selected testimonials with a route to the full Clients page. Preserve access to all substantive content without forcing it into the homepage sequence.
- **Why It Matters:** The mobile penalty comes from cumulative vertical repetition, not from any one generous gap.
- **Expected UX / Design Impact:** Less scrolling fatigue and a clearer sequence toward evaluation and contact. **Effort:** Medium–high. Shared archive ordering is handled only in S03.

## M05 — Give project-gallery thumbnails enough room to communicate the work

- **Priority:** Medium
- **Page / Section:** Individual project → Completed Space Gallery
- **Element:** Thumbnail grid and photo-viewer guidance
- **Current Issue:** The project gallery retains three columns on a 390px viewport, producing thumbnails roughly 118px wide. Interiors and material details are difficult to inspect at that size. The lightbox’s guidance refers to keyboard arrows and Escape even though the controller already supports touch swipes.
- **Recommended Change:** Use two columns on phones, approximately 4:3 thumbnails, and one column only where very small widths or detailed plans require it. Keep a visible enlargement affordance. Show touch-appropriate guidance, while retaining next/previous buttons and existing swipe behavior. Size the viewer with dynamic viewport units and safe-area spacing.
- **Why It Matters:** Photography is central evidence for this business, not a decorative thumbnail collection.
- **Expected UX / Design Impact:** Better visual assessment and clearer touch interaction. **Effort:** Low–medium.
- **Evidence:** [Project gallery at 390px](screenshots/project-mobile-gallery.png). The dark tiles in this capture are not classified as broken assets; image-load timing needs separate verification.

## M06 — Keep a primary enquiry action available during long mobile browsing

- **Priority:** Medium
- **Page / Section:** Home, Services, Projects
- **Element:** Mobile header CTA visibility and persistent action access
- **Current Issue:** The desktop header’s enquiry button is hidden on mobile. After the hero, a visitor deep in a long page must find another inline CTA or reopen navigation to enquire.
- **Recommended Change:** Add a restrained bottom action bar on key browsing pages: “Book consultation” as primary and a verified call action as secondary. Reveal it after the opening CTA leaves view; hide it when the contact form, keyboard, menu, or photo viewer is active. Reserve document space so it never covers content, and account for device safe areas.
- **Why It Matters:** Mobile interest can arise anywhere in a long photographic page, far from the initial CTA.
- **Expected UX / Design Impact:** Less effort to act on interest. **Effort:** Medium. Treat this as an enhancement to test, not evidence that every page needs a fixed bar.

## M07 — Limit the initial mobile client-logo wall

- **Priority:** Medium
- **Page / Section:** Clients → Our client network
- **Element:** Two-column logo grid
- **Current Issue:** The client-network section alone measures approximately 5,317px high at 390px. Many repeated white logo tiles create a long, low-information scrolling sequence before the closing enquiry action.
- **Recommended Change:** Initially show 12–16 representative clients selected across relevant industries, then provide a clearly labeled “Show all clients” expansion. Preserve the complete list on demand, and keep the enquiry action outside the expandable region. Normalize visible logo size within each tile rather than merely giving every source file identical bounds.
- **Why It Matters:** On a phone, the proof value of another logo diminishes while the distance to the next useful action continues to grow.
- **Expected UX / Design Impact:** Retains credible breadth with much less compulsory scrolling. **Effort:** Low–medium.
- **Evidence:** [Mobile logo wall](screenshots/clients-mobile.png); section height in [detail measurements](details.json).

## Top 5 Priorities

1. **M02:** Move the contact form ahead of supporting content.
2. **M01:** Correct the fixed 58px headline behavior and hero wrapping.
3. **M03:** Make the mobile menu independently scrollable and manage focus/background scrolling.
4. **M04:** Reduce the cumulative length of stacked home modules.
5. **M05:** Increase the visual usefulness of project thumbnails.

Aim for comfortable 44–48px primary touch controls as a product choice. This is distinct from WCAG 2.2’s 24×24px minimum target criterion and its spacing/exceptions. [W3C target-size guidance](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).
