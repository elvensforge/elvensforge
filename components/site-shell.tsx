import Link from "next/link";
import { legalLinks, socialProfiles } from "@/lib/content";

export function SiteHeader({ shopPage = false }: { shopPage?: boolean }) {
  return (
    <header className="siteHeader">
      <nav className="navigation siteNavigation" aria-label="Main navigation">
        <Link className="brand" href="/" aria-label="ElvensForge home">
          ELVENSFORGE
        </Link>
        <div className="navigationLinks">
          <Link href={shopPage ? "/#creations" : "#creations"}>Creations</Link>
          <Link href={shopPage ? "/#about" : "#about"}>About</Link>
          <Link href={"#shop"} aria-current={shopPage ? "page" : undefined}>
            Shop
          </Link>
        </div>
        <a className="navigationButton" href="mailto:contact@elvensforge.com">
          Get in touch <span aria-hidden="true">↗</span>
        </a>
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
          <span aria-hidden="true">↗</span>
          <span className="visuallyHidden"> (opens in a new tab)</span>
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
          <p className="eyebrow">LET’S CREATE SOMETHING EXTRAORDINARY</p>
          <h2 id="contact-title">Bring Your Vision to Life</h2>
          <p>
            Discover our latest creations, follow the development process, or
            get in touch to discuss your next miniature project.
          </p>
        </div>
        <div className="contactActions">
          <a className="primaryButton" href="mailto:contact@elvensforge.com">
            Contact the Forge <span aria-hidden="true">↗</span>
          </a>
          <a className="contactEmail" href="mailto:contact@elvensforge.com">
            contact@elvensforge.com
          </a>
          <SocialLinks />
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
          <p>
            Art. Craft. Technology.
            <br />
            Extraordinary tabletop worlds.
          </p>
        </div>
        <nav className="footerNavigation" aria-label="Footer navigation">
          <Link href={shopPage ? "/#creations" : "#creations"}>Creations</Link>
          <Link href={shopPage ? "/#about" : "#about"}>About</Link>
          <Link href={"#shop"}>Shop</Link>
        </nav>
        <div className="footerContact">
          <a href="mailto:contact@elvensforge.com">contact@elvensforge.com</a>
          <SocialLinks />
        </div>
      </div>
      <div className="footerBottom">
        <p>© {new Date().getFullYear()} ElvensForge</p>
        {legalLinks.length > 0 && (
          <nav className="legalLinks" aria-label="Legal information">
            {legalLinks.map((link) => (
              <a href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </footer>
  );
}
