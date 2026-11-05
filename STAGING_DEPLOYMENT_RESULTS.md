# Orange Offices Staging Deployment Results

Checked: 5 November 2026 (IST)

## Deployment status

**NOT DEPLOYED - blocked before configuration and deployment.**

No Cloudflare Worker, DNS, secret, CRM, analytics, or production resource was changed.

## Required checks: actual results

| Check | Status | Actual result |
| --- | --- | --- |
| Local staging configuration | BLOCKED | `wrangler.staging.jsonc` does not exist. |
| Wrangler authentication | BLOCKED | `npx wrangler whoami` reports no authenticated account. |
| Staging hostname DNS | PASS - DNS only | `staging.orangeoffices.in` resolves to `82.25.122.137`. |
| Staging Worker route | CRITICAL | HTTPS response is Hostinger/LiteSpeed PHP, not the configured Cloudflare Worker. |
| Dedicated staging KV | BLOCKED | No local staging config or authenticated account to verify namespace ID. |
| Staging Images binding | BLOCKED | No authenticated account/binding configuration to verify. |
| Staging secrets | BLOCKED | No authenticated account/staging Worker to inspect; no secrets were read or copied. |
| Zoho staging approval | BLOCKED | No approved staging test-lead process or endpoint was supplied. |

## Read-only HTTPS evidence

`https://staging.orangeoffices.in/` returned HTTP 200 with `X-Powered-By: PHP/8.3.36`, `Server: LiteSpeed`, and Hostinger platform headers. This demonstrates that DNS currently resolves to a non-Worker origin. It does not validate the Orange Offices staging build.

## Analytics, Zoho, SEO, performance and browser QA

All live validation is **BLOCKED** because the staging hostname is not serving the intended Worker.

- GA4/GTM Preview and DebugView: not performed.
- Zoho test submissions: not performed.
- Browser/responsive checks: not performed.
- Sitemap, canonical, schema, redirects and crawl: not performed against staging.
- Lighthouse/Web Vitals: not performed against the intended staging build.

## Infrastructure owner actions required

1. Authenticate an authorised deployment identity with Cloudflare.
2. Create/confirm Worker `orangeoffices-staging`.
3. Create a dedicated staging KV namespace and provide its ID to the owner-controlled ignored `wrangler.staging.jsonc`.
4. Confirm approved staging Images binding/account strategy and staging-only secrets.
5. Update only the staging DNS/Worker custom-domain route so `staging.orangeoffices.in/*` serves `orangeoffices-staging`; do not change production DNS.
6. Confirm approved Zoho staging/test-lead process.
7. Re-run `npm run build:staging` and `npm run deploy:staging:dry-run`; verify the target before running `npm run deploy:staging`.

## Production readiness

**Not ready for production.** Staging has not been deployed or live-tested. Production deployment remains outside the scope of this request and requires separate explicit approval.
