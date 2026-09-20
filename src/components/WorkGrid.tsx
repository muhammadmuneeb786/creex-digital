"use client";

import { useState } from "react";
import Image from "next/image";
import { WORK, WORK_FILTERS, type WorkCategory } from "@/lib/site";
import { Art, type ArtVariant } from "./Art";

const ART: Record<WorkCategory, ArtVariant> = { social: "posts", design: "design", reels: "reels", ads: "ads" };

export function WorkGrid() {
  const [filter, setFilter] = useState<WorkCategory | "all">("all");
  const items = WORK.filter((w) => filter === "all" || w.category === filter);

  return (
    <>
      <div className="filters" role="group" aria-label="Filter projects">
        {WORK_FILTERS.map((f) => (
          <button key={f.value} className="filter" type="button" aria-pressed={filter === f.value} onClick={() => setFilter(f.value)}>
            {f.label}
          </button>
        ))}
      </div>
      <div className="work-grid">
        {items.map((w, i) => (
          <article key={w.title} className="work-card reveal is-in no-anim" data-category={w.category} data-delay={i % 3}>
            {w.image ? (
              <div className="work-card__media"><Image src={w.image} alt={w.title} fill sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw" /></div>
            ) : (
              <div className="work-card__media work-card__media--placeholder"><Art variant={ART[w.category]} id={`w${i}`} /></div>
            )}
            <span className="work-card__tag">{w.tag}</span>
            <h3>{w.title}</h3>
            <p>{w.desc}</p>
          </article>
        ))}
      </div>
    </>
  );
}
