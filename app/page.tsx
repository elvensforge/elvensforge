import Link from "next/link";
const features = [
  {
    title: "Terrain",
    description:
      "Immersive battlefield terrain designed for memorable tabletop encounters.",
  },
  {
    title: "Painting Kits",
    description:
      "Creative kits, lighting components and accessories for miniature projects.",
  },
  {
    title: "Collectibles",
    description:
      "Limited creations that combine craftsmanship, technology and fantasy.",
  },
];

export default function HomePage() {
  return (
    <main>
      <nav className="navigation siteNavigation" aria-label="Main navigation">
        <Link className="brand" href="/">
          ELVENSFORGE
        </Link>

        <div className="navigationLinks">
          <a href="#creations">Creations</a>
          <a href="#about">About</a>
          <Link href="/shop/">Shop</Link>
        </div>

        <Link className="navigationButton" href="/shop/">
          Shop
        </Link>
      </nav>
      <section className="hero">
        <div className="heroContent">
          <p className="eyebrow">ART · CRAFT · TECHNOLOGY</p>

          <h1>
            Forge worlds.
            <br />
            <span>Create legends.</span>
          </h1>

          <p className="heroDescription">
            ElvensForge creates immersive terrain, painting experiences and
            collectible artifacts for tabletop worlds.
          </p>

          <div className="heroActions">
            <a className="primaryButton" href="#creations">
              Explore the forge
            </a>

            <a className="secondaryButton" href="#about">
              Discover our story
            </a>
          </div>
        </div>

        <div className="heroDecoration" aria-hidden="true">
          <div className="forgeOrbit" />
          <div className="forgeOrbit forgeOrbitSecond" />
          <div className="forgeArtifact">
            <span>EF</span>
          </div>
        </div>
      </section>

      <section className="creationsSection" id="creations">
        <div className="sectionHeading">
          <p className="eyebrow">THE FORGE</p>
          <h2>Crafted for extraordinary worlds</h2>
          <p>
            Physical creations made for hobbyists, collectors and players who
            want their tabletop worlds to feel unique.
          </p>
        </div>

        <div className="featureGrid">
          {features.map((feature, index) => (
            <article className="featureCard" key={feature.title}>
              <span className="featureNumber">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3>{feature.title}</h3>
              <p>{feature.description}</p>

              <span className="comingSoon">Coming soon</span>
            </article>
          ))}
        </div>
      </section>

      <section className="aboutSection" id="about">
        <div>
          <p className="eyebrow">OUR PURPOSE</p>
          <h2>More than scenery</h2>
        </div>

        <p>
          We combine digital fabrication, artistic design and storytelling to
          create objects that become part of your games, collections and
          personal worlds.
        </p>
      </section>

      <section className="communitySection" id="community">
        <div className="communityPanel">
          <p className="eyebrow">THE JOURNEY BEGINS</p>
          <h2>Enter the world of ElvensForge</h2>
          <p>
            New creations, experiments and behind-the-scenes content are coming
            soon.
          </p>

          <a className="secondaryButton" href="mailto:contact@elvensforge.com">
            Contact the forge
          </a>
        </div>
      </section>

      <footer>
        <Link className="brand" href="/">
          ELVENSFORGE
        </Link>

        <p>© {new Date().getFullYear()} ElvensForge</p>
      </footer>
    </main>
  );
}
