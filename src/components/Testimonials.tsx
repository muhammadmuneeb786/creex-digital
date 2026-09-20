"use client";

import { useRef } from "react";
import { TESTIMONIALS } from "@/lib/site";
import { Icon } from "./Icon";

export function Testimonials() {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const step = el.firstElementChild ? el.firstElementChild.getBoundingClientRect().width + 18 : 320;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
  };
  const initials = (n: string) => n.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <>
      <div className="testimonials" ref={track}>
        {TESTIMONIALS.map((t, i) => (
          <article key={i} className="card testimonial reveal" data-delay={i}>
            <p className="testimonial__quote">{t.quote}</p>
            <div className="testimonial__who">
              <span className="testimonial__avatar" aria-hidden="true">{initials(t.name)}</span>
              <div><b>{t.name}</b><span>{t.role}</span></div>
            </div>
          </article>
        ))}
      </div>
      <div className="carousel-nav">
        <button className="icon-btn" type="button" aria-label="Previous testimonial" onClick={() => scroll(-1)}><Icon name="chevL" /></button>
        <button className="icon-btn" type="button" aria-label="Next testimonial" onClick={() => scroll(1)}><Icon name="chevR" /></button>
      </div>
    </>
  );
}
