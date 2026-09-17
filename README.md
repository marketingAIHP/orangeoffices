# Orange Offices website migration

Astro and Cloudflare Workers foundation for the Orange Offices WordPress migration.

## Local use

```powershell
npm install
npm run build
npm run import:wordpress
npm run migrate:media
```

## Cloudflare Workers deployment

This project is deployed as an Astro application on Cloudflare Workers with static assets. It is not a Cloudflare Pages project.

```powershell
npm test
npm run build
npx wrangler deploy --dry-run
npm run deploy
```

The production Worker is named `orangeoffices`. Keep `wrangler.jsonc` free of `routes` when production routes are managed in the Cloudflare dashboard. The initial cutover should use Worker Routes for `orangeoffices.in/*` and `www.orangeoffices.in/*` so removing those routes restores the existing origin quickly.

The public pages are pre-rendered and legacy WordPress media is deployed with the Worker assets. The contact form posts directly to the approved Zoho Web-to-Lead endpoint and does not depend on the legacy `/api/leads/` route.

## Safety

- Do not put private CRM credentials or Sanity write tokens in `.env`, `PUBLIC_*` variables, source control or client-side code. Zoho Web-to-Lead form identifiers are intentionally public form configuration.
- Do not deploy or attach the production domain until URL/content/media parity, lead-flow testing and the cutover checklist are approved.

`npm run migrate:media` is resumable and copies only paths listed in the WordPress-export-generated media manifest. Upload this preserved hierarchy to the configured R2 bucket before cutover.

Detailed implementation state and outstanding external inputs are recorded in [MIGRATION_STATUS.md](MIGRATION_STATUS.md).
# orangeoffices
