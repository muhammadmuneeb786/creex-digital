import Link from "next/link";
import { OrbitGraphic } from "@/components/Art";
import { Icon, type IconName } from "@/components/Icon";
import { CtaBand, Display, Eyebrow, Packages, PlatformChips, ProcessSteps } from "@/components/Sections";
import { Testimonials } from "@/components/Testimonials";
import { FAQS, SERVICES, SITE, WHY } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="hero grid-bg">
        <div className="container">
          <div className="hero__grid">
            <div>
              <Eyebrow>Social media marketing &amp; graphic design</Eyebrow>
              <h1 className="hero__title">Make your brand <Display>impossible to scroll past.</Display></h1>
              <p className="lead hero__lead">{SITE.name} plans, designs and manages your social media — posts, reels, ads and monthly reporting — so your brand shows up consistently and grows every month.</p>
              <div className="hero__actions">
                <Link className="btn btn--primary" href="/contact">Book a free consultation <Icon name="arrowUR" /></Link>
                <Link className="btn" href="/#packages">See packages <Icon name="arrowR" /></Link>
              </div>
              <div className="hero__platforms">
                <p>Platforms we manage</p>
                <PlatformChips />
              </div>
            </div>
            <div className="hero__visual"><OrbitGraphic /></div>
          </div>
        </div>
      </section>

      {/* Known for */}
      <section className="section" id="known-for">
        <div className="container">
          <div className="section-head reveal">
            <Eyebrow>What we&apos;re known for</Eyebrow>
            <h2 className="title">Two things, done <Display>properly.</Display></h2>
            <p className="lead">Most agencies spread themselves across everything. We focus on the two disciplines that decide whether a brand gets noticed online — and we do them in-house.</p>
          </div>
          <div className="grid grid--2">
            <article className="pillar reveal">
              <span className="pillar__num" aria-hidden="true">01</span>
              <div className="pillar__icon"><Icon name="megaphone" /></div>
              <h3>Social Media Marketing</h3>
              <p>Strategy, a monthly content planner, scheduled posting, ads management and reporting — one team running your accounts from plan to performance.</p>
              <div className="chips"><span className="chip">Content planner</span><span className="chip">Posting schedule</span><span className="chip">Ads management</span><span className="chip">Monthly reports</span></div>
            </article>
            <article className="pillar reveal" data-delay={1}>
              <span className="pillar__num" aria-hidden="true">02</span>
              <div className="pillar__icon"><Icon name="palette" /></div>
              <h3>Graphic Designing</h3>
              <p>Designed static posts, animated and edited reels, cover designs for every platform, and branded templates that keep your feed consistent.</p>
              <div className="chips"><span className="chip">Static posts</span><span className="chip">Reels</span><span className="chip">Cover designs</span><span className="chip">Branded templates</span></div>
            </article>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section section--alt" id="services">
        <div className="container">
          <div className="section-head reveal">
            <Eyebrow>Services</Eyebrow>
            <h2 className="title">Everything your feed needs, <Display>every month.</Display></h2>
            <p className="lead">Each service below is part of our packages — and available on its own when you need a specific job done.</p>
          </div>
          <div className="grid grid--3">
            {SERVICES.map((s, i) => (
              <article key={s.id} className="card reveal" data-delay={i % 3}>
                <div className="card__icon"><Icon name={s.icon as IconName} /></div>
                <h3>{s.title}</h3>
                <p>{s.short}</p>
                <ul>{s.shortPoints.map((x) => <li key={x}>{x}</li>)}</ul>
              </article>
            ))}
          </div>
          <p style={{ marginTop: 32 }} className="reveal">
            <Link className="link-arrow" href="/services">Explore all services in detail <Icon name="arrowUR" /></Link>
          </p>
        </div>
      </section>

      <Packages />

      {/* Process */}
      <section className="section section--alt" id="process">
        <div className="container">
          <div className="section-head reveal">
            <Eyebrow>How we work</Eyebrow>
            <h2 className="title">From first call to <Display>monthly report.</Display></h2>
            <p className="lead">A simple, repeatable rhythm. You always know what&apos;s being posted, when, and why.</p>
          </div>
          <ProcessSteps />
        </div>
      </section>

      {/* Why */}
      <section className="section" id="why">
        <div className="container">
          <div className="why">
            <div className="section-head reveal">
              <Eyebrow>Why Creex</Eyebrow>
              <h2 className="title">Consistency is the <Display>whole strategy.</Display></h2>
              <p className="lead">Virality is luck. Showing up every week with content that looks like your brand is a system — and that&apos;s what we build for you.</p>
              <div className="hero__actions"><Link className="btn btn--primary" href="/about">More about us <Icon name="arrowUR" /></Link></div>
            </div>
            <div className="why__list">
              {WHY.map(([icon, t, d], i) => (
                <div key={t} className="why__item reveal" data-delay={i % 3}>
                  <Icon name={icon as IconName} />
                  <div><h3>{t}</h3><p>{d}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section--alt" id="testimonials">
        <div className="container">
          <div className="section-head reveal">
            <Eyebrow>Client feedback</Eyebrow>
            <h2 className="title">What clients <Display>say.</Display></h2>
          </div>
          <Testimonials />
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq">
        <div className="container">
          <div className="section-head section-head--center reveal">
            <Eyebrow center>FAQs</Eyebrow>
            <h2 className="title">Questions, <Display>answered.</Display></h2>
          </div>
          <div className="faq reveal">
            {FAQS.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <div className="faq__body">{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
