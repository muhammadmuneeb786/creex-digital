"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV, SITE } from "@/lib/site";
import { Icon } from "./Icon";
import { WhatsAppLink } from "./WhatsAppLink";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer on route change, Escape, or when the viewport grows past the breakpoint
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 1025px)");
    const onMq = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.body.classList.remove("nav-open");
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  const isCurrent = (href: string) => href !== "/#packages" && (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className={`header${scrolled ? " is-scrolled" : ""}`}>
        <div className="container header__inner">
          <Link className="header__logo" href="/" aria-label={`${SITE.name} — home`}>
            <Image src="/img/logo/logo.svg" alt={SITE.name} width={129} height={40} style={{ height: 40, width: "auto" }} priority unoptimized />
          </Link>
          <nav className="nav" id="nav" aria-label="Main">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} aria-current={isCurrent(item.href) ? "page" : undefined} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <div className="nav__cta">
              <Link className="btn btn--primary" href="/contact" onClick={() => setOpen(false)}>Get a quote <Icon name="arrowUR" /></Link>
            </div>
          </nav>
          <div className="header__actions">
            <WhatsAppLink className="icon-btn icon-btn--wa" aria-label="Chat on WhatsApp"><Icon name="wa" /></WhatsAppLink>
            <Link className="btn btn--primary btn--sm" href="/contact">Get a quote <Icon name="arrowUR" /></Link>
            <button className="nav-toggle" type="button" aria-expanded={open} aria-controls="nav" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((v) => !v)}>
              <span />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
