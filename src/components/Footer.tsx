import Link from "next/link";
import Image from "next/image";
import { SERVICES, SITE } from "@/lib/site";
import { Icon, type IconName } from "./Icon";
import { WhatsAppLink } from "./WhatsAppLink";

export function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer__grid">
            <div className="footer__brand">
              <Image src="/img/logo/logo.svg" alt={SITE.name} width={142} height={44} style={{ height: 44, width: "auto" }} unoptimized />
              <p>Social media marketing and graphic design studio. We plan, design and manage the content that makes brands impossible to scroll past.</p>
              <div className="social" aria-label="Social media">
                {SITE.socials.map((s) => (
                  <a key={s.name} href={s.href} aria-label={s.name} target="_blank" rel="noopener noreferrer">
                    <Icon name={s.icon as IconName} />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4>Company</h4>
              <div className="footer__links">
                <Link href="/about">About us</Link>
                <Link href="/services">Services</Link>
                <Link href="/#packages">Packages</Link>
                <Link href="/work">Our work</Link>
                <Link href="/contact">Contact</Link>
              </div>
            </div>
            <div>
              <h4>Services</h4>
              <div className="footer__links">
                {SERVICES.map((s) => (
                  <Link key={s.id} href={`/services#${s.id}`}>{s.title}</Link>
                ))}
              </div>
            </div>
            <div>
              <h4>Contact</h4>
              <div className="footer__contact">
                <a href={`mailto:${SITE.email}`}><Icon name="mail" /><span>{SITE.email}</span></a>
                <WhatsAppLink><Icon name="wa" /><span>{SITE.phoneDisplay} (WhatsApp)</span></WhatsAppLink>
                <span style={{ display: "flex", gap: 10 }}><Icon name="pin" /><span>{SITE.location}</span></span>
              </div>
            </div>
          </div>
          <div className="footer__bottom">
            <span>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
            <div className="footer__legal">
              <Link href="/privacy-policy">Privacy policy</Link>
              <Link href="/terms">Terms &amp; conditions</Link>
            </div>
          </div>
        </div>
      </footer>
      <WhatsAppLink className="wa-float" aria-label="Chat with us on WhatsApp"><Icon name="wa" /></WhatsAppLink>
    </>
  );
}
