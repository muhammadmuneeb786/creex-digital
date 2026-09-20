import type { Metadata } from "next";
import { Breadcrumb, CtaBand, Display, Eyebrow } from "@/components/Sections";
import { WorkGrid } from "@/components/WorkGrid";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Work",
  description: `Selected social media content, reels, ad campaigns and graphic design work by ${SITE.name}.`,
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <section className="page-hero grid-bg">
        <div className="container">
          <Breadcrumb current="Our work" />
          <div className="section-head">
            <Eyebrow>Our work</Eyebrow>
            <h1 className="title">Content that looks like <Display>the brand it&apos;s for.</Display></h1>
            <p className="lead">A selection of social media content, reels, campaigns and design work. Filter by type.</p>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <WorkGrid />
        </div>
      </section>

      <CtaBand title={<>Want your brand <Display>on this page?</Display></>} />
    </>
  );
}
