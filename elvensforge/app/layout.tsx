import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}