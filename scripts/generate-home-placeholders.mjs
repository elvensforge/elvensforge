import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
const directory = "public/images/home";
const placeholders = [
  {
    file: "led-base-lighting.jpg",
    label: "LED BASE / LIGHTING SYSTEM",
    width: 1200,
    height: 900,
  },
  {
    file: "led-installation-wiring.jpg",
    label: "INSTALLATION / WIRING LAYOUT",
    width: 1000,
    height: 750,
  },
  {
    file: "led-installation-strip.jpg",
    label: "INSTALLATION / LED POSITIONING",
    width: 1000,
    height: 750,
  },
  {
    file: "transformation-detail.jpg",
    label: "TRANSFORMATION / DETAIL STUDY",
    width: 1000,
    height: 1200,
  },
];
const manifest = JSON.parse(
  await fs.readFile(path.join(directory, "assets.json"), "utf8"),
);
for (const item of placeholders) {
  const target = path.join(directory, item.file);
  try {
    await fs.access(target);
    console.log(`Preserved existing ${item.file}`);
    continue;
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  const { width: w, height: h, label } = item;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="100%" height="100%" fill="#101014"/><rect x="32" y="32" width="${w - 64}" height="${h - 64}" fill="none" stroke="#47414e"/><path d="M32 80V32h48" fill="none" stroke="#b42339" stroke-width="3"/><g font-family="Arial,sans-serif" text-anchor="middle"><text x="${w / 2}" y="${h * 0.4}" fill="#ece7ee" font-size="${w * 0.028}" letter-spacing="3">${label}</text><text x="${w / 2}" y="${h * 0.49}" fill="#e591a0" font-size="${w * 0.019}" letter-spacing="2">REPLACEABLE IMAGE PLACEHOLDER</text><text x="${w / 2}" y="${h * 0.56}" fill="#bdb3c4" font-size="${w * 0.017}">Add the original ElvensForge photograph here</text><text x="${w / 2}" y="${h * 0.65}" fill="#aaa0b2" font-size="${w * 0.014}">${item.file}</text></g></svg>`;
  await sharp(Buffer.from(svg))
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(target);
  manifest.assets[item.file] = { width: w, height: h, placeholder: true };
  console.log(`Created ${item.file}`);
}
await fs.writeFile(
  path.join(directory, "assets.json"),
  JSON.stringify(manifest, null, 2) + "\n",
);
