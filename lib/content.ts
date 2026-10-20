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
  status: "Preview" | "In Development";
  placeholder: boolean;
};

// Replace with an authentic ElvensForge photograph. Never use a stock or generated miniature.
export const heroImage: ShowcaseImage | undefined = undefined;

// These are clearly labelled category previews, not invented individual products.
export const products: ShowcaseEntry[] = [
  {
    id: "led-miniature-bases",
    name: "LED Miniature Bases",
    category: "LED illumination",
    description:
      "Custom-designed, 3D-printed bases for bringing LED illumination into miniature projects.",
    details:
      "The flagship area of ElvensForge: miniature bases designed around light. Individual designs can be presented here with original photographs and verified information about LED integration, electronics and installation. Dimensions, compatibility and included components will be listed for each documented design.",
    status: "Preview",
    placeholder: true,
  },
  {
    id: "accessories-components",
    name: "Accessories & Components",
    category: "Project essentials",
    description:
      "Accessories and components to support illuminated miniature builds and custom tabletop projects.",
    details:
      "A space for the parts that bring an illuminated build together. Individual entries will explain the purpose, fit and installation of each accessory using verified product information. No compatibility or technical specifications are implied by this category preview.",
    status: "Preview",
    placeholder: true,
  },
  {
    id: "custom-creations",
    name: "Custom Creations",
    category: "Original designs",
    description:
      "Custom miniature projects, experimental designs and terrain shaped by art, fabrication and electronics.",
    details:
      "Explore the creative side of the forge: original miniature projects, terrain and experiments with light. This category will hold documented designs and their development stories. To discuss a particular idea or commission, contact ElvensForge directly.",
    status: "Preview",
    placeholder: true,
  },
];

export const projects: ShowcaseEntry[] = [
  {
    id: "illuminated-miniatures",
    name: "Illuminated Miniatures",
    category: "Light & paint",
    description: "Where miniature painting and LED illumination meet.",
    details:
      "This portfolio slot is reserved for an original ElvensForge project. Its project notes will describe the painting, placement of light and creative choices shown in the photograph. No finished project photograph has been supplied yet.",
    status: "Preview",
    placeholder: true,
  },
  {
    id: "led-base-designs",
    name: "LED Base Designs",
    category: "Design & fabrication",
    description: "The form and function behind illuminated miniature bases.",
    details:
      "This portfolio slot is reserved for original LED-base design photographs. Documented project notes can show the progression from 3D model to physical prototype and explain the verified construction details.",
    status: "Preview",
    placeholder: true,
  },
  {
    id: "custom-terrain",
    name: "Custom Terrain",
    category: "Tabletop worlds",
    description: "Original scenery and environments for miniature worlds.",
    details:
      "This portfolio slot is reserved for authentic terrain photographs and a description of the materials, fabrication and artistic decisions in the project. It is a gallery placeholder rather than a completed project claim.",
    status: "Preview",
    placeholder: true,
  },
  {
    id: "prototypes-experiments",
    name: "Prototypes & Experiments",
    category: "Inside the workshop",
    description:
      "Exploring ideas through modeling, electronics and hands-on tests.",
    details:
      "This portfolio slot is reserved for documented experiments and prototypes. Original workshop photographs and verified development notes can be added here without presenting an experiment as a finished commercial product.",
    status: "Preview",
    placeholder: true,
  },
];

export const pillars = [
  {
    name: "Art",
    description: "Miniature painting, aesthetics, and visual storytelling.",
  },
  {
    name: "Craft",
    description: "3D modeling, prototyping, and physical fabrication.",
  },
  {
    name: "Technology",
    description: "LED illumination, electronics, and practical engineering.",
  },
];

export type SocialPlatform = "YouTube" | "Instagram" | "Facebook" | "TikTok";
// Add verified, official HTTPS URLs only. Unconfigured networks remain invisible.
export const socialProfiles: Partial<Record<SocialPlatform, string>> = {};
export const legalLinks: { label: string; href: string }[] = [];

const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL;
function getSiteOrigin() {
  if (
    !configuredOrigin ||
    configuredOrigin.includes("IONOS_DEPLOY_NOW_SITE_URL")
  )
    return undefined;
  try {
    const url = new URL(configuredOrigin);
    return url.protocol === "https:" ? url.origin : undefined;
  } catch {
    return undefined;
  }
}
export const siteOrigin = getSiteOrigin();
export const siteDescription =
  "Illuminate your miniatures with precision-engineered LED bases, custom 3D-printed accessories, and creations designed to bring extraordinary tabletop worlds to life.";
