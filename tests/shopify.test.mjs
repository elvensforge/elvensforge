import { test, afterEach } from "node:test";
import assert from "node:assert/strict";
process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN = "elvensforge-test.myshopify.com";
const { storefront, getProduct, getCart, changeCart } = await import(
  "../lib/shopify.ts"
);
const originalFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = originalFetch;
});
const respond = (data) => Response.json({ data });

test("uses the public tokenless endpoint and reports GraphQL errors", async () => {
  globalThis.fetch = async (url, options) => {
    assert.equal(
      url,
      "https://elvensforge-test.myshopify.com/api/2026-10/graphql.json",
    );
    assert.equal(
      options.headers["Shopify-Storefront-Private-Token"],
      undefined,
    );
    return Response.json({ errors: [{ message: "Access denied" }] });
  };
  await assert.rejects(storefront("{ products { id } }"), /could not complete/);
});

test("does not treat failed HTTP responses as an empty catalog", async () => {
  globalThis.fetch = async () => new Response("", { status: 503 });
  await assert.rejects(storefront("query {}"), /temporarily unavailable/);
});

test("fetches variants beyond the first page", async () => {
  let calls = 0;
  globalThis.fetch = async (_url, options) => {
    const { query, variables } = JSON.parse(options.body);
    calls++;
    if (query.includes("query Variants")) {
      assert.equal(variables.after, "cursor-1");
      return respond({
        product: {
          variants: {
            nodes: [{ id: "second" }],
            pageInfo: { hasNextPage: false },
          },
        },
      });
    }
    return respond({
      product: {
        title: "Fixture only",
        variants: {
          nodes: [{ id: "first" }],
          pageInfo: { hasNextPage: true, endCursor: "cursor-1" },
        },
      },
    });
  };
  assert.deepEqual(
    (await getProduct("fixture")).variants.nodes.map((v) => v.id),
    ["first", "second"],
  );
  assert.equal(calls, 2);
});

test("handles expired carts and paginates existing cart lines", async () => {
  globalThis.fetch = async () => respond({ cart: null });
  assert.equal(await getCart("expired"), null);
  globalThis.fetch = async (_url, options) => {
    const { query } = JSON.parse(options.body);
    return respond({
      cart: {
        id: "cart",
        lines: {
          nodes: [
            { id: query.includes("query CartLines") ? "second" : "first" },
          ],
          pageInfo: query.includes("query CartLines")
            ? { hasNextPage: false }
            : { hasNextPage: true, endCursor: "line-1" },
        },
      },
    });
  };
  assert.deepEqual(
    (await getCart("cart")).lines.nodes.map((line) => line.id),
    ["first", "second"],
  );
});

test("preserves Shopify stock warnings and rejects mutation user errors", async () => {
  globalThis.fetch = async () =>
    respond({
      cartLinesAdd: {
        cart: { id: "cart" },
        userErrors: [],
        warnings: [{ message: "Quantity reduced to available stock." }],
      },
    });
  assert.deepEqual(
    await changeCart("add", "cart", { merchandiseId: "variant", quantity: 3 }),
    { id: "cart", notice: "Quantity reduced to available stock." },
  );
  globalThis.fetch = async () =>
    respond({
      cartLinesAdd: {
        cart: null,
        userErrors: [{ message: "Sold out" }],
        warnings: [],
      },
    });
  await assert.rejects(
    changeCart("add", "cart", { merchandiseId: "variant", quantity: 1 }),
    /Sold out/,
  );
});
