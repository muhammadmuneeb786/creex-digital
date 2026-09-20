import type { ReactNode } from "react";
import { Breadcrumb, Eyebrow } from "./Sections";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumb current={title} />
          <div className="section-head">
            <Eyebrow>Legal</Eyebrow>
            <h1 className="title">{title}</h1>
          </div>
        </div>
      </section>
      <section className="section section--tight">
        <div className="container">
          <div className="prose">
            <p className="meta">Last updated: {updated}</p>
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
