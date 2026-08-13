import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

const source = process.argv[2] ?? 'orangeoffices.WordPress.2026-07-30.xml';
const target = 'src/data/wordpress-content.json';
const mediaTarget = 'data/legacy-media-map.json';
const xml = await readFile(source, 'utf8');

const decode = (value = '') => value
  .replace(/^<!\[CDATA\[([\s\S]*?)\]\]>$/, '$1')
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#0?39;/g, "'");
const field = (block, tag) => {
  const match = block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, 'i'));
  return decode(match?.[1]?.trim());
};
const strip = (html) => html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
const mediaPath = (url) => {
  try { const pathname = new URL(url).pathname; return pathname.startsWith('/wp-content/uploads/') ? pathname : null; } catch { return null; }
};
const sanitize = (html = '') => html
  .replace(/<(?:script|style|iframe|form|object|embed)\b[^>]*>[\s\S]*?<\/(?:script|style|iframe|form|object|embed)>/gi, '')
  .replace(/\son\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
  .replace(/\sstyle\s*=\s*(?:"[^"]*"|'[^']*')/gi, '')
  .replace(/href\s*=\s*(["'])https?:\/\/orangeoffices\.in(\/wp-content\/uploads\/[^"']+)\1/gi, (_match, quote, path) => `href=${quote}${path}${quote}`)
  .replace(/src\s*=\s*(["'])https?:\/\/orangeoffices\.in(\/wp-content\/uploads\/[^"']+)\1/gi, (_match, quote, path) => `src=${quote}${path}${quote}`)
  .replace(/https?:\/\/orangeoffices\.in\/wp-content\/uploads\//gi, '/wp-content/uploads/')
  .replace(/\[caption[^\]]*\]/gi, '').replace(/\[\/caption\]/gi, '')
  .replace(/\[(?!\/?(?:strong|em|a)\b)[^\]]+\]/gi, '');
const metadata = (block) => {
  const result = {};
  for (const entry of block.matchAll(/<wp:postmeta>[\s\S]*?<wp:meta_key>([\s\S]*?)<\/wp:meta_key>[\s\S]*?<wp:meta_value>([\s\S]*?)<\/wp:meta_value>[\s\S]*?<\/wp:postmeta>/gi)) {
    const key = decode(entry[1].trim());
    if (key === '_yoast_wpseo_title' || key === '_yoast_wpseo_metadesc' || key === '_thumbnail_id') result[key] = decode(entry[2].trim());
  }
  return result;
};

const records = [];
const media = [];
const attachments = new Map();
for (const match of xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)) {
  const block = match[1];
  if (field(block, 'wp:post_type') !== 'attachment') continue;
  const url = mediaPath(field(block, 'wp:attachment_url'));
  if (url) attachments.set(field(block, 'wp:post_id'), url);
}
for (const match of xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)) {
  const block = match[1];
  const type = field(block, 'wp:post_type');
  const status = field(block, 'wp:status');
  const slug = field(block, 'wp:post_name');
  const link = field(block, 'link');
  if (type === 'attachment' && status === 'inherit') {
    const url = mediaPath(field(block, 'wp:attachment_url'));
    if (url) media.push({ sourceUrl: `https://orangeoffices.in${url}`, path: url, status: 'pending-r2-copy' });
    continue;
  }
  if (status !== 'publish' || !slug || !['page', 'post', 'portfolio'].includes(type)) continue;
  const raw = field(block, 'content:encoded');
  const html = sanitize(raw)
    .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, '')
  .replace(/<a\s+tabindex=["']0["'][^>]*>([\s\S]*?)<\/a>/gi, '<h3 class="faq-question">$1</h3>')
    .replace(/<h1\b/gi, '<h2').replace(/<\/h1>/gi, '</h2>')
    .replace(/\s(?:srcset|sizes)=(?:"[^"]*"|'[^']*')/gi, '')
    .replace(/https?:\/\/(?:www\.)?orangeoffices\.in(?=\/|["'])/gi, '')
    .replace(/href=(["'])\/blog\/([^"'#?]+)\1/gi, 'href=$1/$2$1')
    .replace(/href=(["'])\/collection\/?\1/gi, 'href=$1/collections/$1')
    .replace(/href=(["'])\/(contact|journal|services)\1/gi, 'href=$1/$2/$1');
  const meta = metadata(block);
  const path = type === 'portfolio' ? `/project/${slug}/` : `/${slug}/`;
  records.push({
    id: field(block, 'wp:post_id'), type, slug, path, sourceLink: link, title: field(block, 'title'),
    publishedAt: field(block, 'wp:post_date'), modifiedAt: field(block, 'wp:post_date_gmt') || field(block, 'wp:post_date'),
    contentHtml: html, image: attachments.get(meta._thumbnail_id) ?? html.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1] ?? null,
    description: meta._yoast_wpseo_metadesc || strip(html).slice(0, 155),
    seoTitle: meta._yoast_wpseo_title || field(block, 'title'),
  });
}
records.sort((a, b) => a.path.localeCompare(b.path));
const manifestPaths = new Set(media.map((item) => item.path));
for (const record of records) {
  for (const match of record.contentHtml.matchAll(/src="(\/wp-content\/uploads\/[^"]+)"/gi)) {
    if (!manifestPaths.has(match[1])) {
      media.push({ sourceUrl: `https://orangeoffices.in${match[1]}`, path: match[1], status: 'pending-r2-copy' });
      manifestPaths.add(match[1]);
    }
  }
}
media.sort((a, b) => a.path.localeCompare(b.path));
await mkdir(dirname(target), { recursive: true });
await writeFile(target, `${JSON.stringify(records, null, 2)}\n`);
await writeFile(mediaTarget, `${JSON.stringify(media, null, 2)}\n`);
console.log(`Imported ${records.length} published records and indexed ${media.length} legacy media paths.`);
