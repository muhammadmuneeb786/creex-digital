"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { PACKAGE_OPTIONS, waLink } from "@/lib/site";
import { Icon } from "./Icon";

type Status = "idle" | "sending" | "sent" | "error";

const packageLabel = (value: string) => PACKAGE_OPTIONS.find((o) => o.value === value)?.label ?? value;

export function ContactForm() {
  const params = useSearchParams();
  const preset = params.get("package");
  const initialPackage = PACKAGE_OPTIONS.some((o) => o.value === preset) ? (preset as string) : "unsure";

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [values, setValues] = useState({ name: "", email: "", phone: "", package: initialPackage, message: "", website: "" });

  const update = (field: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [field]: e.target.value }));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!e.currentTarget.reportValidity()) return;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong. Please try again or use WhatsApp.");
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again or use WhatsApp.");
    }
  }

  const whatsappText = [
    "Hi Creex Digital, I'd like a quote.",
    values.name && `Name: ${values.name}`,
    values.email && `Email: ${values.email}`,
    values.phone && `Phone: ${values.phone}`,
    `Package: ${values.package === "unsure" ? "not sure yet" : packageLabel(values.package)}`,
    values.message && `Message: ${values.message}`,
  ].filter(Boolean).join("\n");

  if (status === "sent") {
    return (
      <div className="form" role="status" aria-live="polite">
        <div className="card">
          <div className="card__icon"><Icon name="check" /></div>
          <h3>Message sent</h3>
          <p>Thanks, {values.name.split(" ")[0] || "there"} — we&apos;ve received your message and will reply to <b>{values.email}</b> within one business day.</p>
          <div className="hero__actions" style={{ marginTop: 22 }}>
            <a className="btn btn--wa" href={waLink(whatsappText)} target="_blank" rel="noopener noreferrer"><Icon name="wa" /> Or continue on WhatsApp</a>
            <button className="btn" type="button" onClick={() => { setStatus("idle"); setValues((v) => ({ ...v, message: "" })); }}>Send another</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form className="form" id="contact-form" onSubmit={onSubmit} noValidate>
      <div className="form__row">
        <div className="field">
          <label htmlFor="name">Your name</label>
          <input id="name" name="name" type="text" autoComplete="name" placeholder="Full name" required minLength={2} maxLength={80} value={values.name} onChange={update("name")} />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required maxLength={120} value={values.email} onChange={update("email")} />
        </div>
      </div>
      <div className="form__row">
        <div className="field">
          <label htmlFor="phone">Phone / WhatsApp</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+92 3xx xxxxxxx" maxLength={40} value={values.phone} onChange={update("phone")} />
        </div>
        <div className="field">
          <label htmlFor="package">Package you&apos;re interested in</label>
          <select id="package" name="package" value={values.package} onChange={update("package")}>
            {PACKAGE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="message">About your brand</label>
        <textarea id="message" name="message" placeholder="What do you sell, which platforms are you on, and what would you like to change?" maxLength={2000} value={values.message} onChange={update("message")} />
      </div>
      {/* Honeypot — hidden from people, filled by bots */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={update("website")} />
      </div>
      <div className="form__actions">
        <button className="btn btn--primary" type="submit" disabled={status === "sending"}>
          <Icon name="send" /> {status === "sending" ? "Sending…" : "Send message"}
        </button>
        <a className="btn btn--wa" href={waLink(whatsappText)} target="_blank" rel="noopener noreferrer"><Icon name="wa" /> Send via WhatsApp instead</a>
      </div>
      <p className="form__status" aria-live="polite" style={status === "error" ? { color: "#ff6b8a" } : undefined}>
        {status === "error" ? error : ""}
      </p>
      <p className="form__note">We reply within one business day. Your details are only used to respond to your enquiry.</p>
    </form>
  );
}
