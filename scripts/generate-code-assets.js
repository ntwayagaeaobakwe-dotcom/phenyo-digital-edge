import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const publicDir = path.resolve("public");

// 1. Build Favicon SVG & PNG Icons matching exact navbar "NYG" mark
const brandBlue = "#2b7fff"; // oklch(0.74 0.19 230) in sRGB
const textPrimary = "#f4f6fb"; // oklch(0.96 0.005 260) near white

function createFaviconSvg(size) {
  const fontSize = Math.round(size * 0.28);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${size / 2}" fill="${brandBlue}"/>
  <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="${textPrimary}" font-family="'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif" font-weight="800" font-size="${fontSize}px" letter-spacing="-0.03em">NYG</text>
</svg>`;
}

async function generateIcons() {
  console.log("Generating favicon and app icons...");

  // Write SVG favicon
  const faviconSvg = createFaviconSvg(64);
  fs.writeFileSync(path.join(publicDir, "favicon.svg"), faviconSvg);
  console.log("Generated favicon.svg");

  // Convert SVG to PNG icons
  const iconSpecs = [
    { name: "favicon.ico", size: 48, format: "png" },
    { name: "icon-192.png", size: 192, format: "png" },
    { name: "icon-512.png", size: 512, format: "png" },
    { name: "apple-touch-icon.png", size: 180, format: "png" },
  ];

  for (const spec of iconSpecs) {
    const svgStr = createFaviconSvg(spec.size);
    const outputPath = path.join(publicDir, spec.name);
    await sharp(Buffer.from(svgStr)).png().toFile(outputPath);
    const stats = fs.statSync(outputPath);
    console.log(`Generated ${spec.name} (${(stats.size / 1024).toFixed(1)} KB)`);
  }
}

// 2. Composite Open Graph Image (1200x630)
async function generateOgImage() {
  console.log("Compositing Open Graph image...");

  const width = 1200;
  const height = 630;

  // Background SVG composite with brand typography over dark blue-slate hero ground
  const overlaySvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <!-- Subtle dark vignette gradient -->
  <defs>
    <radialGradient id="vignette" cx="30%" cy="30%" r="80%">
      <stop offset="0%" stop-color="#141c2c" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#090b10" stop-opacity="0.98"/>
    </radialGradient>
  </defs>

  <rect width="${width}" height="${height}" fill="url(#vignette)"/>

  <!-- Subtle grid lines -->
  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
  </pattern>
  <rect width="${width}" height="${height}" fill="url(#grid)" />

  <!-- NYG Mark -->
  <g transform="translate(80, 80)">
    <circle cx="28" cy="28" r="28" fill="${brandBlue}"/>
    <text x="28" y="31" dominant-baseline="middle" text-anchor="middle" fill="${textPrimary}" font-family="'Plus Jakarta Sans', 'Inter', sans-serif" font-weight="800" font-size="16px" letter-spacing="-0.02em">NYG</text>
    <text x="72" y="29" dominant-baseline="middle" fill="rgba(244,246,2fb,0.6)" font-family="'JetBrains Mono', monospace" font-size="14px" letter-spacing="0.15em">NYG DIGITAL</text>
  </g>

  <!-- Headline -->
  <text x="80" y="240" fill="${textPrimary}" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="44px" letter-spacing="-0.03em">We build the systems that run</text>
  <text x="80" y="300" fill="rgba(244,246,25b,0.65)" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="44px" letter-spacing="-0.03em">growing operations — quietly,</text>
  <text x="80" y="360" fill="rgba(244,246,25b,0.65)" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="44px" letter-spacing="-0.03em">and without another hire.</text>

  <!-- Subtitle / Positioning -->
  <text x="80" y="440" fill="rgba(244,246,25b,0.5)" font-family="'Inter', sans-serif" font-weight="500" font-size="20px">Business automation &amp; web systems for Dubai real estate &amp; facility operators.</text>

  <!-- Footer Tag -->
  <g transform="translate(80, 530)">
    <rect width="200" height="34" rx="17" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
    <text x="100" y="18" dominant-baseline="middle" text-anchor="middle" fill="${brandBlue}" font-family="'JetBrains Mono', monospace" font-size="12px" font-weight="600">DUBAI, UAE (UTC+4)</text>
  </g>
</svg>`;

  // Composite over hero poster ground if available
  const heroPosterPath = path.join(publicDir, "hero-poster.avif");
  let basePipeline;

  if (fs.existsSync(heroPosterPath)) {
    basePipeline = sharp(heroPosterPath).resize(width, height, { fit: "cover" });
  } else {
    basePipeline = sharp({
      create: {
        width,
        height,
        channels: 4,
        background: { r: 9, g: 11, b: 16, alpha: 1 },
      },
    });
  }

  const compositedBuffer = await basePipeline
    .composite([{ input: Buffer.from(overlaySvg), top: 0, left: 0 }])
    .png()
    .toBuffer();

  // Save og.png
  const ogPngPath = path.join(publicDir, "og.png");
  await sharp(compositedBuffer).png({ compressionLevel: 8 }).toFile(ogPngPath);
  const ogPngStats = fs.statSync(ogPngPath);
  console.log(`Generated og.png (${(ogPngStats.size / 1024).toFixed(1)} KB)`);

  // Save og-image.jpg
  const ogJpgPath = path.join(publicDir, "og-image.jpg");
  await sharp(compositedBuffer).jpeg({ quality: 85 }).toFile(ogJpgPath);
  const ogJpgStats = fs.statSync(ogJpgPath);
  console.log(`Generated og-image.jpg (${(ogJpgStats.size / 1024).toFixed(1)} KB)`);
}

async function main() {
  await generateIcons();
  await generateOgImage();
}

main().catch(console.error);
