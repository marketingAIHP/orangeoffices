# Orange Offices website migration

Astro and Cloudflare Workers foundation for the Orange Offices WordPress migration.

## Local use

```powershell
npm install
npm run build
npm run import:wordpress
npm run migrate:media
```

The public pages are pre-rendered; API routes remain Worker routes. Before running a Worker preview or deployment, create the D1 database, R2 bucket and Queue names defined in `wrangler.jsonc`, then replace the D1 placeholder with the ID returned by Cloudflare.

## Safety

- Do not put CRM, Turnstile, Resend or Sanity secret values in `.env`, `PUBLIC_*` variables, source control or client-side code.
- Set runtime secrets via `wrangler secret put`.
- Do not deploy or attach the production domain until URL/content/media parity, lead-flow testing and the cutover checklist are approved.

`npm run migrate:media` is resumable and copies only paths listed in the WordPress-export-generated media manifest. Upload this preserved hierarchy to the configured R2 bucket before cutover.

Detailed implementation state and outstanding external inputs are recorded in [MIGRATION_STATUS.md](MIGRATION_STATUS.md).
# orangeoffices
