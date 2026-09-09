# REPORT 1 — Shared Mobile + Desktop Enhancements

Orange Offices · 9 September 2026 · Local development website

Read [scope and evidence](README.md) for test coverage and limitations. These findings apply across devices; viewport-specific implementations are isolated in Reports 2 and 3. Priorities reflect task completion, lead generation, reach across the site, and implementation effort. Expected impacts are design judgments, not measured conversion lifts.

## S01 — Recover from enquiry errors inside the form

- **Priority:** Critical
- **Page / Section:** Contact → enquiry submission
- **Component / Element:** `ContactForm.astro`; `/api/leads/`
- **Current Issue:** Entering a one-character name and a five-character message passes the HTML constraints but navigates to a plain page saying “Please check the form fields and try again.” The server requires at least two and ten characters respectively. The visitor gets neither field identification nor an editable form. The service-unavailable response similarly provides plain text with no clickable telephone number.
- **Recommended Change:** Align client and server constraints. Return errors within the branded form, preserve values, identify each invalid field, and move focus to an error summary linked to the fields. Provide a submitting state and a recoverable failure state with a working call link. Keep a server-rendered fallback for visitors without JavaScript.
- **Why It Matters:** This failure occurs at the point of highest intent, after the visitor has invested effort.
- **Expected UX / Design Impact:** More recoverable submissions, less uncertainty, and a credible enquiry experience. **Effort:** Medium.
- **Evidence:** [Reproduced error screen](screenshots/form-invalid.png); [interaction results](interactions.json). Only intentionally invalid input was submitted; successful delivery was not tested.

## S02 — Make business claims and contact details consistent

- **Priority:** High
- **Page / Section:** Home promos and process; Services benefits; Contact; footer
- **Component / Element:** Delivery promises, proof metrics, phone numbers, testimonials
- **Current Issue:** The home promo promises delivery in 30 days; the process promises 45 days after design approval; Services says 45 days without that qualification. Contact displays `+91 7859 999 009`, while the footer displays `+91 78610 04918`; both also list a second number. Testimonials describe AIHP, including managed services, while the principal offer is Orange Offices interior design.
- **Recommended Change:** Establish one approved delivery statement with scope and start conditions, used consistently. Verify the numbers and identify different departments if both are intentional. Explain the Orange Offices–AIHP relationship near the first proof section, and label whether figures such as 600+ clients and 40L+ sq. ft. describe the group or this service. Link selected testimonials to relevant project work.
- **Why It Matters:** Buyers evaluating a substantial workplace investment scrutinize specificity and consistency.
- **Expected UX / Design Impact:** Less doubt about the provider, the service being endorsed, and the delivery commitment. **Effort:** Low–medium; requires business verification.

## S03 — Organize navigation and landing pages around visitor tasks

- **Priority:** High
- **Page / Section:** Primary navigation; Collections; Journal
- **Component / Element:** Navigation labels and opening content sequence
- **Current Issue:** Navigation calls the portfolio “Collections,” the footer calls it “Projects,” and project breadcrumbs also say “Projects.” The portfolio heading starts around 1,656px down on desktop and 1,936px on mobile. Journal repeats its design-principles heading and presents six philosophy sections before “Latest from the journal,” at approximately 5,144px and 6,078px respectively.
- **Recommended Change:** Use “Projects” consistently. Put the project grid immediately after a short portfolio introduction. Make Journal an article-first hub with topic navigation; move the long principles presentation into a separate philosophy article or About subsection. Keep Services, Projects, and the enquiry action easy to identify in the primary navigation.
- **Why It Matters:** Visitors should reach work samples and articles without first reading a brand essay.
- **Expected UX / Design Impact:** Faster discovery and a shorter path from interest to evidence. **Effort:** Medium.
- **Evidence:** Heading positions in [page measurements](evidence.json).

## S04 — Turn the gallery destination into an actual visual browsing experience

- **Priority:** High
- **Page / Section:** `/gallery/`, reached from Home
- **Component / Element:** Gallery body and repeated CTAs
- **Current Issue:** The rendered gallery is dominated by introductory copy, a checklist of what the portfolio contains, and successive contact invitations. It does not present the promised browsable image grid. A page called Gallery should deliver visual work immediately.
- **Recommended Change:** Reuse verified project photography in a dedicated gallery grid, with project names, space-type captions, enlargement, and links to case studies. Put a short introduction above the images and one enquiry invitation below. Until that exists, direct the home gallery link to the functioning project collection.
- **Why It Matters:** A visual-design business loses credibility when a gallery destination contains descriptions of photographs instead of a usable gallery.
- **Expected UX / Design Impact:** Fulfills the link’s promise and gives visitors another route into project evidence. **Effort:** Medium; temporary link correction is low effort.

