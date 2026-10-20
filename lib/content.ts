export type ShowcaseImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  position?: string;
};
export type ShowcaseEntry = {
  id: string;
  name: string;
  category: string;
  description: string;
  details: string;
  image?: ShowcaseImage;
  specifications?: { label: string; value: string }[];
  variant?: string;
  price?: string;
  status: "Preview" | "In Development";
  placeholder: boolean;
};
export const products: ShowcaseEntry[] = [
  {
    id: "led-base-preview",
    name: "LED-Ready Miniature Bases",
    category: "Flagship collection",
    description:
      "Custom 3D-printed bases designed around miniature lighting. Explore the idea, the process and the illuminated result.",
    details:
      "This is a collection preview, not an individual product listing. Verified designs, sizes, compatibility, installation requirements and product photographs will be added when the catalogue is available. Ask ElvensForge about your miniature project in the meantime.",
    status: "Preview",
    placeholder: true,
  },
];
export const pillars = [
  {
    name: "Art",
    description: "Miniature painting, atmosphere and visual storytelling.",
  },
  {
    name: "Craft",
    description: "3D modeling, physical fabrication and careful prototyping.",
  },
  {
    name: "Technology",
    description: "LED illumination, electronics and practical engineering.",
  },
];
export type SocialPlatform = "YouTube" | "Instagram" | "Facebook" | "TikTok";
export const socialProfiles: Partial<Record<SocialPlatform, string>> = {};
export const legalLinks: { label: string; href?: string }[] = [
  { label: "Shipping information" },
  { label: "Returns policy" },
  { label: "Privacy policy" },
  { label: "Terms and conditions" },
];
const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL;
export const uatOrigin = "https://home-5021050840.app-ionos.space";
export const isUat =
  process.env.NEXT_PUBLIC_DEPLOYMENT_ENV === "uat" ||
  process.env.GITHUB_REF_NAME === "UAT" ||
  configuredOrigin?.replace(/\/$/, "") === uatOrigin;
function getSiteOrigin() {
  if (
    !configuredOrigin ||
    configuredOrigin.includes("IONOS_DEPLOY_NOW_SITE_URL")
  )
    return isUat ? uatOrigin : undefined;
  try {
    const url = new URL(configuredOrigin);
    return url.protocol === "https:" ? url.origin : undefined;
  } catch {
    return undefined;
  }
}
export const siteOrigin = getSiteOrigin();
export const siteDescription =
  "Bring your miniatures to life with custom 3D-printed LED bases. Discover creative lighting solutions for tabletop gaming and miniature projects.";
