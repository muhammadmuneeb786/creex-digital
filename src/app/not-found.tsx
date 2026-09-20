import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Eyebrow } from "@/components/Sections";

export default function NotFound() {
  return (
    <section className="notfound grid-bg">
      <div className="container">
        <Eyebrow center>Error</Eyebrow>
        <h1 className="display">404</h1>
        <p>That page has drifted out of orbit. Let&apos;s get you back to something useful.</p>
        <div className="hero__actions" style={{ marginTop: 28 }}>
          <Link className="btn btn--primary" href="/">Back to home <Icon name="arrowUR" /></Link>
          <Link className="btn" href="/#packages">See packages <Icon name="arrowR" /></Link>
        </div>
      </div>
    </section>
  );
}
