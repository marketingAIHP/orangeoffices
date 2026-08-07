# Orange Offices website migration

Astro and Cloudflare Workers foundation for the Orange Offices WordPress migration.

## Local use

```powershell
npm install
npm run build
npm run import:wordpress
npm run migrate:media
```

## Cloudflare Pages preview deployment

Connect the GitHub repository to Cloudflare Pages with these build settings:

- Production branch: `main`
- Root directory: `/` (the repository root; do not set a subdirectory)
- Build command: `npm run build`
- Build output directory: `dist`
- Node.js version: `24` (also pinned by `.node-version`)

The application files must be committed and pushed before Cloudflare can build them. In particular, confirm that `package.json`, `package-lock.json`, `astro.config.mjs`, `public/`, and `src/` appear in the selected GitHub branch. A Cloudflare build error for `/opt/buildhome/repo/package.json` means the selected commit does not contain the application files; changing the npm command will not fix that.

Every non-production branch deployment receives its own preview URL. The public pages and health endpoint work without secrets. The demo configuration deliberately has no R2, D1, or Queue bindings so it can deploy to a new Cloudflare account without provisioning paid or account-level services. Form submissions therefore return the endpoint's intentional HTTP 503 fallback.

The public pages are pre-rendered; API routes remain Worker routes. Before enabling production lead capture, create a D1 database and Queue, add their `LEADS_DB` and `LEAD_QUEUE` bindings to `wrangler.jsonc`, and apply `migrations/d1/0001_leads.sql`. Add an R2 binding separately only when migrated media is served from R2.

## Safety

- Do not put CRM, Turnstile, Resend or Sanity secret values in `.env`, `PUBLIC_*` variables, source control or client-side code.
- Set runtime secrets via `wrangler secret put`.
- Do not deploy or attach the production domain until URL/content/media parity, lead-flow testing and the cutover checklist are approved.

`npm run migrate:media` is resumable and copies only paths listed in the WordPress-export-generated media manifest. Upload this preserved hierarchy to the configured R2 bucket before cutover.

Detailed implementation state and outstanding external inputs are recorded in [MIGRATION_STATUS.md](MIGRATION_STATUS.md).
# orangeoffices
