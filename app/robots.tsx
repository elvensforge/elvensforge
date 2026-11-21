import type { MetadataRoute } from "next";
import { isUat } from "@/lib/content";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", ...(isUat ? { disallow: "/" } : { allow: "/" }) },
  };
}
