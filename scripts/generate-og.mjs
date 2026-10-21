import sharp from "sharp";
import { readFile } from "node:fs/promises";

const mark = await readFile("public/brand/nyg-agency-monogram.svg");
const markPng = await sharp(mark).resize(210, 210, { fit: "contain" }).png().toBuffer();
const text = Buffer.from(`
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="#15171b"/><stop offset="1" stop-color="#0b0c0e"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#g)"/>
    <path d="M0 520 H1200" stroke="#c7ccd2" stroke-opacity=".18"/>
    <path d="M930 0 V630" stroke="#c7ccd2" stroke-opacity=".14"/>
    <text x="80" y="110" fill="#aeb4bd" font-family="Arial, sans-serif" font-size="20" letter-spacing="4">NYG DIGITAL</text>
    <text x="80" y="238" fill="#f2f2ef" font-family="Arial, sans-serif" font-size="70" font-weight="600">Web Design &amp;</text>
    <text x="80" y="325" fill="#f2f2ef" font-family="Arial, sans-serif" font-size="70" font-weight="600">Development</text>
    <text x="80" y="405" fill="#aeb4bd" font-family="Arial, sans-serif" font-size="30">Based in Dubai · Working internationally</text>
    <text x="80" y="565" fill="#d8dadd" font-family="Arial, sans-serif" font-size="22">nygagency.com</text>
  </svg>`);

await sharp(text)
  .composite([{ input: markPng, left: 960, top: 210 }])
  .png({ compressionLevel: 9 })
  .toFile("public/og-image.png");
