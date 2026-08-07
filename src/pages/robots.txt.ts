import type { APIRoute } from 'astro';
export const GET: APIRoute = () => new Response('User-agent: *\nAllow: /\nSitemap: https://orangeoffices.in/sitemap-index.xml\n', { headers: { 'content-type': 'text/plain; charset=utf-8' } });
