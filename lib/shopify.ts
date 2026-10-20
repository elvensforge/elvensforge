export type Money = { amount: string; currencyCode: string };
export type ProductImage = { url: string; altText: string | null };
export type Variant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: Money;
  image: ProductImage | null;
  selectedOptions: { name: string; value: string }[];
};
export type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  productType: string;
  availableForSale: boolean;
  featuredImage: ProductImage | null;
  priceRange: { minVariantPrice: Money; maxVariantPrice: Money };
};
export type ProductDetail = Product & {
  images: { nodes: ProductImage[] };
  variants: { nodes: Variant[] };
};
export type CartLine = {
  id: string;
  quantity: number;
  cost: { totalAmount: Money };
  merchandise: Variant & { product: { title: string; handle: string } };
};
export type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: { subtotalAmount: Money; totalAmount: Money };
  lines: {
    nodes: CartLine[];
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
  };
};

const domain = (process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "").trim();
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || "";
export const shopConfigured = /^[a-z0-9][a-z0-9-]*\.myshopify\.com$/i.test(
  domain,
);
export const cartStorageKey = `elvensforge-cart:${domain}`;
const version = "2026-10";

export async function storefront<T>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T> {
  if (!shopConfigured) throw new Error("The shop is not open yet.");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(
      `https://${domain}/api/${version}/graphql.json`,
      {
        method: "POST",
        cache: "no-store",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "X-Shopify-Storefront-Access-Token": token } : {}),
        },
        body: JSON.stringify({ query, variables }),
      },
    );
    if (!response.ok)
      throw new Error("The shop is temporarily unavailable. Please try again.");
    const result = await response.json();
    if (result.errors?.length || !result.data)
      throw new Error(
        "The shop could not complete this request. Please try again.",
      );
    return result.data as T;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError")
      throw new Error("The shop took too long to respond. Please try again.");
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

const moneyFields = "amount currencyCode";
const imageFields = "url altText";
const productFields = `id handle title description productType availableForSale featuredImage { ${imageFields} } priceRange { minVariantPrice { ${moneyFields} } maxVariantPrice { ${moneyFields} } }`;
const variantFields = `id title availableForSale price { ${moneyFields} } image { ${imageFields} } selectedOptions { name value }`;
const lineFields = `id quantity cost { totalAmount { ${moneyFields} } } merchandise { ... on ProductVariant { ${variantFields} product { title handle } } }`;
const cartFields = `id checkoutUrl totalQuantity cost { subtotalAmount { ${moneyFields} } totalAmount { ${moneyFields} } } lines(first: 100) { nodes { ${lineFields} } pageInfo { hasNextPage endCursor } }`;
export async function getProducts(after: string | null = null) {
  const result = await storefront<{
    products: {
      nodes: Product[];
      pageInfo: { hasNextPage: boolean; endCursor: string | null };
    };
  }>(
    `query Catalog($after: String) { products(first: 12, after: $after, sortKey: TITLE) { nodes { ${productFields} } pageInfo { hasNextPage endCursor } } }`,
    { after },
  );
  return result.products;
}
export async function getProduct(handle: string) {
  const result = await storefront<{
    product:
      | (ProductDetail & {
          variants: {
            nodes: Variant[];
            pageInfo: { hasNextPage: boolean; endCursor: string | null };
          };
        })
      | null;
  }>(
    `query Product($handle: String!) { product(handle: $handle) { ${productFields} images(first: 20) { nodes { ${imageFields} } } variants(first: 100) { nodes { ${variantFields} } pageInfo { hasNextPage endCursor } } } }`,
    { handle },
  );
  if (!result.product) throw new Error("This product is no longer available.");
  const product = result.product;
  let info = product.variants.pageInfo;
  while (info.hasNextPage) {
    const more = await storefront<{
      product: { variants: { nodes: Variant[]; pageInfo: typeof info } };
    }>(
      `query Variants($handle: String!, $after: String!) { product(handle: $handle) { variants(first: 100, after: $after) { nodes { ${variantFields} } pageInfo { hasNextPage endCursor } } } }`,
      { handle, after: info.endCursor },
    );
    product.variants.nodes.push(...more.product.variants.nodes);
    info = more.product.variants.pageInfo;
  }
  return product as ProductDetail;
}
export async function getCart(id: string): Promise<Cart | null> {
  const result = await storefront<{ cart: Cart | null }>(
    `query Cart($id: ID!) { cart(id: $id) { ${cartFields} } }`,
    { id },
  );
  if (!result.cart) return null;
  const cart = result.cart;
  let info = cart.lines.pageInfo;
  while (info.hasNextPage) {
    const more = await storefront<{
      cart: { lines: { nodes: CartLine[]; pageInfo: typeof info } };
    }>(
      `query CartLines($id: ID!, $after: String!) { cart(id: $id) { lines(first: 100, after: $after) { nodes { ${lineFields} } pageInfo { hasNextPage endCursor } } } }`,
      { id, after: info.endCursor },
    );
    cart.lines.nodes.push(...more.cart.lines.nodes);
    info = more.cart.lines.pageInfo;
  }
  return cart;
}
export async function changeCart(
  action: "create" | "add" | "update" | "remove",
  id: string | null,
  item: { merchandiseId?: string; id?: string; quantity?: number },
) {
  const operations = {
    create: {
      field: "cartCreate",
      declaration: "$input: CartInput!",
      args: "input: $input",
      variables: { input: { lines: [item] } },
    },
    add: {
      field: "cartLinesAdd",
      declaration: "$cartId: ID!, $lines: [CartLineInput!]!",
      args: "cartId: $cartId, lines: $lines",
      variables: { cartId: id, lines: [item] },
    },
    update: {
      field: "cartLinesUpdate",
      declaration: "$cartId: ID!, $lines: [CartLineUpdateInput!]!",
      args: "cartId: $cartId, lines: $lines",
      variables: { cartId: id, lines: [item] },
    },
    remove: {
      field: "cartLinesRemove",
      declaration: "$cartId: ID!, $lineIds: [ID!]!",
      args: "cartId: $cartId, lineIds: $lineIds",
      variables: { cartId: id, lineIds: [item.id] },
    },
  };
  const operation = operations[action];
  const data = await storefront<
    Record<
      string,
      {
        cart: { id: string } | null;
        userErrors: { message: string }[];
        warnings: { message: string }[];
      }
    >
  >(
    `mutation ChangeCart(${operation.declaration}) { ${operation.field}(${operation.args}) { cart { id } userErrors { message } warnings { message } } }`,
    operation.variables,
  );
  const result = data[operation.field];
  if (result.userErrors.length)
    throw new Error(result.userErrors.map((e) => e.message).join(" "));
  if (!result.cart)
    throw new Error("Your cart could not be updated. Please try again.");
  return {
    id: result.cart.id,
    notice: result.warnings.map((w) => w.message).join(" "),
  };
}
export function money(value: Money) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: value.currencyCode,
  }).format(Number(value.amount));
}
