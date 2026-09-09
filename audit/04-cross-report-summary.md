# Cross-Report Summary

The site’s largest weaknesses are the distance between intent and action, inconsistent business messaging, and a visual system that gives too many sections the same large editorial emphasis. The first investment should be in enquiry reliability and information order; visual refinement should make that clearer journey feel distinctive.

## The 10 highest-impact changes

| Rank | Change | Report references | Reason to prioritize | Relative effort |
| --- | --- | --- | --- | --- |
| 1 | Keep enquiry errors inside an editable form, with aligned validation | S01 | A reproduced failure interrupts the highest-intent action | Medium |
| 2 | Bring the contact form forward on both devices, using the appropriate layout for each | M02, D02 | Form begins around 2,023px down on mobile and 1,298px on desktop | Medium |
| 3 | Make Projects and Journal deliver work samples and articles immediately | S03 | Removes thousands of pixels of preliminary content from core discovery journeys | Medium |
| 4 | Correct short-height menu access and the compressed desktop header breakpoint | M03, D01 | Navigation and the enquiry action must remain reachable across viewport changes | Low–medium |
| 5 | Verify delivery promises, phone numbers, and attribution of AIHP proof | S02 | Conflicting commercial details undermine trust throughout the funnel | Low–medium |
| 6 | Correct CTA-state contrast and hero-label readability | S08 | A small shared change improves a frequently used component | Low |
| 7 | Give the gallery a real image-browsing destination | S04 | The current destination fails the explicit promise of its incoming link | Low interim / medium full solution |
| 8 | Give project cards enough facts to identify comparable work | S05 | Helps B2B buyers judge relevance before committing to deeper reading | Medium–high |
| 9 | Rework heading hierarchy and the oversized mobile H1 rule | S07, M01 | Fixes repeated readability and composition problems | Medium |
| 10 | Replace repetitive keyword-heavy marketing copy with a specific offer and service distinctions | S06 | Improves comprehension and the quality of the sales conversation | Medium |

## Quick wins

- **S08:** Keep dark labels on orange buttons in hover/focus; correct the home eyebrow color.
- **D01:** Move the desktop-to-compact-header switch earlier and prevent the CTA wrapping.
- **M03:** Add a bounded, independently scrollable menu region as the first part of the full menu repair.
- **S02:** Reconcile published numbers and delivery wording after the business owner verifies them.
- **S03:** Rename Collections to Projects consistently and move existing project/article sections upward.
- **S04:** Temporarily point “Explore gallery” to the working collection while the gallery is rebuilt.
- **M01:** Remove the fixed 58px mobile override and check four narrow widths.
- **S09:** Remove generic sales sections from the confirmation page.
- **M05:** Change the phone project gallery from three columns to two.
- **M07:** Limit the initially expanded logo wall while preserving access to the full client list.

“Quick” describes implementation scope, not permission to skip validation. Shared CSS changes should be checked against Home, Contact, Projects, service detail, and an article before acceptance.

## Larger design and UX improvements

1. **Build a coherent consultation journey.** Combine S01 and S09 with the separate mobile and desktop Contact layouts. Specify the offer, editable context, validation, submitting, recovery, confirmation, and sales handover. Test successful receipt in an approved test environment.
2. **Create a project-led content structure.** Enrich the 14-item collection with verified metadata and concise outcomes, restore the gallery, and use relevant projects beside service explanations. Avoid unsupported statistics, certifications, or outcomes.
3. **Consolidate the design system.** Implement typography roles, spacing, button states, surfaces, and icons in one controlled system. Remove obsolete overrides rather than adding another visual patch layer.
4. **Re-edit mobile pages.** Reorganize the homepage, shorten stacked modules, curate initial client proof, and improve photographic inspection. A responsive site needs a deliberate mobile sequence, not only fewer columns.
5. **Develop more distinctive editorial art direction.** Use real-project photography with intentional focal points, factual captions, concise capability stories, and restrained motion. Refine desktop hero and article-sidebar proportions.

## Systemic issues to address before launch

| Systemic issue | Required outcome before launch | Verification |
| --- | --- | --- |
| Form UI and server rules diverge | Invalid input is identified and recoverable without losing the form | Exercise client and server rejection, keyboard focus, repeat clicks, and service-unavailable recovery |
| Success and failure delivery states are not fully verified | A test enquiry is stored, handed off, and acknowledged accurately | Use an approved test submission; this audit intentionally did not send a valid lead |
| Different sections publish conflicting commercial information | One approved set of delivery conditions, contact numbers, and proof attribution | Review Home, Services, Contact, footer, and project endorsements together |
| Some destinations do not prioritize their promised content | Projects show projects; Journal shows articles; Gallery shows photographs | Follow the actual header and homepage links through to usable content |
| Shared CSS overrides destabilize hierarchy | Type, control states, and spacing have predictable component-level rules | Compare representative templates at mobile, compact desktop, wide desktop, and text zoom |
| Mobile menu height is not robust | Every navigation link and CTA can be reached at short heights | Test scrolling, focus order, Escape, background scroll, and safe areas |
| Repeated content overwhelms task progression | Each major section adds new information or supports a specific next action | Remove or relocate redundant intros, proof walls, and confirmation-page sales blocks |

The source checks found real content on Privacy and Terms; the migration placeholder strings in the fallback configuration are not evidence that those live local pages are empty. Review their factual accuracy with the relevant business owner separately; no legal-compliance conclusion is made here.

## Suggested implementation order

**First:** S01, S02, S08, M03, D01, and the temporary gallery correction. These address reliability, trust, and access.

**Next:** S03–S07, S09, M01–M02, and D02–D03. These reshape the main browsing-to-enquiry journey.

**Then:** S10–S13, M04–M07, and D04–D06. These improve storytelling, pacing, photographic presentation, and overall polish.

After implementation, compare enquiry starts, completion rate, validation failures, project-to-contact transitions, and mobile abandonment against a documented baseline. No numerical improvement is promised by this audit.
