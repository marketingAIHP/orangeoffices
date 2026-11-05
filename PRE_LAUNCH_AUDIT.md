# Orange Offices Pre-Launch QA Audit

Audited: 5 November 2026 (IST)  
Scope: repository source, production build, automated tests, static route/SEO/analytics review. No production forms, GA4 DebugView, GTM Preview, Search Console, or live production site were accessed.

## Overall status

**Ready for staging deployment with external validation required before production.**

## Page and template review

| Area | Status | Result |
| --- | --- | --- |
| Shared layout | PASS | Canonical, Open Graph, organisation schema, shared BreadcrumbList, footer contacts, GTM and direct GA4 source present. |
| Homepage and Services calculator | PASS - static/build | One reusable calculator component renders in both placements. Desktop form uses a two-column grid; the mobile breakpoint collapses it to one column. |
| Consultation, project, calculator and NOC forms | PASS - source | Reuse the same Zoho endpoint, client validation, honeypot, loading state, error state and success redirect. No production submission was made. |
| Micro-market pages | PASS - source/build | Four unique route configurations have distinct title, description, heading, copy, image, CTA, form and internal-link content. No unsupported local-project claims are used. |
| NOC landing page | PASS - source | Has SEO metadata and lead capture. Its download control is intentionally disabled pending legal/business review. |

## Calculator UI and form status

- Premium two-column introduction/card layout is present at desktop widths.
- Calculator fields are ordered in two-column rows; description and CTA are full width.
- Mobile breakpoint changes the form to one column; existing mobile action/floating CTA spacing is accounted for in CSS.
- Required inputs, email validity, numeric carpet-area pattern, select requirements, and mobile-number format validation are enforced before the Zoho request.
- Submission locks the button while the request is active. Success redirects to `/thank-you/`; failures restore the configured CTA label and expose an accessible error status.
- Prices and timelines remain null and no estimate/PDF is generated.

## Analytics status

| Item | Status | Notes |
| --- | --- | --- |
| Direct GA4 | SOURCE VERIFIED | One `gtag('config', 'G-6P3THWKDVX')` call in shared layout. |
| GTM | SOURCE VERIFIED | One container source snippet for `GTM-MCXZT8FR`. |
| Lead events | SOURCE VERIFIED | `generate_lead` follows confirmed response; calculator forms also send `calculator_lead`. |
| Click/download events | SOURCE VERIFIED | Delegated listeners cover phone, WhatsApp and PDF links. |
| Live event delivery | BLOCKED | Requires GA4 DebugView and GTM Preview. |
| Duplicate page views | BLOCKED | GTM container configuration is external; inspect whether it also has GA4 configuration/page-view tag. |

No analytics event in source contains form values, names, email addresses, telephone numbers, or free-text content.

## Attribution and CRM status

- UTM source, medium, campaign, content and term are stored for the same tab together with landing page and referrer.
- On form submission, the values are appended to Zoho's verified Description field; no undocumented Zoho custom field is posted.
- CRM receipt and field persistence require an approved staging/test lead and Zoho access.

## Technical SEO status

- Shared canonical tags, `/robots.txt`, sitemap generation, legacy sitemap redirects, intentional noindex on thank-you, and BreadcrumbList JSON-LD are present.
- Micro-market and NOC pages are registered in the central page registry, which feeds the sitemap.
- Search Console data is still required for index-coverage investigation and top-20 optimisation choices.
- Broken-link crawling and structured-data rich-result validation require a deployed staging URL.

## Performance and responsive status

- Images use dimensions and lazy loading in the reviewed new templates.
- Calculator and micro-market CSS uses responsive grid collapse to avoid narrow multi-column controls.
- Build reports a pre-existing large WordPress-content bundle warning. This is **MEDIUM** performance debt, not a build failure; code splitting/content-data strategy should be evaluated after staging measurement.
- Actual LCP, INP, CLS and browser console checks require a running staging/browser session. A local background dev server could not be started in this execution environment.

## Issues and required actions

| Severity | Issue | Required action |
| --- | --- | --- |
| BLOCKED | GTM may duplicate direct GA4 page views | Use GTM Preview/Tag Assistant; retain only one GA4 page-view sender. |
| BLOCKED | Live Zoho form receipt cannot be confirmed safely | Submit an approved staging test lead and verify CRM record/Description contents. |
| BLOCKED | Calculator estimate and PDF are intentionally unavailable | Provide approved pricing, inclusions, timeline rules, estimate template and approval language. |
| BLOCKED | NOC download is intentionally disabled | Complete legal/business review and provide final PDF. |
| HIGH | No live Search Console/index coverage review | Provide 90-day page/query export and staging crawl access. |
| MEDIUM | WordPress content bundle exceeds Vite warning threshold | Measure staged Core Web Vitals; then code split or change data-loading strategy if it affects LCP/INP. |
| LOW | No approved WhatsApp number in environment | Set `PUBLIC_WHATSAPP_NUMBER` before enabling the floating CTA. |

## Required staging checklist

1. Validate canonical, robots, sitemap and all five new URLs over HTTPS.
2. Inspect desktop (1440/1024), tablet (768), and mobile (390/360) layouts in browser dev tools.
3. Test valid/invalid form states without sending unapproved CRM leads.
4. Submit one approved staging lead for each form type; confirm no duplicate record and that Description includes attribution/context.
5. Use GTM Preview and GA4 DebugView to confirm one page view, event parameters, and no PII.
6. Run Lighthouse/Web Vitals and structured-data validation against staging.

## Deployment recommendation

Staging deployment is appropriate after normal change review. Production deployment should wait for the blocked GTM/GA4 and Zoho validation steps, plus the required business/legal approvals.
