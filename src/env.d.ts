type Runtime = import('@astrojs/cloudflare').Runtime<{
  LEADS_DB: D1Database;
  LEAD_QUEUE: Queue;
  TURNSTILE_SECRET_KEY: string;
}>;
declare namespace App { interface Locals extends Runtime {} }
