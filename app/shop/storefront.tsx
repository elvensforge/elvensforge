"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  cartStorageKey,
  changeCart,
  getCart,
  getProduct,
  getProducts,
  money,
  shopConfigured,
  type Cart,
  type Product,
  type ProductDetail,
} from "@/lib/shopify";

function ProductPicture({
  image,
  title,
  large = false,
}: {
  image: { url: string; altText: string | null } | null;
  title: string;
  large?: boolean;
}) {
  return image ? (
    <Image
      unoptimized
      src={image.url}
      alt={image.altText || title}
      width={large ? 800 : 480}
      height={large ? 800 : 480}
      className="shopImage"
    />
  ) : (
    <div className="shopImagePlaceholder">Image coming soon</div>
  );
}

export default function Storefront() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(shopConfigured);
  const [catalogError, setCatalogError] = useState("");
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [productError, setProductError] = useState("");
  const [detailLoading, setDetailLoading] = useState(false);
  const [variantId, setVariantId] = useState("");
  const [imageIndex, setImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<Cart | null>(null);
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(!shopConfigured);
  const [cartError, setCartError] = useState("");
  const [notice, setNotice] = useState("");
  const cartId = useRef<string | null>(null);
  const locked = useRef(false);
  const detailRequest = useRef(0);
  const productDialog = useRef<HTMLDialogElement>(null);
  const cartDialog = useRef<HTMLDialogElement>(null);
  const selectedVariant = product?.variants.nodes.find(
    (v) => v.id === variantId,
  );

  const remember = useCallback((value: Cart | null) => {
    cartId.current = value?.id || null;
    setCart(value);
    try {
      if (value) localStorage.setItem(cartStorageKey, value.id);
      else localStorage.removeItem(cartStorageKey);
    } catch {
      /* The cart still works for this visit if storage is blocked. */
    }
  }, []);

  const loadCatalog = useCallback(async (after: string | null = null) => {
    setLoading(true);
    setCatalogError("");
    try {
      const result = await getProducts(after);
      setProducts((previous) =>
        after
          ? [
              ...previous,
              ...result.nodes.filter(
                (p) => !previous.some((old) => old.id === p.id),
              ),
            ]
          : result.nodes,
      );
      setCursor(result.pageInfo.endCursor);
      setHasMore(result.pageInfo.hasNextPage);
    } catch {
      setCatalogError("We could not load the products. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const openProduct = useCallback(async (handle: string, updateUrl = true) => {
    const request = ++detailRequest.current;
    setProduct(null);
    setProductError("");
    setDetailLoading(true);
    setImageIndex(0);
    setQuantity(1);
    if (!productDialog.current?.open) productDialog.current?.showModal();
    if (updateUrl) {
      const url = new URL(window.location.href);
      url.searchParams.set("product", handle);
      window.history.replaceState(null, "", url);
    }
    try {
      const value = await getProduct(handle);
      if (request !== detailRequest.current) return;
      setProduct(value);
      setVariantId(
        (
          value.variants.nodes.find((v) => v.availableForSale) ||
          value.variants.nodes[0]
        )?.id || "",
      );
    } catch (error) {
      if (request === detailRequest.current)
        setProductError(
          error instanceof Error
            ? error.message
            : "Unable to load this product.",
        );
    } finally {
      if (request === detailRequest.current) setDetailLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!shopConfigured) return;
    let active = true;
    getProducts()
      .then((result) => {
        if (!active) return;
        setProducts(result.nodes);
        setCursor(result.pageInfo.endCursor);
        setHasMore(result.pageInfo.hasNextPage);
      })
      .catch(() => {
        if (active)
          setCatalogError("We could not load the products. Please try again.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    const handle = new URL(window.location.href).searchParams.get("product");
    if (handle)
      void Promise.resolve().then(() => {
        if (active) return openProduct(handle, false);
      });
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(cartStorageKey);
    } catch {
      /* Storage is optional. */
    }
    cartId.current = saved;
    if (saved) {
      getCart(saved)
        .then((value) => {
          if (active) remember(value);
        })
        .catch(() => {
          if (active)
            setCartError(
              "Your saved cart could not be loaded. Retry before adding products.",
            );
        })
        .finally(() => {
          if (active) setReady(true);
        });
    } else {
      Promise.resolve().then(() => {
        if (active) setReady(true);
      });
    }
    return () => {
      active = false;
    };
  }, [loadCatalog, openProduct, remember]);

  async function cartAction(
    action: "add" | "update" | "remove" | "refresh" | "checkout",
    item: { merchandiseId?: string; id?: string; quantity?: number } = {},
  ) {
    if (locked.current || !ready) return;
    locked.current = true;
    setBusy(true);
    setCartError("");
    setNotice("");
    try {
      const latest = cartId.current ? await getCart(cartId.current) : null;
      remember(latest);
      if (action === "refresh") return;
      if (action === "checkout") {
        if (!latest?.totalQuantity)
          throw new Error(
            "Your cart is empty or has expired. Please add a product.",
          );
        if (
          latest.lines.nodes.some((line) => !line.merchandise.availableForSale)
        )
          throw new Error(
            "An item is no longer available. Remove it before checking out.",
          );
        const url = new URL(latest.checkoutUrl);
        if (url.protocol !== "https:")
          throw new Error("Checkout is temporarily unavailable.");
        window.location.assign(url.href);
        return;
      }
      if (!latest && action !== "add")
        throw new Error(
          "Your cart has expired. Please add your products again.",
        );
      const result = await changeCart(
        latest ? action : "create",
        latest?.id || null,
        item,
      );
      // Remember the ID before reloading: a network failure must not create a second cart.
      cartId.current = result.id;
      try {
        localStorage.setItem(cartStorageKey, result.id);
      } catch {
        /* Storage is optional. */
      }
      const updated = await getCart(result.id);
      if (!updated)
        throw new Error("Your cart could not be reloaded. Please retry.");
      remember(updated);
      setNotice(
        result.notice ||
          (action === "add" ? "Added to your cart." : "Cart updated."),
      );
      if (action === "add") {
        productDialog.current?.close();
        cartDialog.current?.showModal();
      }
    } catch (error) {
      setCartError(
        error instanceof Error
          ? error.message
          : "The cart could not be updated. Please try again.",
      );
    } finally {
      locked.current = false;
      setBusy(false);
    }
  }

  function closeProduct() {
    ++detailRequest.current;
    const url = new URL(window.location.href);
    url.searchParams.delete("product");
    window.history.replaceState(null, "", url);
  }

  return (
    <main className="shopPage">
      <nav className="navigation siteNavigation" aria-label="Main navigation">
        <Link className="brand" href="/">
          ELVENSFORGE
        </Link>
        <div className="navigationLinks">
          <Link href="/">Home</Link>
          <Link href="/#creations">Creations</Link>
          <Link aria-current="page" href="/shop/">
            Shop
          </Link>
        </div>
        <button
          className="navigationButton"
          onClick={() => cartDialog.current?.showModal()}
          disabled={!shopConfigured}
        >
          Cart{cart ? ` (${cart.totalQuantity})` : ""}
        </button>
      </nav>
      <section className="shopHero">
        <div>
          <p className="eyebrow">ELVENSFORGE / EQUIPMENT DIVISION</p>
          <h1>
            Small scale.
            <br />
            <span>Infinite atmosphere.</span>
          </h1>
          <p className="shopIntro">
            3D-printed LED miniature bases and accessories. Bring a new
            dimension of light to your tabletop worlds.
          </p>
          <a className="primaryButton" href="#catalog">
            Explore the collection <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="shopArtifact" aria-hidden="true">
          <div className="hudCross hudCrossTop">+</div>
          <div className="ledBase">
            <span>EF</span>
          </div>
          <div className="hudCross hudCrossBottom">+</div>
          <span className="artifactCaption">LIGHT / FORM / IMAGINATION</span>
        </div>
      </section>
      <section className="shopCatalog" id="catalog" aria-busy={loading}>
        <header className="shopSectionHeader">
          <div>
            <p className="eyebrow">THE COLLECTION</p>
            <h2>Made for your next world.</h2>
          </div>
          <span className="shopBadge">LED BASES + ACCESSORIES</span>
        </header>
        {!shopConfigured ? (
          <div className="shopEmpty">
            <span className="shopSignal" aria-hidden="true" />
            <p className="eyebrow">THE FORGE IS WARMING UP</p>
            <h3>A new collection is taking shape.</h3>
            <p>
              Our shop is opening soon. Discover illuminated miniature bases and
              accessories here when the first collection launches.
            </p>
            <a
              className="secondaryButton"
              href="mailto:contact@elvensforge.com"
            >
              Get in touch
            </a>
          </div>
        ) : (
          <>
            <div className="shopProductGrid">
              {products.map((item) => (
                <article className="shopProductCard" key={item.id}>
                  <button
                    className="shopProductVisual"
                    onClick={() => void openProduct(item.handle)}
                    aria-label={`View ${item.title}`}
                  >
                    <ProductPicture
                      image={item.featuredImage}
                      title={item.title}
                    />
                  </button>
                  <div className="shopProductInfo">
                    <span className="shopStock">
                      {item.availableForSale ? "Available" : "Sold out"}
                    </span>
                    <h3>{item.title}</h3>
                    <p className="shopPrice">
                      {item.priceRange.minVariantPrice.amount !==
                      item.priceRange.maxVariantPrice.amount
                        ? "From "
                        : ""}
                      {money(item.priceRange.minVariantPrice)}
                    </p>
                    <button
                      className="secondaryButton"
                      onClick={() => void openProduct(item.handle)}
                    >
                      View details <span aria-hidden="true">↗</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
            {loading && (
              <p className="shopStatus" role="status">
                Loading the collection…
              </p>
            )}
            {catalogError && (
              <div className="shopStatus" role="alert">
                <p>{catalogError}</p>
                <button
                  className="secondaryButton"
                  onClick={() =>
                    void loadCatalog(products.length ? cursor : null)
                  }
                >
                  Try again
                </button>
              </div>
            )}
            {!loading && !catalogError && products.length === 0 && (
              <div className="shopEmpty">
                <h3>The next drop is on its way.</h3>
                <p>No products are available yet. Check back soon.</p>
              </div>
            )}
            {!loading && !catalogError && hasMore && (
              <div className="shopStatus">
                <button
                  className="secondaryButton"
                  onClick={() => void loadCatalog(cursor)}
                >
                  Load more products
                </button>
              </div>
            )}
          </>
        )}
      </section>
      <section className="shopPromises" aria-label="Shopping with ElvensForge">
        <div>
          <span>01 / CRAFT</span>
          <h3>Designed for tabletop worlds</h3>
          <p>
            Explore each product’s dimensions, materials and lighting details
            before you choose.
          </p>
        </div>
        <div>
          <span>02 / CHOICE</span>
          <h3>Find your configuration</h3>
          <p>
            Compare available sizes, colours and other options in the product
            details.
          </p>
        </div>
        <div>
          <span>03 / CHECKOUT</span>
          <h3>A secure finish</h3>
          <p>
            Complete your purchase through Shopify. Shipping and applicable
            taxes are shown at checkout.
          </p>
        </div>
      </section>
      <footer>
        <Link className="brand" href="/">
          ELVENSFORGE
        </Link>
        <a href="mailto:contact@elvensforge.com">
          Questions? Contact the forge
        </a>
        <p>© {new Date().getFullYear()} ElvensForge</p>
      </footer>

      <dialog
        ref={productDialog}
        className="shopDialog productDialog"
        onClose={closeProduct}
        aria-labelledby="product-title"
      >
        <div className="shopDialogHeader">
          <span className="eyebrow">PRODUCT DETAILS</span>
          <button
            className="shopClose"
            onClick={() => productDialog.current?.close()}
            aria-label="Close product details"
          >
            ×
          </button>
        </div>
        {detailLoading && <p role="status">Loading product…</p>}
        {productError && <p role="alert">{productError}</p>}
        {!product && (
          <h2 id="product-title" className="visuallyHidden">
            Product details
          </h2>
        )}
        {product && (
          <div className="shopDetailGrid">
            <div>
              <ProductPicture
                image={
                  imageIndex === -1
                    ? selectedVariant?.image || product.featuredImage
                    : product.images.nodes[imageIndex] || product.featuredImage
                }
                title={product.title}
                large
              />
              <div className="shopThumbnails">
                {product.images.nodes.map((image, index) => (
                  <button
                    key={`${image.url}-${index}`}
                    onClick={() => setImageIndex(index)}
                    aria-label={`View image ${index + 1}`}
                    aria-pressed={imageIndex === index}
                  >
                    <ProductPicture image={image} title={product.title} />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className="shopStock">
                {selectedVariant?.availableForSale ? "Available" : "Sold out"}
              </span>
              <h2 id="product-title">{product.title}</h2>
              <p className="shopPrice">
                {selectedVariant ? money(selectedVariant.price) : "Unavailable"}
              </p>
              <p className="shopDescription">
                {product.description ||
                  "More product information will be available soon."}
              </p>
              {product.productType && (
                <p className="shopSpecification">
                  Category: {product.productType}
                </p>
              )}
              <label className="shopField">
                Configuration
                <select
                  value={variantId}
                  onChange={(event) => {
                    setVariantId(event.target.value);
                    setImageIndex(-1);
                  }}
                >
                  {product.variants.nodes.map((v) => (
                    <option value={v.id} key={v.id}>
                      {v.title === "Default Title" ? "Standard" : v.title}
                      {!v.availableForSale ? " — Sold out" : ""}
                    </option>
                  ))}
                </select>
              </label>
              {selectedVariant && (
                <dl className="shopSpecifications">
                  {selectedVariant.selectedOptions
                    .filter((option) => option.value !== "Default Title")
                    .map((option) => (
                      <div key={option.name}>
                        <dt>{option.name}</dt>
                        <dd>{option.value}</dd>
                      </div>
                    ))}
                </dl>
              )}
              <label className="shopField">
                Quantity
                <input
                  type="number"
                  min="1"
                  max="99"
                  step="1"
                  value={quantity}
                  onChange={(event) => setQuantity(Number(event.target.value))}
                />
              </label>
              <button
                className="primaryButton shopBuy"
                disabled={
                  !selectedVariant?.availableForSale ||
                  busy ||
                  !ready ||
                  !Number.isInteger(quantity) ||
                  quantity < 1 ||
                  quantity > 99 ||
                  !!cartError
                }
                onClick={() =>
                  void cartAction("add", { merchandiseId: variantId, quantity })
                }
              >
                {busy
                  ? "Updating cart…"
                  : selectedVariant?.availableForSale
                    ? "Add to cart"
                    : "Sold out"}
              </button>
              <p className="shopFinePrint">
                Shipping and applicable taxes calculated at checkout.
              </p>
              {cartError && (
                <div role="alert">
                  <p>{cartError}</p>
                  <button
                    className="secondaryButton"
                    disabled={busy}
                    onClick={() => void cartAction("refresh")}
                  >
                    Reload cart
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </dialog>

      <dialog
        ref={cartDialog}
        className="shopDialog cartDialog"
        aria-labelledby="cart-title"
      >
        <div className="shopDialogHeader">
          <h2 id="cart-title">Your cart</h2>
          <button
            className="shopClose"
            onClick={() => cartDialog.current?.close()}
            aria-label="Close cart"
          >
            ×
          </button>
        </div>
        {!ready && <p role="status">Loading your cart…</p>}
        {cartError && (
          <div role="alert">
            <p>{cartError}</p>
            <button
              className="secondaryButton"
              disabled={busy}
              onClick={() => void cartAction("refresh")}
            >
              Reload cart
            </button>
          </div>
        )}
        <p className="shopCartNotice" role="status">
          {busy ? "Updating cart…" : notice}
        </p>
        {ready && !cart?.totalQuantity && !cartError && (
          <div className="shopEmpty">
            <h3>Your next world starts here.</h3>
            <p>Your cart is empty.</p>
            <button
              className="secondaryButton"
              onClick={() => cartDialog.current?.close()}
            >
              Continue exploring
            </button>
          </div>
        )}
        {cart?.lines.nodes.map((line) => (
          <article className="shopCartLine" key={line.id}>
            <ProductPicture
              image={line.merchandise.image}
              title={line.merchandise.product.title}
            />
            <div>
              <h3>{line.merchandise.product.title}</h3>
              <p>
                {line.merchandise.title === "Default Title"
                  ? "Standard"
                  : line.merchandise.title}
              </p>
              {!line.merchandise.availableForSale && (
                <p>Sold out — please remove this item.</p>
              )}
              <p>{money(line.cost.totalAmount)}</p>
              <div className="shopQuantity">
                <button
                  disabled={busy || !ready || line.quantity <= 1}
                  aria-label={`Decrease quantity of ${line.merchandise.product.title}`}
                  onClick={() =>
                    void cartAction("update", {
                      id: line.id,
                      quantity: line.quantity - 1,
                    })
                  }
                >
                  −
                </button>
                <span aria-label="Quantity">{line.quantity}</span>
                <button
                  disabled={busy || !ready || line.quantity >= 99}
                  aria-label={`Increase quantity of ${line.merchandise.product.title}`}
                  onClick={() =>
                    void cartAction("update", {
                      id: line.id,
                      quantity: line.quantity + 1,
                    })
                  }
                >
                  +
                </button>
                <button
                  className="shopRemove"
                  disabled={busy || !ready}
                  onClick={() => void cartAction("remove", { id: line.id })}
                >
                  Remove
                </button>
              </div>
            </div>
          </article>
        ))}
        {!!cart?.totalQuantity && (
          <div className="shopCartSummary">
            <p>
              <span>Subtotal</span>
              <strong>{money(cart.cost.subtotalAmount)}</strong>
            </p>
            <p className="shopFinePrint">
              Shipping, discounts and applicable taxes are confirmed at
              checkout.
            </p>
            <button
              className="primaryButton shopBuy"
              disabled={busy || !ready || !!cartError}
              onClick={() => void cartAction("checkout")}
            >
              {busy ? "Please wait…" : "Secure checkout ↗"}
            </button>
            <p className="shopFinePrint">
              Continue to Shopify to complete your purchase.
            </p>
          </div>
        )}
      </dialog>
    </main>
  );
}
