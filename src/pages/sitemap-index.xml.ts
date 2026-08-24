import type { APIRoute } from 'astro';
import { pages, site, services } from '../lib/site';
import wordpressRecords from '../data/wordpress-content.json';
import { getAllPosts } from '../lib/sanity/posts';
import type { SanityPost } from '../lib/sanity/types';

export const GET: APIRoute = async () => {
  const posts = await getAllPosts() as SanityPost[];
  const journalPages = Array.from({ length: Math.ceil(Math.max(0, posts.length - 6) / 10) }, (_, index) => `/journal/page/${index + 2}/`);
  const nonPostRecords = wordpressRecords.filter((record) => record.type !== 'post');
  const urls = [...new Set(['/', ...Object.keys(pages).filter((path) => path !== '/thank-you/'), ...journalPages, ...services.map(([, href]) => href), ...nonPostRecords.map((record) => record.path), ...posts.filter((post) => !post.seo?.noIndex).map((post) => `/${post.slug}/`)])];
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((path) => `<url><loc>${site}${path}</loc></url>`).join('')}</urlset>`;
  return new Response(xml, { headers: { 'content-type': 'application/xml; charset=utf-8' } });
};
