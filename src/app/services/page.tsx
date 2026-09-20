import type { Metadata } from "next";
import Link from "next/link";
import { Art } from "@/components/Art";
import { Icon } from "@/components/Icon";
import { Breadcrumb, CtaBand, Display, Eyebrow, PlatformChips } from "@/components/Sections";
import { SERVICES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: "Social media management, content creation, ads management, content planning, graphic design and reporting — the services inside every Creex Digital package.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero grid-bg">
        <div className="container">
          <Breadcrumb current="Services" />
          <div className="section-head">
            <Eyebrow>Services</Eyebrow>
            <h1 className="title">Everything your feed needs, <Display>every month.</Display></h1>
            <p className="lead">Six services, one team. Each is part of our monthly packages, and each is available on its own for one-off projects.</p>
          </div>
          <PlatformChips />
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          {SERVICES.map((s) => (
            <div key={s.id} className="service-row reveal" id={s.id}>
              <div>
                <Eyebrow>{s.included}</Eyebrow>
                <h2>{s.title}</h2>
                <p>{s.long}</p>
                <ul>{s.longPoints.map((x) => <li key={x}>{x}</li>)}</ul>
                <div className="hero__actions" style={{ marginTop: 26 }}>
                  <Link className="btn btn--primary btn--sm" href="/contact">Get a quote <Icon name="arrowUR" /></Link>
                  <Link className="btn btn--ghost btn--sm" href="/#packages">Compare packages <Icon name="arrowR" /></Link>
                </div>
              </div>
              <div className="service-row__art"><Art variant={s.art} id={s.id} /></div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        title={<>Not sure which service <Display>you need?</Display></>}
        lead="Tell us about your brand and where you post today. We'll recommend a package — or a one-off project — that fits."
      />
    </>
  );
}
