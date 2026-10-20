# ElvensForge

ElvensForge's brand website and product showcase, built with Next.js and a static export for the existing IONOS hosting. The original wordmark, fonts, homepage sections and `/shop/` route are retained. The site currently presents creative work and categories; it does not sell products online.

## Develop and validate

Use Node.js 24. Run `npm ci`, then `npm run dev`. Run `npm run lint` and `npm run build` before publishing. The static output is in `out/`.

There are no commerce API requests, payment integrations, carts, checkout controls, fake stock counts or invented prices. The previous integration and its configuration have been removed. No additional dependencies are required.

## Add authentic photographs and verified content

The repository has not been supplied with original ElvensForge product or project photographs. All image spaces explicitly identify themselves as placeholders. The portfolio entries and product category previews are marked accordingly. They are not claims about finished individual products.

Edit `lib/content.ts` to maintain the hero photograph, project gallery, product showcase, verified specifications and official links. The data is separate from presentation so a future product source can reuse the same card components.

1. Put the original, approved ElvensForge photographs in the prepared `public/images/hero/`, `public/images/products/` or `public/images/creations/` folders. See `public/images/README.md` for a short Spanish guide. Keep existing brand assets intact. Supply pre-sized WebP or AVIF versions where suitable (roughly 1200 px for the hero and 800 px for cards), avoiding large camera originals on the public page. Static hosting uses unoptimized Next Image, so resize/compress source files before publishing; responsive `sizes` reserves the appropriate layout but is not an image transformation service.
2. Set `heroImage` to `{ src, alt, width, height, position? }`. Use a local path such as `/images/your-approved-photo.webp`, accurate descriptive alt text and actual source dimensions. The optional `position` sets the focal point, for example `50% 40%`. The hero image is preloaded; below-the-fold images load lazily. All frames reserve their aspect ratio to prevent layout shifts.
3. Replace the placeholder project entries with real names and descriptions, add each original `image`, and set `placeholder: false`. Set `status` to `Preview` or `In Development` as appropriate; neither means an existing prototype is unavailable.
4. Replace category previews with individual documented product entries only when the corresponding photographs and information are available. Add optional `specifications: [{ label, value }]` using verified facts. Do not invent dimensions, electronics, availability, prices or reviews.

`components/project-image.tsx` handles both real images and explicit photo placeholders. `components/showcase.tsx` is shared by the home page and `/shop/`; its native `<details>` controls work with keyboard input and without JavaScript.

## Social profiles and future legal links

In `lib/content.ts`, `socialProfiles` accepts official HTTPS URLs for YouTube, Instagram, Facebook and TikTok. Unconfigured or invalid links are not rendered. No handles have been assumed. `legalLinks` reserves a conditional footer area for actual legal/commercial pages; keep it empty until the pages exist.

Contact links use `contact@elvensforge.com`. The shared header and footer contain Creations, About and Shop navigation. On the homepage these scroll to real sections; on `/shop/`, Creations and About return to the relevant homepage sections.

## Metadata and social sharing

Each page has a distinct title, description, Open Graph and Twitter metadata, and a single H1. `public/social-cover.png` is an original typographic share graphic, not product photography or a replacement logo.

Set `NEXT_PUBLIC_SITE_URL` to the actual HTTPS public origin to enable canonical URLs and absolute social-image URLs. The current IONOS workflow already supplies the site URL. If no origin is configured, or the build receives IONOS's unresolved placeholder, canonical URLs and social images are omitted rather than publishing a guessed domain or localhost URL. Configure a real origin and rebuild to enable them.

The site uses server components with no client-side showcase state, commerce SDK or animation library. The existing export configuration and deployment pipeline are preserved.
