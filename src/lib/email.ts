import nodemailer, { type Transporter } from "nodemailer";
import { SITE } from "./site";

/**
 * Email delivery for the contact form.
 *
 * Production: set SMTP_* and CONTACT_TO_EMAIL in .env.local (see .env.example).
 * Development without SMTP settings: a throw-away Ethereal inbox is used and a
 * preview URL is printed to the terminal instead of delivering real mail.
 */

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  package: string;
  packageLabel: string;
  message?: string;
}

let cached: Promise<{ transport: Transporter; preview: boolean }> | null = null;

function getTransport() {
  if (cached) return cached;
  cached = (async () => {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env;
    if (SMTP_HOST) {
      const port = Number(SMTP_PORT ?? 465);
      return {
        transport: nodemailer.createTransport({
          host: SMTP_HOST,
          port,
          secure: SMTP_SECURE ? SMTP_SECURE === "true" : port === 465,
          auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
        }),
        preview: false,
      };
    }
    if (process.env.NODE_ENV === "production") {
      throw new Error("Email is not configured: set SMTP_HOST, SMTP_USER, SMTP_PASS and CONTACT_TO_EMAIL.");
    }
    const test = await nodemailer.createTestAccount();
    console.warn("[contact] No SMTP settings found — using an Ethereal test inbox. Emails are NOT delivered; a preview link is logged instead.");
    return {
      transport: nodemailer.createTransport({ host: test.smtp.host, port: test.smtp.port, secure: test.smtp.secure, auth: { user: test.user, pass: test.pass } }),
      preview: true,
    };
  })();
  cached.catch(() => { cached = null; }); // allow a retry after a failed setup
  return cached;
}

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

function render(d: ContactPayload) {
  const rows: [string, string][] = [
    ["Name", d.name],
    ["Email", d.email],
    ["Phone / WhatsApp", d.phone || "—"],
    ["Package", d.packageLabel],
    ["Message", d.message || "—"],
  ];
  const text = [`New quote request from the ${SITE.name} website`, "", ...rows.map(([k, v]) => `${k}: ${v}`)].join("\n");
  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#f4f3f8;font-family:Segoe UI,Helvetica,Arial,sans-serif;color:#1c1c25">
  <table role="presentation" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e6e4ee">
    <tr><td style="background:linear-gradient(90deg,#FF0B6B,#3E1ADB);padding:20px 28px;color:#fff;font-size:18px;font-weight:700">New quote request · ${escape(SITE.name)}</td></tr>
    <tr><td style="padding:24px 28px">
      <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;font-size:15px;line-height:1.5">
        ${rows.map(([k, v]) => `<tr><td style="padding:10px 0;border-bottom:1px solid #eeecf4;color:#6f6c80;width:160px;vertical-align:top">${escape(k)}</td><td style="padding:10px 0;border-bottom:1px solid #eeecf4;white-space:pre-wrap">${escape(v)}</td></tr>`).join("")}
      </table>
      <p style="margin:22px 0 0;font-size:13px;color:#8a879a">Reply to this email to answer ${escape(d.name)} directly.</p>
    </td></tr>
  </table></body></html>`;
  return { text, html };
}

export async function sendContactEmail(d: ContactPayload) {
  const { transport, preview } = await getTransport();
  const to = process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER || (preview ? "preview@example.com" : "");
  if (!to) throw new Error("CONTACT_TO_EMAIL is not set.");
  const from = process.env.CONTACT_FROM_EMAIL || `"${SITE.name} Website" <${process.env.SMTP_USER || to}>`;
  const { text, html } = render(d);
  const info = await transport.sendMail({
    from,
    to,
    replyTo: `"${d.name.replace(/"/g, "")}" <${d.email}>`,
    subject: `New quote request — ${d.name} (${d.packageLabel})`,
    text,
    html,
  });
  if (preview) console.info("[contact] Preview this email at:", nodemailer.getTestMessageUrl(info));
  return info;
}
