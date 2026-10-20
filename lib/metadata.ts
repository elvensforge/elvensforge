import type { Metadata } from "next";
import { siteOrigin } from "./content";
import { homeMedia } from "./home-content";
export function pageMetadata(
  title: string,
  description: string,
  pathname: string,
): Metadata {
  const url = siteOrigin ? new URL(pathname, siteOrigin).href : undefined;
  const original = homeMedia.hero;
  const image =
    siteOrigin && original
      ? [
          {
            url: new URL(original.src, siteOrigin).href,
            width: original.width,
            height: original.height,
            alt: original.alt,
          },
        ]
      : undefined;
  return {
    title,
    description,
    ...(url ? { alternates: { canonical: url } } : {}),
    openGraph: {
      title,
      description,
      siteName: "ElvensForge",
      type: "website",
      ...(url ? { url } : {}),
      ...(image ? { images: image } : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      ...(image ? { images: image.map((item) => item.url) } : {}),
    },
  };
}
