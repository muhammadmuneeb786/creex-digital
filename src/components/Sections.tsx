import Link from "next/link";
import type { ReactNode } from "react";
import { PACKAGES, PLATFORMS, PROCESS, SITE } from "@/lib/site";
import { Icon, type IconName } from "./Icon";
import { WhatsAppLink } from "./WhatsAppLink";

/** Gradient display type (Anton) — the "Packages" treatment from the brand deck. */
export const Display = ({ children }: { children: ReactNode }) => <span className="display">{children}</span>;

export function Eyebrow({ children, center }: { children: ReactNode; center?: boolean }) {
  return <span className="eyebrow" style={center ? { justifyContent: "center" } : undefined}>{children}</span>;
}

export function PlatformChips() {
  return (
    <div className="chips">
      {PLATFORMS.map((p) => (
        <span key={p.name} className="chip"><Icon name={p.icon as IconName} />{p.name}</span>
      ))}
    </div>
  );
}

export function Breadcrumb({ current }: { current: string }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <Link href="/">Home</Link><span>/</span><span>{current}</span>
    </nav>
  );
}

export function CtaBand({ title, lead }: { title?: ReactNode; lead?: string }) {
  return (
    <section className="section section--tight">
      <div className="container">
        <div className="cta reveal">
          <Eyebrow>Let&apos;s talk</Eyebrow>
          <h2 className="title">{title ?? <>Ready to make your brand <Display>impossible to ignore?</Display></>}</h2>
          <p className="lead">{lead ?? "Book a free consultation. We'll look at your current pages, tell you what we'd change, and recommend the package that fits."}</p>
          <div className="cta__actions">
            <Link className="btn btn--primary" href="/contact">Book a free consultation <Icon name="arrowUR" /></Link>
            <WhatsAppLink className="btn btn--wa"><Icon name="wa" /> Chat on WhatsApp</WhatsAppLink>
          </div>
        </div>
      </div>
    </section>
  );
}

const PROCESS_SHORT = [
  "Brand, audience, goals, platforms — and a package recommendation.",
  "A content calendar for approval before anything is posted.",
  "Posts, reels, covers and ad creatives made to your brand.",
  "Scheduled posting, account management and agreed ad campaigns.",
  "A performance report that shapes next month's planner.",
];

export function ProcessSteps({ short }: { short?: boolean }) {
  return (
    <ol className="steps">
      {PROCESS.map(([t, d], i) => (
        <li key={t} className="step reveal" data-delay={i % 3}>
          <h3>{t}</h3>
          <p>{short ? PROCESS_SHORT[i] : d}</p>
        </li>
      ))}
    </ol>
  );
}

export function Packages() {
  return (
    <section className="section grid-bg" id="packages">
      <div className="container">
        <div className="section-head section-head--center reveal">
          <Eyebrow center>Social media management</Eyebrow>
          <h2 className="title"><Display>Packages</Display><br />by {SITE.name}</h2>
          <p className="lead">Three monthly plans. Every plan includes account management for Facebook and Instagram, a monthly content planner and designed content — pick the posting rhythm that matches your ambition.</p>
        </div>
        <div className="packages">
          {PACKAGES.map((p, i) => (
            <article key={p.id} className={`pkg${p.featured ? " pkg--featured" : ""} reveal`} data-delay={i} id={`pkg-${p.id}`}>
              <div className="pkg__head">
                <div>
                  <h3 className="pkg__name">{p.name}</h3>
                  <div className="pkg__kicker">{p.fit}</div>
                </div>
              </div>
              <div className="pkg__price">
                <span className="cur">Rs.</span><span className="amt display">{p.price}</span><span className="per">/ month</span>
              </div>
              <div className="pkg__cta">
                <Link className={`btn ${p.featured ? "btn--primary " : ""}btn--block`} href={`/contact?package=${p.id}`}>
                  Start with {p.name} <Icon name="arrowUR" />
                </Link>
              </div>
              <div className="pkg__groups">
                {p.groups.map(([g, items]) => (
                  <div key={g} className="pkg__group">
                    <h4>{g}</h4>
                    <ul>{items.map((t) => <li key={t}>{t}</li>)}</ul>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
        <p className="packages-note reveal">
          <strong>Ad budget is not included</strong> and will be decided separately. Need something custom?{" "}
          <Link className="link-arrow" href="/contact">Ask for a tailored plan <Icon name="arrowUR" /></Link>
        </p>
      </div>
    </section>
  );
}
