# ElvensForge

Next.js storefront with static export for IONOS. Shopify owns products, variants, inventory, pricing, carts, discounts and checkout. No payment details are collected by this site.

## Development

Run `npm ci`, then `npm run dev`. Run `npm run lint`, `npm test` (Node.js 24) and `npm run build` to validate. Static output is generated in `out/`.

## Activate the shop

The Shopify store is still being created. Until configured, `/shop/` shows an opening-soon state. There are no placeholder products or prices, and checkout is unavailable. Matchmaking has been removed.

1. Create the Shopify store, configure payments, shipping, taxes, markets and shop policies in Shopify, and install the Headless sales channel.
2. Add real LED miniature bases and accessories with photos, descriptions/specifications, prices, variants and inventory. Publish them to the storefront's sales channel. Keep technical specifications (dimensions, materials, LED power requirements, compatibility, included parts) in the product description. Product options are shown separately on the details panel.
3. Copy `.env.example` to `.env.local`. Set `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` to the exact `your-shop.myshopify.com` hostname, without `https://` or paths. The integration uses tokenless Storefront API access for products and carts. If your channel requires a token, set `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` to its **public** Storefront token. Never use Admin API keys, private tokens or client secrets here: `NEXT_PUBLIC_` values are included in browser bundles.
4. Set the same public build variables in the deployment environment, rebuild and deploy. For the existing GitHub Actions workflow, define repository Actions variables with these names; the build workflow forwards them to Next.js. Empty variables are safe and keep the shop closed. Configure channel access/origin settings for the production domain as required by Shopify.
5. Publish a test product and verify the real integration: catalog, photos, all variants, sold-out states, cart add/update/remove, reload persistence, inventory changes, shipping, taxes, discounts, and Shopify test-mode checkout/order confirmation. Disable payment test mode before launch. No live purchase has been tested while the store does not exist.

Catalog data is fetched live in the browser, so Shopify catalog and stock changes do not require a rebuild. Credentials/domain changes do require a build. The API version is pinned to `2026-10` in `lib/shopify.ts`; review it before Shopify retires that version.

## Storefront behavior

- `/shop/` lists published products with cursor pagination. Product cards open an accessible native dialog; `?product=product-handle` links to a product without requiring dynamic routes or a Next.js server.
- Product descriptions render as plain text, never unsanitized HTML. Variant configurations, prices, availability and up to 20 gallery images come from Shopify. All variants are fetched with pagination.
- Carts are created and mutated in Shopify. Only the cart ID is saved locally, scoped to the shop hostname. Blocked browser storage still permits shopping during the current visit.
- Expired carts are cleared; failed cart requests display a retry control. Mutations are serialized and Shopify warnings are displayed. Carts and checkout URLs are refreshed before checkout. Shopify performs final stock/pricing validation.
- Checkout redirects to the HTTPS `checkoutUrl` returned by Shopify. Shipping and taxes are finalized there. Browser requests require no private backend credentials.

Official references: [Storefront API authentication](https://shopify.dev/docs/api/storefront/latest), [Shopify carts and checkout](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/cart/manage).
