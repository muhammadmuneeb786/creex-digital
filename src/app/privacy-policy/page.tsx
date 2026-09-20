import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE.name} handles the information you share with us.`,
  alternates: { canonical: "/privacy-policy" },
};

// TODO: generic template — have it reviewed before going live.
export default function PrivacyPage() {
  const mail = <a href={`mailto:${SITE.email}`}>{SITE.email}</a>;
  return (
    <LegalPage title="Privacy policy" updated="20 September 2026">
      <p>{SITE.name} (&quot;we&quot;, &quot;us&quot;) respects your privacy. This policy explains what information we collect through this website, how we use it and the choices you have.</p>
      <h2>Information we collect</h2>
      <p>When you submit the contact form, the details you enter — typically your name, email address, phone number, the package you&apos;re interested in and your message — are emailed to us so we can respond. The website itself does not keep a copy in a database.</p>
      <h2>How we use it</h2>
      <ul>
        <li>To reply to your enquiry and prepare a recommendation or quote.</li>
        <li>To deliver services you have engaged us for.</li>
        <li>To keep records of our correspondence as required by law.</li>
      </ul>
      <h2>Cookies and analytics</h2>
      <p>This website does not set tracking cookies of its own. If we add analytics or embedded content (for example social media embeds) in future, those services may set their own cookies under their own policies, and this page will be updated.</p>
      <h2>Sharing</h2>
      <p>We do not sell your information. We share it only with service providers we use to deliver our work (for example our email provider) and where required by law.</p>
      <h2>Your rights</h2>
      <p>You can ask us to update or delete information we hold about you at any time by contacting {mail}.</p>
      <h2>Contact</h2>
      <p>Questions about this policy can be sent to {mail}.</p>
    </LegalPage>
  );
}
