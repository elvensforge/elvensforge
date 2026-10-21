import type { Metadata } from "next";
import { siteOrigin } from "./content";

export function pageMetadata(
  title: string,
  description: string,
  pathname: string,
): Metadata {
  const url = siteOrigin ? new URL(pathname, siteOrigin).href : undefined;

  const image = siteOrigin
    ? [
        {
          url: new URL("/images/brand/elvensforge-social.jpg", siteOrigin).href,
          width: 1200,
          height: 630,
          alt: "ElvensForge brand emblem supplied by ElvensForge",
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
