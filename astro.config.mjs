import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sanity from '@sanity/astro';
import { loadEnv } from 'vite';

const env = loadEnv(
  process.env.NODE_ENV ?? 'development',
  process.cwd(),
  '',
);

// These are public Sanity identifiers, not secrets. Cloudflare's build container
// does not receive the developer-only `.env.local`, so retain the documented
// production values as safe build defaults. Deployment variables can override
// either value without a source change.
const PUBLIC_SANITY_PROJECT_ID = env.PUBLIC_SANITY_PROJECT_ID || '7uyaubkj';
const PUBLIC_SANITY_DATASET = env.PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  site: 'https://orangeoffices.in',
  trailingSlash: 'always',
  output: 'server',
  vite: {
    // Builds must not replace optimized modules used by a running dev server.
    cacheDir: process.env.NODE_ENV === 'production'
      ? 'node_modules/.vite-build'
      : 'node_modules/.vite-dev',
  },
  adapter: cloudflare(),
  integrations: [sanity({
    projectId: PUBLIC_SANITY_PROJECT_ID,
    dataset: PUBLIC_SANITY_DATASET,
    apiVersion: '2026-08-17',
    useCdn: false,
  })],
});
