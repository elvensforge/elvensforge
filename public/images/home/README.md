# Original homepage photography

Only add authorized original ElvensForge photography. No stock images or generated miniatures. Keep the master photographs unchanged, outside this public folder. Every file in `public/` becomes publicly accessible when deployed.

| Web derivative                  | Intended photograph                | Width × height |
| ------------------------------- | ---------------------------------- | -------------- |
| hero-void-dragon.webp           | Desktop hero: original Void Dragon | 1600 × 1800    |
| hero-nightbringer-mobile.webp   | Mobile hero: original Nightbringer | 900 × 1200     |
| led-base-lighting.webp          | Base with lighting system visible  | 1200 × 900     |
| led-installation-wiring.webp    | Base / wiring layout               | 1000 × 750     |
| led-installation-strip.webp     | LED positioning                    | 1000 × 750     |
| led-installation-result.webp    | Illuminated result                 | 1000 × 750     |
| transformation-detail.webp      | Original detail study              | 1000 × 1200    |
| transformation-illuminated.webp | Original illuminated study         | 1000 × 1200    |
| gallery-void-dragon.webp        | Void Dragon gallery photograph     | 1000 × 1200    |
| gallery-nightbringer.webp       | Nightbringer gallery photograph    | 1000 × 1200    |
| gallery-psychomancer.webp       | Psychomancer gallery photograph    | 1000 × 1200    |

Create derivatives with the included script, for example:

```sh
node scripts/prepare-home-image.mjs /path/to/original-void-dragon.jpg hero-void-dragon.webp 1600 1800
```

The script uses Sharp already installed with Next.js. It preserves the original, respects EXIF orientation, fits the full photograph inside the target canvas and pads the remaining space with a dark background. It never generates or alters the miniature. Existing output files are not overwritten automatically.

Review each image, its alt text and the intended subject in `lib/home-content.ts` before deploying. The listed dimensions describe derivative canvases, not the dimensions of the missing master photographs. Update the configuration if a different derivative size is used. Missing files remain explicit photo placeholders and are never linked as broken images. Rebuild after adding files.

The transformation panels are independent photographic studies. Do not label them before/after unless the same subject and setup are verified. The optional demonstration video has a reserved layout but no fake play button or video URL.
