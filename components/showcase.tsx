import { products, projects, type ShowcaseEntry } from "@/lib/content";
import ProjectImage from "./project-image";

function EntryDetails({
  entry,
  gallery = false,
}: {
  entry: ShowcaseEntry;
  gallery?: boolean;
}) {
  return (
    <details className="entryDetails">
      <summary>
        {gallery ? "Project Notes" : "View Details"}
        <span className="detailsIndicator" aria-hidden="true">
          +
        </span>
      </summary>
      <div className="entryDetailsBody">
        {entry.placeholder && (
          <p className="contentNotice">
            {gallery ? "Portfolio placeholder" : "Category preview"} · Original
            photography and verified{" "}
            {gallery ? "project notes" : "product information"} pending.
          </p>
        )}
        <p>{entry.details}</p>
        {!!entry.specifications?.length && (
          <dl className="specifications">
            {entry.specifications.map((spec) => (
              <div key={spec.label}>
                <dt>{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </details>
  );
}

export function CreationsGallery() {
  return (
    <section
      className="creationsSection"
      id="creations"
      aria-labelledby="creations-title"
    >
      <div className="sectionHeading">
        <div>
          <p className="eyebrow">01 / CREATIONS</p>
          <h2 id="creations-title">Light, made tangible.</h2>
        </div>
        <p>
          A closer look at the painting, fabrication and experimentation behind
          ElvensForge’s tabletop worlds.
        </p>
      </div>
      {projects.some((project) => project.placeholder) && (
        <p className="sectionNote">
          Gallery preview · Original ElvensForge project photographs have not
          yet been supplied. Image spaces below are placeholders.
        </p>
      )}
      <div className="galleryGrid">
        {projects.map((project, index) => (
          <article className="galleryCard" key={project.id} id={project.id}>
            <div className="galleryImageWrap">
              <ProjectImage image={project.image} label={project.name} />
              <span className="imageIndex" aria-hidden="true">
                0{index + 1} / EF
              </span>
            </div>
            <div className="galleryCaption">
              <p className="cardCategory">{project.category}</p>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <EntryDetails entry={project} gallery />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ProductShowcase({
  standalone = false,
}: {
  standalone?: boolean;
}) {
  return (
    <section className="shopCatalog" id="shop" aria-labelledby="shop-title">
      <div className="sectionHeading">
        <div>
          <p className="eyebrow">
            {standalone ? "THE COLLECTION" : "02 / SHOP"}{" "}
            <span className="inlineBadge">PRODUCT SHOWCASE</span>
          </p>
          <h2 id="shop-title">
            Built around light.
            <br />
            Made for your world.
          </h2>
        </div>
        <p>
          Explore LED miniature bases, supporting components and original
          creations. For project enquiries,{" "}
          <a className="textLink" href="mailto:contact@elvensforge.com">
            talk to the forge <span aria-hidden="true">↗</span>
          </a>
          .
        </p>
      </div>
      <p className="sectionNote">
        Category previews · Product photographs and individual specifications
        are being prepared. Online purchasing is not available.
      </p>
      <div className="featureGrid">
        {products.map((product, index) => (
          <article
            className={`featureCard${index === 0 ? " featureCardFlagship" : ""}`}
            key={product.id}
            id={product.id}
          >
            <div className="productImageWrap">
              <ProjectImage image={product.image} label={product.name} />
              <span className="previewBadge">
                {product.placeholder ? "Category Preview" : product.status}
              </span>
            </div>
            <div className="productCardContent">
              <p className="cardCategory">
                {product.category}
                {index === 0 && <span className="flagshipLabel">Flagship</span>}
              </p>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <EntryDetails entry={product} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
