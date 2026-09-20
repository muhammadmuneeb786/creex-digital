"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Reveal-on-scroll for elements with the `.reveal` class.
 * Elements already in view are shown instantly (no flash); the rest fade in
 * when scrolled to. Re-runs on every route change.
 */
export function RevealInit() {
  const pathname = usePathname();
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.is-in)"));
    if (!els.length) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("no-anim", "is-in"));
      return;
    }
    document.documentElement.classList.add("js");
    const vh = window.innerHeight;
    const pending = els.filter((el) => {
      if (el.getBoundingClientRect().top < vh) {
        el.classList.add("no-anim", "is-in");
        return false;
      }
      return true;
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-in");
            io.unobserve(en.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    pending.forEach((el) => io.observe(el));
    // Safety net: never leave content hidden
    const t = window.setTimeout(() => {
      pending.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-in");
      });
    }, 1500);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, [pathname]);
  return null;
}
