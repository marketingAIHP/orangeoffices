import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve, sep } from 'node:path';

const manifestPath = 'data/legacy-media-map.json';
const outputRoot = resolve('public');
const records = JSON.parse(await readFile(manifestPath, 'utf8'));
const concurrency = 6;
let cursor = 0;
let copied = 0;
let failed = 0;

async function exists(path) { try { await access(path); return true; } catch { return false; } }
async function worker() {
  while (cursor < records.length) {
    const record = records[cursor++];
    const relative = record.path.replace(/^\/+/, '');
    const destination = resolve(outputRoot, relative);
    if (!destination.startsWith(`${outputRoot}${sep}`)) throw new Error(`Unsafe media path: ${record.path}`);
    if (await exists(destination)) { record.status = 'copied-local'; copied++; continue; }
    try {
      const response = await fetch(record.sourceUrl, { redirect: 'error', signal: AbortSignal.timeout(45_000) });
      const type = response.headers.get('content-type') ?? '';
      if (!response.ok || !(type.startsWith('image/') || type === 'application/pdf' || type.startsWith('font/') || type === 'application/x-font-ttf')) throw new Error(`HTTP ${response.status}; ${type}`);
      await mkdir(dirname(destination), { recursive: true });
      await writeFile(destination, new Uint8Array(await response.arrayBuffer()));
      record.status = 'copied-local';
      copied++;
    } catch (error) {
      record.status = 'failed-local-copy';
      record.error = error instanceof Error ? error.message : String(error);
      failed++;
    }
  }
}
await Promise.all(Array.from({ length: concurrency }, worker));
await writeFile(manifestPath, `${JSON.stringify(records, null, 2)}\n`);
console.log(`Legacy media copy complete: ${copied} copied, ${failed} failed.`);
process.exitCode = failed ? 1 : 0;
