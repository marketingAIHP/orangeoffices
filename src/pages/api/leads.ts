import type { APIRoute } from 'astro'; import { z } from 'zod';
const schema = z.object({ name: z.string().trim().min(2).max(120), email: z.string().trim().email().max(254), phone: z.string().trim().max(40).optional(), message: z.string().trim().min(10).max(4000), form_id: z.literal('consultation'), source_path: z.string().trim().max(500).optional() });
const response = (request: Request, message: string, status: number, redirect?: string) => request.headers.get('accept')?.includes('application/json')
  ? Response.json({ ok: status < 400, message, redirect }, { status, headers: { 'cache-control': 'no-store' } })
  : Response.redirect(new URL(status === 400 ? '/contact/?enquiry_error=validation#contact-form' : '/contact/?enquiry_error=service#contact-form', request.url), 303);
export const POST: APIRoute = async ({ request, locals }) => {
  const form = Object.fromEntries(await request.formData()); const parsed = schema.safeParse(form);
  if (!parsed.success) return response(request, 'Please correct the highlighted fields.', 400);
  const id = crypto.randomUUID(); const now = new Date().toISOString();
  try {
    await locals.runtime.env.LEADS_DB.prepare('INSERT INTO lead_submissions (id,idempotency_key,form_id,source_path,created_at,updated_at,payload_ciphertext,purge_after) VALUES (?,?,?,?,?,?,?,?)').bind(id, id, parsed.data.form_id, parsed.data.source_path || '/', now, now, JSON.stringify(parsed.data), new Date(Date.now() + 90 * 864e5).toISOString()).run();
    await locals.runtime.env.LEAD_QUEUE.send({ id });
  } catch { return response(request, 'We could not accept your enquiry right now.', 503); }
  if (request.headers.get('accept')?.includes('application/json')) return response(request, 'Enquiry received.', 200, '/thank-you/');
  return Response.redirect(new URL('/thank-you/', request.url), 303);
};
