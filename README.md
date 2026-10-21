# ElvensForge — UAT homepage

This checkout implements the homepage specification on **UAT only**, targeting `https://home-5021050840.app-ionos.space/`. Production (`main`) and the earlier design branch are not change targets.

## Development

Use Node.js 24. Run `npm ci`, copy `.env.example` to `.env.local`, and run `npm run dev`. Validate with `npm run lint` and `npm run build`. The existing Next.js static export is generated in `out/`; routing and dependencies are preserved.

## Homepage and reusable components

The home page follows the requested order: header, hero, LED-base introduction, three process steps, featured collection preview, transformation studies/video space, broader brand story, original-project gallery, final shop CTA and footer.

- `app/page.tsx`: product-first homepage and requested copy.
- `components/mobile-navigation.tsx`: one set of six links, responsive toggle, Escape dismissal and keyboard focus.
- `components/project-image.tsx`: original photography or explicit missing-photo frames, mobile art direction, priority hero and lazy noncritical imagery.
- `components/showcase.tsx`: reusable LED-base cards, optional verified variants/specifications/prices and native detail controls.
- `components/site-shell.tsx`: wordmark, navigation, final CTA and verified contact/footer links.
- `app/shop/page.tsx`: catalogue preview only. No commerce integration, cart, checkout, fake inventory or transaction controls.

The previous UAT commerce scaffolding has been removed to keep this implementation within scope. Unavailable categories are not advertised as active product offerings. Broader work appears only in the brand story.

## Required original photography

Three showcase images and two logo sources have now been supplied and integrated. Four missing process/detail images use explicit, replaceable JPG files. See `public/images/home/README.md` for exact filenames and replacement instructions. All supplied sources remain unchanged.

`lib/home-content.ts` checks for each derivative at build time. Missing photographs remain labelled placeholders rather than broken URLs or generated miniature images. Add real files and rebuild. The included `scripts/prepare-home-image.mjs` can create optimized WebP derivatives without modifying the original masters. Verify subjects, alt text and orientation before publishing. Transformation studies are not presented as a controlled before/after comparison.

The supplied white logo now appears alongside the wordmark in the header and footer; the supplied colour logo is used for social metadata. The existing favicon is preserved. No official red token has been confirmed. The red action palette is centralized in `app/globals.css` (`--action`, `--accent`) and needs brand-owner confirmation; it is not represented as a verified original colour measurement.

## Pending links and catalogue

`lib/content.ts` holds the catalogue preview, verified contact email, optional social profiles and optional legal destinations. No prices, stock, variants, customer reviews, business identifiers or social handles are invented. Shipping, returns, privacy and terms are visibly inactive until actual pages/URLs exist. Official social links remain hidden until configured.

Product demonstrations have a reserved noninteractive space until an original video is supplied. Real product listings and specifications are pending.

## UAT indexing and deployment

The existing IONOS orchestration selects the branch from the workflow's Git ref. Only UAT is to be pushed for this task. The build workflow supplies the known UAT URL and `NEXT_PUBLIC_DEPLOYMENT_ENV=uat` for that branch. Production refs use the original supplied site URL and do not receive the UAT flag.

UAT gets `noindex, nofollow` metadata and `robots.txt` with `Disallow: /`. A branch-conditional workflow step adds an `X-Robots-Tag` response-header directive to the exported `.htaccess` for Apache hosts with `mod_headers`. No production workflow is dispatched by this task. The restrictions are intended for indexing control, not access control.

Each page has a single H1, distinct metadata and valid internal destinations. Open Graph uses an original hero photograph only when that real image exists; no unrelated or generated image is substituted.
