import type { Metadata } from "next";
import { Cal_Sans, Geist } from "next/font/google";
import "./globals.css";
import { pageMetadata } from "@/lib/metadata";
import { siteDescription } from "@/lib/content";
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});
const display = Cal_Sans({
  subsets: ["latin"],
  weight: "400",
  adjustFontFallback: false,
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = pageMetadata(
  "ElvensForge | LED Miniature Bases & Custom Creations",
  siteDescription,
  "/",
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${display.variable}`}>
      <body>
        <a className="skipLink" href="#main-content">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
