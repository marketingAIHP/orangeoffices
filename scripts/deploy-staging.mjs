import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const configPath = 'wrangler.staging.jsonc';
const expectedName = 'orangeoffices-staging';
const expectedHost = 'staging.orangeoffices.in/*';

if (!existsSync(configPath)) {
  throw new Error(`${configPath} is missing. Copy wrangler.staging.example.jsonc, then supply staging-only resource IDs.`);
}

const config = JSON.parse(readFileSync(configPath, 'utf8'));
if (config.name !== expectedName) throw new Error(`Refusing deploy: staging Worker must be named ${expectedName}.`);
if (!Array.isArray(config.routes) || !config.routes.some((route) => route.pattern === expectedHost)) {
  throw new Error(`Refusing deploy: ${configPath} must contain the isolated ${expectedHost} route.`);
}
if (!Array.isArray(config.kv_namespaces) || config.kv_namespaces.some((binding) => !binding.id || binding.id.includes('REPLACE_'))) {
  throw new Error('Refusing deploy: configure a dedicated staging KV namespace ID for every KV binding.');
}

const dryRun = process.argv.includes('--dry-run');
const result = spawnSync('npx', ['wrangler', 'deploy', '--config', configPath, ...(dryRun ? ['--dry-run'] : [])], { stdio: 'inherit' });
process.exit(result.status ?? 1);
