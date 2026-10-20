import type { Metadata } from "next";
import { Cal_Sans, Geist } from "next/font/google";
import "./globals.css";
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

export const metadata: Metadata = {
  title: "ElvensForge | Forge Worlds. Create Legends.",
  description:
    "Immersive terrain, creative painting experiences and collectible artifacts for tabletop worlds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${display.variable}`}>
      <body>{children}</body>
    </html>
  );
}
