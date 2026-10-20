import Link from "next/link";
import { legalLinks, socialProfiles } from "@/lib/content";
import MobileNavigation from "./mobile-navigation";

export function SiteHeader({ shopPage = false }: { shopPage?: boolean }) {
  return (
    <header className="siteHeader">
      <nav className="navigation siteNavigation" aria-label="Main navigation">
        <Link className="brand" href="/" aria-label="ElvensForge home">
          ELVENSFORGE
        </Link>
        <MobileNavigation shopPage={shopPage} />
      </nav>
    </header>
  );
}
export function SocialLinks() {
  const configured = Object.entries(socialProfiles).filter(([, url]) => {
    try {
      return new URL(url).protocol === "https:";
    } catch {
      return false;
    }
  });
  if (!configured.length) return null;
  return (
    <nav className="socialLinks" aria-label="Official social channels">
      {configured.map(([name, url]) => (
        <a key={name} href={url} target="_blank" rel="noopener noreferrer">
          {name}
          <span className="visuallyHidden"> (opens in a new tab)</span>
          <span aria-hidden="true">↗</span>
        </a>
      ))}
    </nav>
  );
}
export function ContactSection() {
  return (
    <section
      className="communitySection"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="communityPanel">
        <div>
          <p className="eyebrow">YOUR NEXT CHAPTER</p>
          <h2 id="contact-title">Your Next Creation Deserves to Shine.</h2>
          <p>
            Discover lighting solutions designed to turn your next miniature
            project into something unforgettable.
          </p>
        </div>
        <div className="contactActions">
          <Link className="primaryButton" href="/shop/">
            Explore the Shop <span aria-hidden="true">↗</span>
          </Link>
          <a className="contactEmail" href="mailto:contact@elvensforge.com">
            contact@elvensforge.com
          </a>
        </div>
      </div>
    </section>
  );
}
export function SiteFooter({ shopPage = false }: { shopPage?: boolean }) {
  return (
    <footer className="siteFooter">
      <div className="footerMain">
        <div>
          <Link className="brand" href="/">
            ELVENSFORGE
          </Link>
          <p className="footerSignature">Forge Worlds. Create Legends.</p>
          <p>Art · Craft · Technology</p>
        </div>
        <nav className="footerNavigation" aria-label="Footer navigation">
          <Link href="/shop/">Shop</Link>
          <Link href={shopPage ? "/#about" : "#about"}>About</Link>
          <a href="mailto:contact@elvensforge.com">Contact</a>
        </nav>
        <div className="footerContact">
          <a href="mailto:contact@elvensforge.com">contact@elvensforge.com</a>
          <SocialLinks />
        </div>
      </div>
      <div className="footerPolicies">
        <nav
          className="legalLinks"
          aria-label="Commercial and legal information"
        >
          {legalLinks.map((link) =>
            link.href ? (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ) : (
              <span
                key={link.label}
                className="unavailableLink"
                role="link"
                aria-disabled="true"
              >
                {link.label}
                <span className="visuallyHidden"> — not published yet</span>
              </span>
            ),
          )}
        </nav>
        {legalLinks.some((link) => !link.href) && (
          <p>Policy links will be enabled when published.</p>
        )}
      </div>
      <div className="footerBottom">
        <p>© {new Date().getFullYear()} ElvensForge</p>
      </div>
    </footer>
  );
}
