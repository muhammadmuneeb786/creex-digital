import type { Metadata } from "next";
import { Icon, type IconName } from "@/components/Icon";
import { Breadcrumb, CtaBand, Display, Eyebrow, ProcessSteps } from "@/components/Sections";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `${SITE.name} is a social media marketing and graphic design studio. Learn how we think about content, consistency and design.`,
  alternates: { canonical: "/about" },
};

const PRINCIPLES: [IconName, string, string][] = [
  ["calendar", "Consistency beats virality", "One viral post doesn't build a brand. A planned, designed month of content — every month — does."],
  ["sparkle", "Design is the message", "People decide in a scroll. If the visual doesn't look like your brand, the caption never gets read."],
  ["chart", "Numbers over noise", "We report on what actually moved — reach, engagement, leads — and change the plan based on it."],
  ["wallet", "Clear budgets", "Management fees and ad spend are always separate and always agreed with you first."],
];

export default function AboutPage() {
  return (
    <>
      <section className="page-hero grid-bg">
        <div className="container">
          <Breadcrumb current="About" />
          <div className="section-head">
            <Eyebrow>About {SITE.name}</Eyebrow>
            <h1 className="title">A studio built for <Display>consistent brands.</Display></h1>
            <p className="lead">We&apos;re a social media marketing and graphic design studio. We believe the brands that win online aren&apos;t the loudest — they&apos;re the ones that show up every week looking like themselves.</p>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="grid grid--2">
            <article className="pillar reveal">
              <span className="pillar__num" aria-hidden="true">01</span>
              <div className="pillar__icon"><Icon name="megaphone" /></div>
              <h3>Social Media Marketing</h3>
              <p>Planning, posting, ads and reporting for Facebook, Instagram and the platforms your customers actually use.</p>
            </article>
            <article className="pillar reveal" data-delay={1}>
              <span className="pillar__num" aria-hidden="true">02</span>
              <div className="pillar__icon"><Icon name="palette" /></div>
              <h3>Graphic Designing</h3>
              <p>Posts, reels, covers and templates designed in-house so every piece of content is unmistakably yours.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section-head reveal">
            <Eyebrow>How we think</Eyebrow>
            <h2 className="title">Four principles behind <Display>every account we run.</Display></h2>
          </div>
          <div className="grid grid--4">
            {PRINCIPLES.map(([icon, t, d], i) => (
              <article key={t} className="card reveal" data-delay={i % 3}>
                <div className="card__icon"><Icon name={icon} /></div>
                <h3>{t}</h3>
                <p>{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <Eyebrow>How we work</Eyebrow>
            <h2 className="title">A monthly rhythm you can <Display>rely on.</Display></h2>
          </div>
          <ProcessSteps short />
        </div>
      </section>

      <CtaBand title={<>Let&apos;s build your brand&apos;s <Display>next month.</Display></>} />
    </>
  );
}
