import type { Metadata } from "next";
import ProjectImage from "@/components/project-image";
import { CreationsGallery, ProductShowcase } from "@/components/showcase";
import {
  ContactSection,
  SiteFooter,
  SiteHeader,
} from "@/components/site-shell";
import { heroImage, pillars, siteDescription } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "ElvensForge | LED Miniature Bases & Custom Creations",
  siteDescription,
  "/",
);

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <section className="hero" aria-labelledby="hero-title">
          <div className="heroContent">
            <p className="eyebrow">
              <span className="statusLight" aria-hidden="true" /> ART · CRAFT ·
              TECHNOLOGY
            </p>
            <h1 id="hero-title">
              Forge Worlds.
              <br />
              <span>Create Legends.</span>
            </h1>
            <p className="heroDescription">{siteDescription}</p>
            <div className="heroActions">
              <a className="primaryButton" href="#creations">
                Explore Creations <span aria-hidden="true">↗</span>
              </a>
              <a className="secondaryButton" href="#shop">
                Discover Our Products <span aria-hidden="true">↓</span>
              </a>
            </div>
            <p className="heroFootnote">
              LED illumination. Digital fabrication. Original imagination.
            </p>
          </div>
          <figure className="heroMedia">
            <div className="heroPhotoFrame">
              <ProjectImage
                image={heroImage}
                label="Illuminated ElvensForge miniature"
                hero
              />
            </div>
            <figcaption>
              <span>ELVENSFORGE / IN THE WORKSHOP</span>
              <span>
                {heroImage
                  ? "Original project photography"
                  : "Photo placeholder"}
              </span>
            </figcaption>
          </figure>
        </section>
        <CreationsGallery />
        <ProductShowcase />
        <section
          className="aboutSection"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="aboutIntroduction">
            <div>
              <p className="eyebrow">03 / ABOUT THE FORGE</p>
              <h2 id="about-title">
                Where Art
                <br />
                Meets Engineering
              </h2>
            </div>
            <p>
              ElvensForge brings together digital fabrication, miniature
              painting, electronics, and creative design to build unique
              accessories for tabletop worlds. From precision-designed LED bases
              to experimental illuminated creations, every project explores new
              ways to make miniatures extraordinary.
            </p>
          </div>
          <div className="pillarsGrid">
            {pillars.map((pillar, index) => (
              <article key={pillar.name}>
                <span className="featureNumber" aria-hidden="true">
                  0{index + 1}
                </span>
                <h3>{pillar.name}</h3>
                <p>{pillar.description}</p>
              </article>
            ))}
          </div>
        </section>
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
