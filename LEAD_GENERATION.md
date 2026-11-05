# Lead Generation Implementation Notes

## Existing lead capture

`src/components/ContactForm.astro` is the live capture path. It validates client-side, includes Zoho's honeypot, posts to Zoho Web-to-Lead, and sends successful visitors to `/thank-you/`.

Project pages now use the same form through `ProjectInquiryForm.astro`. The form collects optional office size and project location, then appends these and the project title to Zoho's existing `Description` value. This avoids sending undocumented Zoho custom fields.

## Conversion CTA components

- `FloatingWhatsApp.astro` is rendered site-wide but only displays when `PUBLIC_WHATSAPP_NUMBER` is configured. Its page-aware prefilled message is safe to customise in `BaseLayout.astro`.
- Primary and mobile CTAs retain the existing consultation and phone paths.
- Telephone, WhatsApp and PDF links use the analytics listeners documented in `ANALYTICS.md`.

## CRM constraints

The repository does not disclose Zoho custom-field API names or workflow rules. Do not post extra fields such as UTM values, calculator choices, project size, or routing labels until their corresponding Zoho mappings are supplied and tested.

## Conversion dependencies

- WhatsApp CTA: approved number and response-owner confirmation.
- Project inquiry form: approved Zoho custom-field mappings.
- Calculator: verified pricing ranges and qualification logic.
- Downloadable checklist: approved legal/compliance content and final PDF.
- AIHP routing: CRM workflow access and owner/routing rules.
- WhatsApp: set `PUBLIC_WHATSAPP_NUMBER` to the approved international business number and rebuild; no number is stored in source.

## Attribution

UTM retention must be implemented only once the CRM mapping is known. Capturing UTM values in unknown Zoho fields can silently drop leads or break the existing form integration.

## Phase 2 calculator and checklist

- `CostCalculator.astro` is available on the homepage and relevant service pages. `src/lib/calculator.ts` is the sole pricing/timeline configuration location; every value is intentionally `null` pending approval.
- The calculator uses a responsive two-column desktop field grid and a single-column mobile grid. This is presentation-only; its Zoho field names, validation flow and analytics triggers are unchanged.
- The calculator uses the existing Zoho Web-to-Lead form. Carpet area, team size, location and finish tier are appended to the supported Description field rather than undocumented CRM fields.
- The NOC checklist landing page is available at `/delhi-ncr-commercial-office-fit-out-building-noc-checklist/`. It captures interest but does not offer a file until approved source content and a reviewed PDF are provided.
- Required Zoho configuration for attribution: confirmed custom-field API names (or a documented supported Description format) for UTM source, medium, campaign, landing page, calculator lead type, carpet area, team size, location, and finish tier.

## Phase 3 attribution and micro-market pages

- First-party UTM values and landing/referrer context persist in session storage for same-tab navigation and are appended to Zoho Description, the only verified compatible field.
- The four micro-market forms reuse the approved Zoho endpoint and identify their page context through Description. No CRM custom-field IDs were assumed.

