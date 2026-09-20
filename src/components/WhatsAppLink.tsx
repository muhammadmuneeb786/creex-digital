import type { AnchorHTMLAttributes, ReactNode } from "react";
import { waLink } from "@/lib/site";

/** Anchor that opens a WhatsApp chat with the studio's number (from lib/site.ts). */
export function WhatsAppLink({ text, children, ...rest }: { text?: string; children: ReactNode } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a href={waLink(text)} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}
