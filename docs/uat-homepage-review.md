# UAT homepage redesign — implementation review

## Scope

Branch: `UAT`. Target: https://home-5021050840.app-ionos.space/. Production branch `main` and the previous design branch are outside the change scope. The production baseline inspected before work was `df24c78180154c452e5a6ffc07596667f359aa56`.

## Implementation

- `app/page.tsx`: hero and the requested homepage sections in the specified order, focused on LED-ready bases; brand storytelling is not presented as an unavailable product catalogue.
- `app/globals.css`: black/graphite, metallic neutral details and centralized red interaction colours; responsive typography and layouts, focus styles and reduced motion.
- `components/mobile-navigation.tsx`: Home, LED Bases, How It Works, Gallery, About and one prominent Shop destination. Accessible mobile toggle, Escape dismissal, close on selection.
- `components/project-image.tsx`, `lib/home-content.ts`: responsive original-photo slots, mobile art direction, eager/priority hero, lazy secondary images, explicit missing-photo frames and no broken image requests.
- `components/showcase.tsx`, `lib/content.ts`, `app/shop/page.tsx`: reusable, clearly labelled LED-base collection preview. Optional verified product fields are supported. No fabricated products, price, stock or purchase flow.
- `components/site-shell.tsx`: preserved wordmark, requested final shop CTA, verified email, conditional official socials and visibly inactive unpublished policy links.
- `app/layout.tsx`, `app/robots.ts`, `lib/metadata.ts`: exact requested homepage title/description, per-page metadata, UAT-only noindex/robots rules, original-photo Open Graph only when supplied.
- `.github/workflows/elvensforge-build.yaml`: conditional UAT origin and environment flag; UAT-only HTTP robots-header export. Existing orchestration and deployment identity are preserved.
- `public/images/home/`, `scripts/prepare-home-image.mjs`: organized media plan and non-generative WebP derivative preparation preserving masters.

The obsolete commerce integration and related tests/configuration have been removed from UAT. Framework, dependencies and static routing are preserved.

## Verification completed locally

- ESLint passes.
- Next.js build and static export pass for `/`, `/shop/` and `/robots.txt` with UAT environment flags.
- Headless Edge verified at 1440, 1024, 960, 768, 620, 390 and 320 px: no horizontal overflow.
- Homepage section order, exact title, one H1 per page, internal links and anchors, product detail keyboard controls, mobile menu toggle/Escape/selection and reduced motion pass.
- UAT robots metadata and `Disallow: /` present. Separate configuration checks confirm the UAT flag is absent in production/default environments.
- Primary CTA contrast measured at 6.48:1.
- No external commerce requests or browser runtime errors during the local check.
- Desktop hero/process sections and mobile hero/menu visually inspected. No controlled before/after claim is made.

Existing non-blocking Next.js warning: missing Cal Sans fallback metrics. Font loading and export complete successfully.

## Pending assets and approvals of source information

1. Original Void Dragon, Nightbringer and Psychomancer photographs and process/base/transformation photographs. The supplied attachment contained text only; the repository and current UAT site did not contain those photographs. Real-photo acceptance remains pending. No generated replacement images have been used.
2. Official red colour value and any separate original logo file: not found in UAT. Existing wordmark/favicon are preserved. `--action`/`--accent` are a provisional red interpretation of the brief, not a claimed match to an unprovided brand swatch.
3. Verified product catalogue: actual designs, variants, compatibility and optional prices/availability. The current card is explicitly a collection preview.
4. Original demonstration video.
5. Official social URLs and existing shipping, returns, privacy and terms destinations. No URLs, policies or business details have been invented.
6. Original Open Graph photograph, enabled when a real hero asset is supplied.

The layout is implemented and locally verified; the photography acceptance criterion is not complete until the originals are provided and visually reviewed.

## Asset update — 21 October 2026

Three user-supplied miniature images and both supplied logo files have been incorporated. The hero switches between the supplied desktop and mobile images, the gallery uses all three images, and the supplied white emblem is in the header/footer. The colour emblem supplies the Open Graph image. The five original files were read-only inputs and their SHA-256 hashes remained unchanged.

Four missing process/detail photographs now have real, clearly labelled, replaceable JPG assets: `led-base-lighting.jpg`, `led-installation-wiring.jpg`, `led-installation-strip.jpg` and `transformation-detail.jpg`. Every image frame is populated and dimensioned. These placeholders are geometric graphics, not fabricated product photography. Replacement instructions and image states are in `public/images/home/README.md` and `assets.json`.

The result and illuminated-study slots intentionally reuse one supplied image. They are not claimed to be different shots or a controlled before/after sequence. Technical installation photographs, the catalogue, the demonstration video, official red swatch and policy/social destinations remain pending. The earlier pending-logo/hero/gallery statements above describe the initial implementation before these files were supplied.

## Theme preference — 21 October 2026

At the owner's request, UAT now uses the visual theme from `codex/design-reference`: blue-black surfaces, electric cyan primary actions, teal details and cool neutral borders/text. The earlier red interpretation is superseded. Current UAT content, section order, responsive navigation, supplied logos/images, nontransactional shop and noindex protection are retained. The four replaceable JPG graphics use the same cyan theme. No production or reference-branch changes are included.
