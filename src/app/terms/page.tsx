import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms and conditions for using the ${SITE.name} website and services.`,
  alternates: { canonical: "/terms" },
};

// TODO: generic template — have it reviewed before going live.
export default function TermsPage() {
  return (
    <LegalPage title="Terms & conditions" updated="20 September 2026">
      <p>These terms apply to your use of this website and to services provided by {SITE.name}. By using the website or engaging our services you agree to them.</p>
      <h2>Packages and pricing</h2>
      <p>Package prices shown on this website are monthly fees for the work described in each package. <strong>Ad budget is not included</strong> in any package and is agreed separately before campaigns run. Prices may change; the price agreed in your proposal or invoice applies to your engagement.</p>
      <h2>Scope of work</h2>
      <p>Each package includes the posting schedule, content volume, ad support, planning, account management, bonus platforms and reporting listed for it. Work beyond that scope is quoted separately.</p>
      <h2>Content and approvals</h2>
      <p>We prepare a monthly content planner for your approval. You are responsible for reviewing planners and content within a reasonable time and for the accuracy of information you provide about your business, products and offers.</p>
      <h2>Account access</h2>
      <p>To manage your accounts you grant us the access required (for example page or ad-account roles). You remain the owner of your accounts, pages and ad accounts at all times.</p>
      <h2>Intellectual property</h2>
      <p>On payment of the applicable fees, content we create for you is licensed to you for use on your channels. Our design tools, templates and working files remain ours unless agreed otherwise in writing. We may show work we produced for you in our portfolio unless you ask us not to.</p>
      <h2>Payment</h2>
      <p>Fees are invoiced monthly in advance unless otherwise agreed. Ad spend is paid directly to the platform or invoiced separately as agreed.</p>
      <h2>Liability</h2>
      <p>We work to industry standards but cannot guarantee specific results such as follower counts, reach or sales, which depend on factors outside our control including platform algorithms and ad budgets. Our liability for any claim is limited to the fees paid for the month in which the claim arose.</p>
      <h2>Contact</h2>
      <p>Questions about these terms can be sent to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
    </LegalPage>
  );
}