## S05 — Make project cards useful for commercial evaluation

- **Priority:** High
- **Page / Section:** Collections and featured projects
- **Component / Element:** Project cards
- **Current Issue:** Collection cards largely offer a photograph and uppercase client name. Industry fit, location, scale, scope, and outcome require opening individual projects. The case-study template already supports structured metadata, but the overview cards do not use it.
- **Recommended Change:** Show client name, location, verified area or capacity, service scope, and one concise design outcome. Use the same field order across cards. Introduce a small industry or scope filter only where enough projects have reliable data. Do not invent missing quantities or project outcomes.
- **Why It Matters:** B2B buyers need to identify comparable work, not simply attractive rooms.
- **Expected UX / Design Impact:** More purposeful project exploration and better-qualified enquiries. **Effort:** Medium–high because metadata needs editorial verification.
- **Evidence:** [Desktop project grid](screenshots/collections-desktop-grid.png).

## S06 — Rewrite marketing copy around a clear offer and concrete benefits

- **Priority:** High
- **Page / Section:** Home, Contact, Collections, Services, service detail
- **Component / Element:** Headlines, introductory paragraphs, service cards
- **Current Issue:** Phrases such as “Best Office Interior Design in Gurgaon” and “Office Interior Projects India” dominate visible headings. Contact repeats the consultation/location phrase in consecutive passages. Service overview cards contain titles and imagery but little decision-making information; the data already contains short service descriptions that are not rendered there.
- **Recommended Change:** Use a short offer such as “Workplaces designed around your business,” followed by a factual line explaining design, fit-out, renovation, and the verified service geography. Give each service a “best for” sentence, key deliverables, and one relevant project. Explain what a free consultation includes beside the enquiry action. Keep location keywords in natural supporting copy and metadata.
- **Why It Matters:** Visitors need to understand what they can buy, who it suits, and what happens next.
- **Expected UX / Design Impact:** Better scanning, clearer differentiation, and a more confident brand voice. **Effort:** Medium.

## S07 — Rebuild the typography hierarchy around legibility

- **Priority:** High
- **Page / Section:** Site-wide marketing pages
- **Component / Element:** Display headings, small labels, card titles
- **Current Issue:** Major headings use line-height `.89` and tracking `-.065em`, while a late global rule forces every heading to Playfair Display at weight 600. The result is tightly packed serif lines across very different contexts. Small metadata is set to 11px, and the scale jumps sharply between display headings and supporting content.
- **Recommended Change:** Keep the serif as a deliberate brand asset for principal editorial headings, with approximately 1.05–1.15 line-height and restrained negative tracking. Use a readable sans-serif for dense UI headings and metadata. Define semantic display, section, card, body, and caption styles; remove the blanket `!important` heading override. Prefer 13–14px for meaningful metadata and 16–18px body copy.
- **Why It Matters:** The current density makes substantial text feel compressed instead of composed.
- **Expected UX / Design Impact:** Clearer hierarchy and a calmer, more premium typographic character. **Effort:** Medium. Mobile headline sizing is addressed separately in M01.

## S08 — Correct contrast across interactive states and image overlays

