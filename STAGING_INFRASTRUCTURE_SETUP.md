# Orange Offices Staging Infrastructure Setup

## Existing production configuration

- Worker name: `orangeoffices` in `wrangler.jsonc`.
- Production deployment command: `npm run deploy`.
- Cloudflare adapter generates `dist/server/wrangler.json` at build time.
- Generated worker requires bindings named `ASSETS`, `SESSION`, and `IMAGES`.
- Public build variables are loaded from the Vite mode; server-only secrets must never be committed or prefixed `PUBLIC_`.

No production route, DNS record, namespace ID, Images account resource, secret, or credential is copied by this staging preparation.

## Proposed staging architecture

| Concern | Staging requirement |
| --- | --- |
| Worker | A distinct Worker named `orangeoffices-staging`. |
| Hostname | `staging.orangeoffices.in`, routed only to the staging Worker. |
| KV | A distinct namespace bound as `SESSION`; never use a production namespace ID. |
| Images | Bind `IMAGES` only in an approved staging Cloudflare account/resource context. Cloudflare Images is account-level, so independent isolation requires a separate account or explicit owner approval for shared access. |
| Assets | Deploy `dist/client` only through the staging Worker configuration. |
| Observability | Keep enabled, but ensure access is limited to the staging team. |
| CRM | Use an owner-approved staging/test endpoint or clearly marked approved test leads only. |

## Required owner actions

1. Create `orangeoffices-staging` in the authorised Cloudflare account.
2. Create a dedicated KV namespace for staging session data and record its ID securely.
3. Decide whether Cloudflare Images access is isolated through a separate account or explicitly approved as shared; do not silently reuse production access.
4. Add a staging DNS record and Worker custom-domain route for `staging.orangeoffices.in`; do not alter `orangeoffices.in` or `www.orangeoffices.in`.
5. Copy `wrangler.staging.example.jsonc` to the ignored `wrangler.staging.jsonc` and replace the KV placeholder with the staging namespace ID. Do not commit that file.
6. Create an ignored `.env.staging` with staging-safe public values. Create staging secrets via the Cloudflare dashboard or `wrangler secret put` against the staging Worker only.

## Staging environment checklist

| Variable / integration | Staging policy |
| --- | --- |
| `PUBLIC_SANITY_PROJECT_ID` | Use a separate staging project/dataset where available; production content access requires explicit approval. |
| `PUBLIC_SANITY_DATASET` | Staging dataset preferred. |
| `PUBLIC_SANITY_API_VERSION` | May match production; not secret. |
| `PUBLIC_WHATSAPP_NUMBER` | Approved staging/test number only, or leave blank to hide CTA. |
| `TURNSTILE_SECRET_KEY` | Independent staging key if Turnstile is enabled. |
| `ZOHO_CLIENT_ID`, `ZOHO_CLIENT_SECRET`, `ZOHO_REFRESH_TOKEN` | Independent staging integration only. Not used by current direct Web-to-Lead form, but never copy production values. |
| `RESEND_API_KEY` | Separate staging key/sender only. |
| `LEAD_PAYLOAD_KEY` | Independent staging secret only. |
| Zoho Web-to-Lead endpoint | Confirm an approved test-lead process before form QA. |

## Commands

```powershell
# One-time, owner-controlled local configuration
Copy-Item wrangler.staging.example.jsonc wrangler.staging.jsonc
# Edit only wrangler.staging.jsonc with the staging KV namespace ID.

# Build with staging mode (loads .env.staging when present)
npm run build:staging

# Validate package/config without remote mutation
npm run deploy:staging:dry-run

# Deploy only after owner review; guard rejects any non-staging Worker name/route.
npm run deploy:staging
```

`npm run deploy` remains the production command and is intentionally not called by any staging script.

## Validation after staging deployment

1. Verify `https://staging.orangeoffices.in/` returns the staging Worker.
2. Check staging-only hostname, Worker name, KV binding, images binding and secrets in Cloudflare dashboard.
3. Run the test plan in `STAGING_VALIDATION_REPORT.md`: responsive checks, GA4 DebugView, GTM Preview, approved Zoho test leads, SEO crawl, structured data and Lighthouse.
4. Confirm no production DNS, Worker logs, KV data, CRM leads or credentials were touched.

## Rollback

- Remove only the `staging.orangeoffices.in` Worker route/custom domain or redeploy a prior staging Worker version.
- Do not roll back by changing production routes, DNS, bindings, or Worker configuration.
- Preserve staging incident logs and test lead records according to the approved retention policy.

## Safeguards

- `scripts/deploy-staging.mjs` refuses a Worker name other than `orangeoffices-staging`.
- It requires the exact `staging.orangeoffices.in/*` route.
- It rejects missing or placeholder KV IDs.
- `wrangler.staging.jsonc` is ignored by Git; `wrangler.staging.example.jsonc` contains no secrets or real resource IDs.
- No production configuration, GA4, GTM, DNS, or CRM integration is altered.
