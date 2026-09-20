import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RevealInit } from "@/components/Reveal";
import { SITE } from "@/lib/site";
import "./globals.css";

const poppins = localFont({
  variable: "--font-poppins",
  display: "swap",
  src: [
    { path: "../fonts/Poppins-Light.woff2", weight: "300", style: "normal" },
    { path: "../fonts/Poppins-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Poppins-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Poppins-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/Poppins-Bold.woff2", weight: "700", style: "normal" },
  ],
});

const anton = localFont({
  variable: "--font-anton",
  display: "swap",
  src: "../fonts/Anton-Regular.woff2",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — Social Media Marketing & Graphic Design`, template: `%s — ${SITE.name}` },
  description: SITE.description,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — Social Media Marketing & Graphic Design`,
    description: SITE.description,
    images: [{ url: "/img/logo/logo-stacked.png", width: 892, height: 788, alt: SITE.name }],
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }, { url: "/img/favicon/favicon.svg", type: "image/svg+xml" }],
    apple: "/img/favicon/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0f",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${anton.variable}`}>
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <RevealInit />
      </body>
    </html>
  );
}