- **Priority:** High
- **Page / Section:** Buttons, home hero, small accent links
- **Component / Element:** Orange fills, button hover/focus labels, hero eyebrow
- **Current Issue:** Shared primary-button rules change the label to white while retaining the orange `#FF9000` fill on hover/focus. White against this orange is approximately 2.27:1. The home hero’s small gray-green eyebrow is also difficult to distinguish over the photograph.
- **Recommended Change:** Keep dark labels on orange through hover and focus, or use a substantially darker background for white labels. Give image-overlay text its own inverse-color treatment and a controlled scrim behind the text region. Audit the rendered default, hover, focus, and error states as a component set.
- **Why It Matters:** A control should remain legible when someone interacts with it. Normal text generally needs 4.5:1 contrast; large text needs 3:1. [W3C contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
- **Expected UX / Design Impact:** More readable actions and better accessibility without changing the core brand palette. **Effort:** Low.

## S09 — Preserve intent from the CTA through confirmation

- **Priority:** High
- **Page / Section:** Header, service/project CTAs, Contact, Thank-you
- **Component / Element:** Action wording, enquiry context, confirmation template
- **Current Issue:** “Get started,” “Get in Touch,” “Start a conversation,” and other labels lead to the same generic form. No selected project or service context is carried through. The thank-you page adds Discover/Design/Deliver marketing cards and another contact CTA after saying the enquiry was received.
- **Recommended Change:** Use one primary action, such as “Book a free consultation,” once the offer is verified. Carry the originating project/service into a visible, editable enquiry context. Record the actual originating page rather than only the endpoint path. Give confirmation a distinct template: success message, verified response window, next steps, and one optional link to relevant projects.
- **Why It Matters:** A coherent flow reassures visitors that the team understands their request and that submission is complete.
- **Expected UX / Design Impact:** Less repetition, better handover context, and fewer unnecessary repeat enquiries. **Effort:** Medium.

## S10 — Replace expertise meters with substantiated design proof

- **Priority:** Medium
- **Page / Section:** Home → Our Expertise
- **Component / Element:** Interior Design, Architecture, 3D Design, Interior Knowledge bars
- **Current Issue:** Decorative bar lengths imply measured capability: the CSS assigns 93%, 81%, 88%, and 76%, with no scale or supporting explanation. “Interior Knowledge” also reads like a generic template category.
- **Recommended Change:** Replace the meters with three concise capability stories: the buyer’s problem, the team’s intervention, and a real example. Use a plan, material detail, or completed room image as evidence. Link each to relevant work.
- **Why It Matters:** Arbitrary skill percentages are unconvincing for a professional design practice.
- **Expected UX / Design Impact:** Stronger differentiation and a more credible account of expertise. **Effort:** Medium.

## S11 — Make motion purposeful and controls truthful

- **Priority:** Medium
- **Page / Section:** Home and shared reveal animations; Journal principles
- **Component / Element:** Scroll reveals and orbit buttons
- **Current Issue:** Numerous elements enter from 100% translations over one second, with a bounce effect on the sustainability section. Journal’s six named principle buttons all trigger the same ring animation and set all buttons to pressed; they do not take the visitor to the selected principle.
- **Recommended Change:** Reduce reveals to a small 12–24px movement over roughly 200–350ms, and keep functional content visible by default. Make each principle control link to its corresponding section, or present the orbit as a noninteractive illustration. Preserve the existing reduced-motion support.
- **Why It Matters:** Motion should reinforce reading order or provide feedback; labels should predict the actual result of activation.
- **Expected UX / Design Impact:** Less visual distraction and fewer misleading interactions. **Effort:** Low–medium. Motion amplitude is source-confirmed; reduced motion was used for reproducible screenshot capture.

## S12 — Give photography and brand proof an editorial system

- **Priority:** Medium
- **Page / Section:** Home, project cards, client logos, Clients video
- **Component / Element:** Image selection, captions, alternative text, embedded testimonial
- **Current Issue:** Several image descriptions repeat marketing keywords or generic “Orange Offices client.” Project photographs are seldom captioned on overview pages. The Clients testimonial iframe requests muted autoplay, placing a third-party player into the composition before the visitor chooses to watch.
- **Recommended Change:** Identify client logos by actual client name. Describe meaningful photographs by space and design feature; use empty alternative text for genuinely decorative images. Add concise project attribution to selected photography. Replace the autoplay embed with an approved poster, speaker identity, explicit play action, and captions/transcript support. Provide appropriately sized responsive image variants.
- **Why It Matters:** The work should tell a recognizable, attributable story and remain understandable without relying exclusively on imagery or video.
- **Expected UX / Design Impact:** Better accessibility, stronger proof, and more intentional media presentation. **Effort:** Medium.

## S13 — Consolidate the visual component system before further polish

- **Priority:** Medium
- **Page / Section:** Site-wide; particularly project details versus marketing pages
- **Component / Element:** Buttons, corners, borders, shadows, icons, spacing tokens
- **Current Issue:** The stylesheet contains successive design systems and late corrective overrides. Buttons, rounded project links, cards, promotional panels, and project-detail components use different treatments; contact/service icons mix text glyphs with SVG elsewhere. The shared heading override illustrates how a global patch can erase deliberate local hierarchy.
- **Recommended Change:** Establish a small component specification: primary/secondary/text actions; two card surfaces; a restrained radius scale; one icon family; and spacing increments such as 8/16/24/32/48/64/96px. Consolidate styles by component and breakpoint, retaining deliberate editorial variants instead of stacking overrides.
- **Why It Matters:** Consistency is both a visible quality signal and a prerequisite for reliable responsive fixes.
- **Expected UX / Design Impact:** More coherent brand expression and less regression during implementation. **Effort:** Medium–high. Do this alongside S07 and S08, not as a prerequisite that delays S01.

## Top 5 Priorities

1. **S01:** Repair form validation and error recovery.
2. **S03:** Put projects and articles at the front of their respective journeys.
3. **S02:** Verify delivery promises, contact details, and the scope of proof claims.
4. **S08:** Fix button-state contrast and image-overlay labels.
5. **S05:** Add decision-making information to project cards.

The gallery correction in S04 is also a pre-launch requirement; it can begin with the low-effort link correction while the richer gallery is built.
