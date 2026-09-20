import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/ContactForm";
import { Icon } from "@/components/Icon";
import { Breadcrumb, Display, Eyebrow } from "@/components/Sections";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Book a free consultation with ${SITE.name}. Tell us about your brand and we'll recommend a social media package.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero grid-bg">
        <div className="container">
          <Breadcrumb current="Contact" />
          <div className="section-head">
            <Eyebrow>Contact</Eyebrow>
            <h1 className="title">Let&apos;s plan your <Display>next month.</Display></h1>
            <p className="lead">Tell us about your brand and where you post today. We&apos;ll reply with a recommendation and a clear quote — no ad budget surprises.</p>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="contact">
            {/* useSearchParams (package preselect) needs a Suspense boundary */}
            <Suspense fallback={<div className="form" aria-busy="true" />}>
              <ContactForm />
            </Suspense>

            <aside className="contact-cards reveal" data-delay={1}>
              <div className="card contact-card">
                <div className="card__icon"><Icon name="wa" /></div>
                <div><h3>WhatsApp</h3><WhatsAppLink>{SITE.phoneDisplay}</WhatsAppLink><p>Fastest way to reach us.</p></div>
              </div>
              <div className="card contact-card">
                <div className="card__icon"><Icon name="mail" /></div>
                <div><h3>Email</h3><a href={`mailto:${SITE.email}`}>{SITE.email}</a><p>We reply within one business day.</p></div>
              </div>
              <div className="card contact-card">
                <div className="card__icon"><Icon name="pin" /></div>
                <div><h3>Location</h3><p>{SITE.location}</p><p>Working with brands across Pakistan and remotely worldwide.</p></div>
              </div>
              <div className="card contact-card">
                <div className="card__icon"><Icon name="calendar" /></div>
                <div><h3>Free consultation</h3><p>A 20-minute call to review your accounts and recommend a package.</p></div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
