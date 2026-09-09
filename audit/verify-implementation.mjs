import { chromium } from 'file:///C:/Users/Public/orange-audit-tools/node_modules/playwright/index.mjs';
import fs from 'node:fs';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];

for (const width of [390, 768, 1024, 1440]) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
  for (const path of ['/', '/services/', '/collections/', '/gallery/', '/contact/', '/journal/', '/clients/', '/project/anand-rathi-wealth/']) {
    const response = await page.goto(`http://localhost:4321${path}`, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.evaluate(() => document.fonts.ready);
    const metrics = await page.evaluate(() => ({
      title: document.title,
      h1: document.querySelector('h1')?.textContent?.trim(),
      height: document.documentElement.scrollHeight,
      overflow: document.documentElement.scrollWidth - innerWidth,
      formTop: document.querySelector('form') ? Math.round(document.querySelector('form').getBoundingClientRect().top + scrollY) : null,
      brokenImages: [...document.images].filter((image) => image.complete && image.currentSrc && !image.naturalWidth).map((image) => image.currentSrc),
    }));
    results.push({ width, path, status: response?.status(), ...metrics });
    if (['/', '/collections/', '/gallery/', '/contact/'].includes(path)) {
      await page.screenshot({ path: `C:/orangeoffices/audit/screenshots/implemented-${path === '/' ? 'home' : path.slice(1, -1)}-${width}.png`, fullPage: false });
    }
  }
  await page.close();
}

const mobile = await browser.newPage({ viewport: { width: 390, height: 480 }, reducedMotion: 'reduce' });
await mobile.goto('http://localhost:4321/', { waitUntil: 'domcontentloaded' });
await mobile.locator('.mobile-nav summary').click();
const menu = await mobile.locator('.mobile-nav nav').evaluate((node) => ({ clientHeight: node.clientHeight, scrollHeight: node.scrollHeight, overflowY: getComputedStyle(node).overflowY }));
await mobile.keyboard.press('Tab');
await mobile.keyboard.press('Escape');
const restoredFocus = await mobile.locator('.mobile-nav summary').evaluate((node) => document.activeElement === node);
results.push({ interaction: 'mobile-menu', menu, restoredFocus });

await mobile.goto('http://localhost:4321/contact/', { waitUntil: 'domcontentloaded' });
await mobile.locator('#name').fill('A');
await mobile.locator('#email').fill('audit@example.invalid');
await mobile.locator('#message').fill('short');
await mobile.locator('form button').click();
results.push({ interaction: 'form-validation', url: mobile.url(), status: await mobile.locator('.form__status').textContent(), invalid: await mobile.locator('[aria-invalid="true"]').count() });

fs.writeFileSync('C:/orangeoffices/audit/implementation-results.json', JSON.stringify(results, null, 2));
await browser.close();
