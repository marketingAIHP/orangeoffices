# Analytics Implementation Report

## Current implementation

- Google Tag Manager container: `GTM-MCXZT8FR`.
- Direct Google Analytics 4 measurement ID: `G-6P3THWKDVX`.
- Both scripts are rendered from `src/layouts/BaseLayout.astro`, so the source implementation is present for every page using the shared layout.
- The direct GA4 tag initialises one `gtag('config', 'G-6P3THWKDVX')` call in source.

## Duplicate-tracking risk

The GTM container configuration is not stored in the repository. It may also contain a GA4 Configuration tag for `G-6P3THWKDVX`; if it does, the direct tag and GTM will each send a `page_view`. Do not add another GA4 tag or GA4 configuration tag. Before production release, inspect GTM Preview/Tag Assistant and either:

1. retain the direct GA4 tag and disable the GTM GA4 page-view tag; or
2. move GA4 fully into the existing GTM container and remove the direct tag in a separately approved change.

## Event plan

| Event | Trigger | Parameters | Status |
| --- | --- | --- | --- |
| `generate_lead` | Confirmed successful Zoho submission | `form_id`, `page_path` only | Implemented; live validation pending |
| `phone_click` | Click on `tel:` link | `link_location`, `page_path` | Implemented; live validation pending |
| `whatsapp_click` | Click on approved WhatsApp CTA | `link_location`, `page_path` | Listener implemented; blocked: no approved number/CTA |
| `file_download` | Click on qualifying PDF link | `file_name`, `page_path` | Listener implemented; downloadable asset pending |
| `calculator_start` | First focus within the calculator form, once per form render | `page_path` only | Implemented; live validation pending |
| `calculator_lead` | Confirmed successful calculator submission | `page_path` only | Implemented; live validation pending |
| `calculator_result_view` | Valid approved calculator result is shown | tier/location/area bucket, not PII | Blocked until approved pricing is configured |

No event may include a name, email address, telephone number, free-text message, or other PII.

## Attribution handling

The shared layout stores `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, landing page, and referrer in session storage when a UTM-tagged visit arrives. The form appends this context to the already-supported Zoho Description field rather than inventing CRM fields. This preserves it through same-tab navigation; CRM custom fields require separate approval.

## Required manual validation

- GA4 DebugView in the production/staging property.
- Browser network inspection for a single `page_view` per page load.
- GTM Preview to inspect container tags and consent state.
- Desktop/mobile form success paths and failed-request behaviour.
- Cross-domain linker configuration for `orangeoffices.in` and `design.orangeoffices.in`; this cannot be verified from this repository.

