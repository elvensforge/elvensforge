import type { Metadata } from "next";
import { ProductShowcase } from "@/components/showcase";
import ProjectImage from "@/components/project-image";
import {
  ContactSection,
  SiteFooter,
  SiteHeader,
} from "@/components/site-shell";
import { heroImage } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Product Showcase | ElvensForge",
  "Explore ElvensForge LED miniature bases, accessories and custom creations. Discover the design, fabrication and illumination behind each category.",
  "/shop/",
);

export default function ShopPage() {
  return (
    <>
      <SiteHeader shopPage />
      <main id="main-content" tabIndex={-1}>
        <section className="hero shopHero" aria-labelledby="shop-hero-title">
          <div className="heroContent">
            <p className="eyebrow">
              <span className="statusLight" aria-hidden="true" /> ELVENSFORGE /
              PRODUCT SHOWCASE
            </p>
            <h1 id="shop-hero-title">
              Small scale.
              <br />
              <span>Infinite atmosphere.</span>
            </h1>
            <p className="heroDescription">
              Explore 3D-printed LED miniature bases, supporting accessories and
              custom creations. Discover the ideas and craft behind the work.
            </p>
            <div className="heroActions">
              <a className="primaryButton" href="#shop">
                Discover Our Products <span aria-hidden="true">↓</span>
              </a>
              <a
                className="secondaryButton"
                href="mailto:contact@elvensforge.com"
              >
                Discuss a Project <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <figure className="heroMedia">
            <div className="heroPhotoFrame">
              <ProjectImage
                image={heroImage}
                label="ElvensForge LED miniature project"
                hero
              />
            </div>
            <figcaption>
              <span>LIGHT / FORM / IMAGINATION</span>
              <span>
                {heroImage
                  ? "Original project photography"
                  : "Photo placeholder"}
              </span>
            </figcaption>
          </figure>
        </section>
        <ProductShowcase standalone />
        <ContactSection />
      </main>
      <SiteFooter shopPage />
    </>
  );
}
