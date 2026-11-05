# Orange Offices Staging Deployment & Live QA Report

Audited: 5 November 2026 (IST)

## Deployment status

**BLOCKED - no staging deployment was performed.**

Latest read-only hostname check: `staging.orangeoffices.in` resolves but serves a Hostinger/LiteSpeed PHP origin, not the intended Cloudflare Worker. See `STAGING_DEPLOYMENT_RESULTS.md`.

The checked-in Cloudflare configuration defines only one Worker name, `orangeoffices`, with no named environment, staging route, staging hostname, or staging resource IDs. Deploying with the current `npm run deploy` command could target the production Worker. Production DNS and routes were not touched.

### Actual dry-run result

`npx wrangler deploy --dry-run` completed successfully after the production build. Wrangler used the generated `dist/server/wrangler.json` configuration and reported:

- 30 Worker modules, 1.88 MiB.
- 418 static assets.
- 2.15 MiB total upload, 608.92 KiB gzip.
- Bindings expected by the generated Worker: `SESSION` (KV), `IMAGES`, and `ASSETS`.

The dry run does not prove that the current named Worker is a staging worker, nor that remote staging bindings exist.

`npm run build:staging` also completed successfully in Astro staging mode. It validates the staging build wrapper only; it does not create, configure, or deploy Cloudflare resources.

## Required isolated staging setup

An authorised Cloudflare account owner must provide/create all of the following before deployment:

1. A dedicated Worker name, for example `orangeoffices-staging`.
2. A staging hostname/route not attached to either production hostname.
3. A dedicated staging KV namespace for `SESSION`.
4. A dedicated staging Images binding/resource, or an explicitly approved shared non-production image strategy.
5. Staging-only values for all server-side secrets used by optional lead infrastructure. Never copy or print production secret values.
6. Confirmation that the shared direct Zoho Web-to-Lead endpoint is safe for approved staging test leads, or an alternate staging endpoint.

After these are supplied, follow `STAGING_INFRASTRUCTURE_SETUP.md`. Do **not** run `npm run deploy` while `wrangler.jsonc` remains production-named.

## Live QA status

| Area | Status | Actual result |
| --- | --- | --- |
| Browser layout checks | BLOCKED | No staging URL exists. |
| GTM Preview | BLOCKED | Requires container workspace access and a staging URL. |
| GA4 DebugView | BLOCKED | Requires GA4 property access and a staging URL. |
| Zoho receipt | BLOCKED | Requires approved staging test lead and CRM access. |
| Sitemap/robots/canonical over HTTPS | BLOCKED | Requires staging URL. |
| Structured data / broken link crawl | BLOCKED | Requires staging URL and crawler run. |
| Lighthouse/Web Vitals | BLOCKED | Requires staging URL. |
| Source build and unit tests | PASS | Verified locally in pre-launch audit and retained as deployment gate. |

## Analytics verification plan

In GTM Preview and GA4 DebugView on the staging hostname:

1. Open a clean browser session and one page. Confirm exactly one `page_view` for `G-6P3THWKDVX`.
2. Inspect GTM tags. If GTM also sends a GA4 configuration/page view for the same measurement ID, disable that duplicate only after owner approval.
3. Click a `tel:` CTA; confirm one `phone_click` with non-PII `page_path` and `link_location`.
4. Configure the approved staging WhatsApp number and click its CTA; confirm one `whatsapp_click`.
5. Open calculator and focus a field; confirm one `calculator_start` per page render.
6. Submit an approved calculator test lead; confirm `generate_lead` and `calculator_lead` only after confirmed response.
7. When approved PDFs exist, click one and confirm `file_download` once.
8. Inspect all event parameters to confirm no form values, email, phone, name or free text are sent.

## Zoho validation plan

Use only an approved, identifiable staging test lead. Test consultation, project inquiry, calculator and NOC forms separately. For each, verify one CRM record, no duplicate record after a repeated-click attempt, correct Description context, calculator/project context, and UTM/landing/referrer context. Do not use a production lead or unapproved personal contact data.

## Performance and bundle findings

- The dry run confirms the migrated WordPress content module is 1.38 MiB in the Worker output.
- Actual visitor impact is not measured. Run desktop and mobile Lighthouse on staging before making any code-splitting decision.
- Treat this as **MEDIUM** until staged LCP/INP/CLS evidence shows user impact.

## Issues

| Severity | Issue | Resolution |
| --- | --- | --- |
| CRITICAL | No isolated staging Worker/configuration | Owner must provide staging Worker, route and binding IDs. |
| HIGH | GTM duplicate page-view risk unverified | Complete GTM Preview/GA4 DebugView checklist. |
| HIGH | Zoho receipt and duplicate prevention unverified | Complete approved staging-lead tests. |
| MEDIUM | Large migrated WordPress content module | Measure on staging before optimisation. |
| LOW | WhatsApp CTA inactive | Configure approved `PUBLIC_WHATSAPP_NUMBER` in staging build environment. |

## Production readiness recommendation

**Not ready for production.** The source is suitable for staging only after isolated Cloudflare resources are explicitly configured. Production requires separate explicit approval after all live QA checks pass.
