import type { Metadata } from "next";
import { ProductShowcase } from "@/components/showcase";
import {
  ContactSection,
  SiteFooter,
  SiteHeader,
} from "@/components/site-shell";
import { pageMetadata } from "@/lib/metadata";
export const metadata: Metadata = pageMetadata(
  "LED Base Collection Preview | ElvensForge",
  "Explore the ElvensForge LED-ready base collection preview. Verified product specifications and original photographs will be published here.",
  "/shop/",
);
export default function ShopPage() {
  return (
    <>
      <SiteHeader shopPage />
      <main id="main-content" className="shopPage" tabIndex={-1}>
        <section className="shopPageHeader">
          <p className="eyebrow">ELVENSFORGE / SHOP</p>
          <h1>
            LED-ready bases.
            <br />
            <span>Extraordinary possibilities.</span>
          </h1>
          <p>
            A collection preview for your next miniature project. Product
            details and online purchasing are not yet available.
          </p>
        </section>
        <ProductShowcase standalone />
        <ContactSection />
      </main>
      <SiteFooter shopPage />
    </>
  );
}
