# Orange Offices Lead Generation Execution Checklist

Last audited: 5 November 2026 (IST)

## Phase 0 - audit

| Status | Work item | Finding / next action |
| --- | --- | --- |
| COMPLETED | Repository and architecture audit | Astro 7 server build on Cloudflare Workers; Sanity supplies current journal content and migrated WordPress JSON supplies pages and portfolio content. |
| COMPLETED | Lead path audit | The public contact form posts directly to Zoho Web-to-Lead. `/api/leads` is a separate D1/Queue-backed endpoint and is not used by the contact form. |
| COMPLETED | Analytics source audit | GTM `GTM-MCXZT8FR` and direct GA4 `G-6P3THWKDVX` are in `BaseLayout.astro`. GTM container contents require GTM access to rule out a duplicate GA4 configuration. |
| COMPLETED | Technical SEO audit | Canonical URLs, robots, sitemap route, redirects and JSON-LD exist. Breadcrumb UI exists on article and project templates; BreadcrumbList JSON-LD is missing. |
| COMPLETED | Security audit | Public configuration contains no server secrets. Security headers are present. The legacy API stores plaintext JSON in a field named `payload_ciphertext`, which should not be used for new production submissions until encryption is implemented. |
| BLOCKED | Attached-PDF review | The local environment has no usable PDF text/rendering executable or Python interpreter. The pasted brief is used as the executable specification pending a readable copy/tool. |

## Phase 1 - fix and capture

| Status | Work item | Dependency |
| --- | --- | --- |
| IN PROGRESS | Analytics event foundation | `generate_lead`, phone, WhatsApp and PDF-download listeners are implemented. GTM workspace access is still required to confirm no GA4 tag duplicates the direct implementation. |
| COMPLETED | Floating WhatsApp CTA | A reusable site-wide component is configuration-backed and intentionally hidden until `PUBLIC_WHATSAPP_NUMBER` is set. |
| COMPLETED | Contextual lead forms | Project context, office size and location are incorporated in the existing Zoho Description field; no unverified CRM fields are posted. |
| COMPLETED | Project inquiry form | Reusable form is installed on portfolio project pages and retains the Zoho Web-to-Lead workflow. |
| NOT STARTED | Standardised delivery/response claims | `45-Day Delivery Guarantee` and `Quick Response Within 2 Hours` are unverified claims; approval is required before publishing. |
| COMPLETED | BreadcrumbList schema | Shared layout now emits valid JSON-LD breadcrumb entries for non-home routes. |
| NOT STARTED | Index coverage investigation | Google Search Console access is required; do not infer indexing state from the repository. |

## Phase 2 - convert and amplify

| Status | Work item | Dependency |
| --- | --- | --- |
| IN PROGRESS | Cost calculator | Responsive lead-capture UI, centralized pending configuration and Zoho-safe context storage are implemented. Approved pricing, ranges, inclusions, exclusions, and timeline rules are required to display an estimate. |
| BLOCKED | PDF estimate download | Approved estimate template, content and price rules are required; no unapproved PDF is generated. |
| IN PROGRESS | Top 20-page optimisation | A selection and review framework is prepared in `SEO_OPTIMIZATION_FRAMEWORK.md`; Google Search Console performance data is required to choose pages. |
| NOT STARTED | Project-page content completion | Client/building/area/specification evidence must be approved per project. |
| IN PROGRESS | NOC checklist lead magnet | SEO landing page and lead capture are implemented. Legal/compliance content and approved downloadable asset are required before publishing a download. |

## Phase 3 - scale

| Status | Work item | Dependency |
| --- | --- | --- |
| COMPLETED | Four micro-market pages | Four unique route-specific B2B landing pages, forms, internal links, shared BreadcrumbList schema, consultation, click-to-call, and configurable WhatsApp CTA support are implemented. |
| NOT STARTED | Paid-campaign landing-page readiness | Campaign requirements and CRM attribution-field mappings are required. |
| BLOCKED | AIHP referral routing | Existing CRM workflow access and approval are required. |

## Pre-launch QA

| Status | Work item | Finding / next action |
| --- | --- | --- |
| COMPLETED | Source/build/test QA | Build, unit tests, static analytics, form, route, calculator, schema and documentation checks completed. See `PRE_LAUNCH_AUDIT.md`. |
| BLOCKED | Staging validation | Requires staging URL, browser/device checks, GTM Preview, GA4 DebugView, structured-data validation and approved Zoho test lead. |
| BLOCKED | Staging deployment | Current Wrangler configuration names only `orangeoffices` and has no staging environment/routes/binding IDs. See `STAGING_VALIDATION_REPORT.md`. |
| IN PROGRESS | Staging infrastructure preparation | Guarded staging build/deploy scripts and a resource-isolation template are ready. Owner must create/configure distinct Cloudflare resources. See `STAGING_INFRASTRUCTURE_SETUP.md`. |
| BLOCKED | Staging deployment attempt | Local staging config is absent, Wrangler is unauthenticated, and hostname currently serves Hostinger/LiteSpeed rather than the staging Worker. See `STAGING_DEPLOYMENT_RESULTS.md`. |

