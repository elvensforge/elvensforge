import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// Creates only a web derivative. The original source is opened read-only and never overwritten.
const [source, filename, widthArg, heightArg] = process.argv.slice(2);
const width = Number(widthArg),
  height = Number(heightArg);
if (
  !source ||
  !/^[a-z0-9-]+\.webp$/.test(filename || "") ||
  !Number.isInteger(width) ||
  !Number.isInteger(height) ||
  width < 1 ||
  height < 1 ||
  width > 4000 ||
  height > 4000
)
  throw new Error(
    "Usage: node scripts/prepare-home-image.mjs ORIGINAL target-name.webp WIDTH HEIGHT",
  );
const target = path.resolve("public/images/home", filename);
if (path.resolve(source) === target)
  throw new Error(
    "Source and destination must differ. Keep master photographs unchanged.",
  );
try {
  await fs.access(target);
  throw new Error(
    "Destination exists. Choose a new filename or review the existing derivative first.",
  );
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}
await fs.mkdir(path.dirname(target), { recursive: true });
await sharp(source)
  .rotate()
  .resize({ width, height, fit: "contain", background: "#0c0c10" })
  .webp({ quality: 86 })
  .toFile(target);
console.log(`Created ${target}; original preserved.`);
