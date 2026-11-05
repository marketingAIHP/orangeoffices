import { spawnSync } from 'node:child_process';

const result = spawnSync(process.execPath, ['node_modules/astro/bin/astro.mjs', 'build', '--mode', 'staging'], {
  stdio: 'inherit',
  env: { ...process.env, DEPLOY_ENV: 'staging' },
});

process.exit(result.status ?? 1);
