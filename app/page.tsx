import type { Metadata } from "next";
import Link from "next/link";
import ProjectImage from "@/components/project-image";
import { ProductShowcase } from "@/components/showcase";
import {
  ContactSection,
  SiteFooter,
  SiteHeader,
} from "@/components/site-shell";
import { pillars, siteDescription } from "@/lib/content";
import { homeMedia, steps, gallery } from "@/lib/home-content";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "ElvensForge | LED Bases for Tabletop Miniatures",
  siteDescription,
  "/",
);
export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="heroContent">
            <p className="eyebrow">ART · CRAFT · TECHNOLOGY</p>
            <h1 id="hero-title">
              Bring Your
              <br />
              Miniatures
              <br />
              <span>to Life.</span>
            </h1>
            <p className="heroDescription">
              Transform your tabletop miniatures with custom 3D-printed LED
              bases. Designed to create extraordinary visual effects without
              complicated installations.
            </p>
            <div className="heroActions">
              <Link className="primaryButton" href="/shop/">
                Shop LED Bases <span aria-hidden="true">↗</span>
              </Link>
              <a className="secondaryButton" href="#transformation">
                See Them in Action <span aria-hidden="true">↓</span>
              </a>
            </div>
            <p className="heroFootnote">Forge Worlds. Create Legends.</p>
          </div>
          <figure className="heroMedia">
            <div className="heroPhotoFrame">
              <ProjectImage
                image={homeMedia.hero}
                mobileImage={homeMedia.mobileHero}
                label="Void Dragon / Nightbringer original photograph"
                hero
              />
            </div>
            <figcaption>
              <span>ELVENSFORGE / LED-READY BASES</span>
              <span>
                {homeMedia.hero || homeMedia.mobileHero
                  ? "ElvensForge supplied imagery"
                  : "Original photo pending"}
              </span>
            </figcaption>
          </figure>
        </section>
        <section
          className="productIntroduction"
          id="led-bases"
          aria-labelledby="introduction-title"
        >
          <div className="introductionMedia">
            <ProjectImage
              image={homeMedia.base}
              label="Miniature base with lighting system visible"
            />
          </div>
          <div className="introductionContent">
            <p className="eyebrow">THE ART OF ILLUMINATION</p>
            <h2 id="introduction-title">
              Small Bases.
              <br />
              Extraordinary Impact.
            </h2>
            <p>
              A great miniature deserves more than an ordinary base. Our
              LED-ready designs bring light, atmosphere and personality to your
              tabletop creations.
            </p>
            <Link className="textLink" href="/shop/">
              Explore LED-ready bases <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
        <section
          className="processSection"
          id="how-it-works"
          aria-labelledby="process-title"
        >
          <div className="sectionHeading">
            <div>
              <p className="eyebrow">FROM DESIGN TO ILLUMINATION</p>
              <h2 id="process-title">
                Designed to Make
                <br />
                Lighting Simple.
              </h2>
            </div>
            <p>
              A considered base design creates space for light. Follow the
              process from choosing a design to revealing the finished effect.
            </p>
          </div>
          <div className="processGrid">
            {steps.map((step, index) => (
              <article className="processCard" key={step.title}>
                <ProjectImage image={step.image} label={step.label} />
                <div className="processCaption">
                  <span className="featureNumber">0{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="sectionNote processNote">
            Installation requirements and miniature compatibility depend on the
            individual design. Confirm the specifications before planning your
            build.
          </p>
        </section>
        <ProductShowcase />
        <section
          className="transformationSection"
          id="transformation"
          aria-labelledby="transformation-title"
        >
          <div className="sectionHeading">
            <div>
              <p className="eyebrow">THE TRANSFORMATION</p>
              <h2 id="transformation-title">
                From Ordinary
                <br />
                to Extraordinary.
              </h2>
            </div>
            <p>
              See how carefully placed lighting can transform the atmosphere,
              details and presence of your miniatures.
            </p>
          </div>
          <div className="transformationGrid">
            <figure>
              <ProjectImage
                image={homeMedia.transformationDetail}
                label="Original miniature detail photograph"
              />
              <figcaption>Miniature detail study</figcaption>
            </figure>
            <figure>
              <ProjectImage
                image={homeMedia.transformationLight}
                label="Original illuminated miniature photograph"
              />
              <figcaption>Illumination study</figcaption>
            </figure>
          </div>
          <p className="sectionNote">
            Separate image studies, not a controlled before/after comparison.
          </p>
          <div className="videoPlaceholder">
            <span className="videoMark" aria-hidden="true">
              ▷
            </span>
            <div>
              <h3>A closer look at the process.</h3>
              <p>Space reserved for an original product demonstration video.</p>
            </div>
            <span className="inlineBadge">VIDEO PENDING</span>
          </div>
        </section>
        <section
          className="creationsSection"
          id="gallery"
          aria-labelledby="gallery-title"
        >
          <div className="sectionHeading">
            <div>
              <p className="eyebrow">THE RESULTS</p>
              <h2 id="gallery-title">Forged in Light.</h2>
            </div>
            <p>Real projects. Real miniatures. Extraordinary results.</p>
          </div>
          {gallery.some((item) => !item.image) && (
            <p className="sectionNote">
              Original photography is pending. These frames identify the
              requested photographs and do not represent finished product
              images.
            </p>
          )}
          <div className="galleryGrid">
            {gallery.map((item) => (
              <figure className="galleryCard" key={item.title}>
                <div className="galleryImageWrap">
                  <ProjectImage image={item.image} label={item.label} />
                </div>
                <figcaption>
                  <h3>{item.title}</h3>
                  <p>
                    {item.image
                      ? "ElvensForge showcase image."
                      : "Original photograph pending."}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="demonstrationNote">
            Miniatures and painted scenery shown for demonstration purposes
            only.
          </p>
        </section>
        <section
          className="aboutSection"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="aboutIntroduction">
            <div>
              <p className="eyebrow">THE CREATIVE FORGE</p>
              <h2 id="about-title">
                More Than a Workshop.
                <br />A Creative Forge.
              </h2>
            </div>
            <div>
              <p>
                ElvensForge brings together art, craftsmanship and technology to
                explore new possibilities for tabletop gaming, miniature
                painting and immersive creations.
              </p>
              <p className="brandSignature">Forge Worlds. Create Legends.</p>
            </div>
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
