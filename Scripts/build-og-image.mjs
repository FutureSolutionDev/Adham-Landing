/**
 * Composites public/images/logo.png into a 1200×630 PNG (recommended OG size).
 * Run: node scripts/build-og-image.mjs
 */
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const OUT_W = 1200;
const OUT_H = 630;
const LOGO = join(root, "public", "images", "logo.png");
const OUT = join(root, "public", "images", "og.png");

// Safe area: logo should not hit edges in Facebook/Twitter crop previews
const PADDING = 72;
const maxLogoW = OUT_W - PADDING * 2;
const maxLogoH = OUT_H - PADDING * 2;

const logoPng = await readFile(LOGO);
const logoResized = await sharp(logoPng)
  .resize({
    width: maxLogoW,
    height: maxLogoH,
    fit: "inside",
    withoutEnlargement: true,
  })
  .png()
  .toBuffer();

// Light neutral background (avoids hard crop of a small square on dark feeds)
const background = {
  r: 252,
  g: 250,
  b: 248,
  alpha: 1,
};

const canvas = await sharp({
  create: {
    width: OUT_W,
    height: OUT_H,
    channels: 4,
    background,
  },
})
  .composite([{ input: logoResized, gravity: "center" }])
  .png()
  .toBuffer();

await writeFile(OUT, canvas);
console.log(`Wrote ${OUT} (${OUT_W}×${OUT_H})`);
