import fs from "node:fs";
import path from "node:path";
import type { ShowcaseImage } from "./content";

// Resolved at build time: missing originals never become broken public image URLs.
function originalImage(
  filename: string,
  alt: string,
  width: number,
  height: number,
  position = "center",
): ShowcaseImage | undefined {
  if (!fs.existsSync(path.join(process.cwd(), "public/images/home", filename)))
    return undefined;
  return { src: `/images/home/${filename}`, alt, width, height, position };
}
export const homeMedia = {
  hero: originalImage(
    "hero-void-dragon.webp",
    "ElvensForge Void Dragon miniature with illuminated LED-ready base.",
    1600,
    1800,
  ),
  mobileHero: originalImage(
    "hero-nightbringer-mobile.webp",
    "ElvensForge Nightbringer miniature with illuminated base.",
    900,
    1200,
  ),
  base: originalImage(
    "led-base-lighting.webp",
    "ElvensForge miniature base showing the lighting system.",
    1200,
    900,
  ),
  wiring: originalImage(
    "led-installation-wiring.webp",
    "Wiring layout within an ElvensForge miniature base.",
    1000,
    750,
  ),
  strip: originalImage(
    "led-installation-strip.webp",
    "Flexible LED strip positioned in the channels of a miniature base.",
    1000,
    750,
  ),
  result: originalImage(
    "led-installation-result.webp",
    "Completed miniature with the base lighting illuminated.",
    1000,
    750,
  ),
  transformationDetail: originalImage(
    "transformation-detail.webp",
    "Original ElvensForge miniature detail study.",
    1000,
    1200,
  ),
  transformationLight: originalImage(
    "transformation-illuminated.webp",
    "Original ElvensForge illuminated miniature study.",
    1000,
    1200,
  ),
  galleryVoidDragon: originalImage(
    "gallery-void-dragon.webp",
    "Void Dragon miniature demonstrating the effect of base illumination.",
    1000,
    1200,
  ),
  galleryNightbringer: originalImage(
    "gallery-nightbringer.webp",
    "Nightbringer miniature demonstrating LED base illumination.",
    1000,
    1200,
  ),
  galleryPsychomancer: originalImage(
    "gallery-psychomancer.webp",
    "Psychomancer miniature shown with illuminated scenery.",
    1000,
    1200,
  ),
};
export const steps = [
  {
    title: "Choose Your Base",
    description: "Find the size and design that fits your miniature.",
    image: homeMedia.wiring,
    label: "Base & wiring layout",
  },
  {
    title: "Add Your Lighting",
    description:
      "Our precision-designed channels help position flexible LED strips exactly where you want them.",
    image: homeMedia.strip,
    label: "LED positioning",
  },
  {
    title: "Bring It to Life",
    description:
      "Complete your miniature and reveal an extraordinary illuminated effect.",
    image: homeMedia.result,
    label: "Illuminated result",
  },
];
export const gallery = [
  {
    title: "Void Dragon",
    image: homeMedia.galleryVoidDragon || homeMedia.hero,
    label: "Void Dragon photograph",
  },
  {
    title: "Nightbringer",
    image: homeMedia.galleryNightbringer || homeMedia.mobileHero,
    label: "Nightbringer photograph",
  },
  {
    title: "Psychomancer",
    image: homeMedia.galleryPsychomancer,
    label: "Psychomancer photograph",
  },
];
export const missingHomeAssets = Object.entries(homeMedia)
  .filter(([, image]) => !image)
  .map(([key]) => key);
