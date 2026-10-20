import type { Metadata } from "next";
import Storefront from "./storefront";
import "./shop.css";
export const metadata: Metadata = {
  title: "Shop | ElvensForge",
  description:
    "Explore 3D-printed LED miniature bases and tabletop accessories from ElvensForge.",
};
export default function ShopPage() {
  return <Storefront />;
}
