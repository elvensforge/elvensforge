import Link from "next/link";
import { products, type ShowcaseEntry } from "@/lib/content";
import { homeMedia } from "@/lib/home-content";
import ProjectImage from "./project-image";

export function ProductCard({ entry }: { entry: ShowcaseEntry }) {
  const image = entry.image || homeMedia.base;
  return (
    <article
      className={`featureCard${entry.placeholder ? " previewProduct" : ""}`}
      id={entry.id}
    >
      <div className="productImageWrap">
        <ProjectImage image={image} label="LED-ready miniature base" />
        <span className="previewBadge">
          {entry.placeholder ? "Catalogue preview" : entry.status}
        </span>
      </div>
      <div className="productCardContent">
        <p className="cardCategory">{entry.category}</p>
        <h3>{entry.name}</h3>
        <p>{entry.description}</p>
        <p className="variantNote">
          {entry.variant ||
            "Sizes and variant details will be confirmed in the catalogue."}
        </p>
        {entry.price && !entry.placeholder && (
          <p className="productPrice">{entry.price}</p>
        )}
        <details className="entryDetails">
          <summary>
            {entry.placeholder
              ? "View Preview Details"
              : "View Product Details"}
            <span className="detailsIndicator" aria-hidden="true">
              +
            </span>
          </summary>
          <div className="entryDetailsBody">
            {entry.placeholder && (
              <p className="contentNotice">
                Collection preview · No individual products, prices or
                availability have been published.
              </p>
            )}
            <p>{entry.details}</p>
            {!!entry.specifications?.length && (
              <dl className="specifications">
                {entry.specifications.map((item) => (
                  <div key={item.label}>
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            <a className="textLink" href="mailto:contact@elvensforge.com">
              Ask about your project ↗
            </a>
          </div>
        </details>
      </div>
    </article>
  );
}
export function ProductShowcase({
  standalone = false,
}: {
  standalone?: boolean;
}) {
  return (
    <section
      className="shopCatalog"
      id={standalone ? "shop" : "featured-products"}
      aria-labelledby="products-title"
    >
      <div className="sectionHeading">
        <div>
          <p className="eyebrow">THE LED-READY COLLECTION</p>
          <h2 id="products-title">Discover the Forge.</h2>
        </div>
        <p>
          Explore our growing collection of LED-ready miniature bases, designed
          for hobbyists who want their creations to stand out.
        </p>
      </div>
      {products.some((product) => product.placeholder) && (
        <p className="sectionNote">
          Catalogue preview · Verified product designs, photographs and
          specifications are pending. Online purchasing is not available.
        </p>
      )}
      <div
        className={`featureGrid${products.length === 1 ? " featureGridSingle" : ""}`}
      >
        {products.map((product) => (
          <ProductCard entry={product} key={product.id} />
        ))}
      </div>
      {!standalone && (
        <div className="sectionAction">
          <Link className="secondaryButton" href="/shop/">
            Explore the Shop <span aria-hidden="true">↗</span>
          </Link>
        </div>
      )}
    </section>
  );
}
