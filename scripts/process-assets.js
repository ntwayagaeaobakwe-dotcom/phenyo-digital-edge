import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const brainDir = "C:\\Users\\CJ\\.gemini\\antigravity-ide\\brain\\f3994871-38df-40ec-94d4-09332e69697c";
const publicDir = path.resolve("public");
const workDir = path.join(publicDir, "work");
const texturesDir = path.join(publicDir, "textures");

// Ensure output directories exist
fs.mkdirSync(workDir, { recursive: true });
fs.mkdirSync(texturesDir, { recursive: true });

async function processImage(inputFilename, targets) {
  const inputPath = path.join(brainDir, inputFilename);
  if (!fs.existsSync(inputPath)) {
    console.error(`Input file missing: ${inputPath}`);
    return;
  }

  for (const t of targets) {
    let pipeline = sharp(inputPath);
    if (t.width && t.height) {
      pipeline = pipeline.resize(t.width, t.height, { fit: "cover", position: "center" });
    }
    if (t.format === "avif") {
      pipeline = pipeline.avif({ quality: t.quality || 55 });
    } else if (t.format === "webp") {
      pipeline = pipeline.webp({ quality: t.quality || 78 });
    } else if (t.format === "png") {
      pipeline = pipeline.png();
    } else if (t.format === "jpeg") {
      pipeline = pipeline.jpeg({ quality: t.quality || 85 });
    }

    const outputPath = path.join(publicDir, t.outputPath);
    await pipeline.toFile(outputPath);
    const stats = fs.statSync(outputPath);
    console.log(`Generated ${t.outputPath} (${(stats.size / 1024).toFixed(1)} KB)`);
  }
}

async function main() {
  console.log("Processing AI generated stills and textures...");

  // B. Hero Poster
  await processImage("hero_poster_1785694257295.png", [
    { outputPath: "hero-poster.avif", width: 1280, height: 720, format: "avif", quality: 55 },
    { outputPath: "hero-poster.webp", width: 1280, height: 720, format: "webp", quality: 78 },
  ]);

  // C. Approach Image 1
  await processImage("about_1_1785694269203.png", [
    { outputPath: "about-1.avif", width: 876, height: 692, format: "avif", quality: 55 },
    { outputPath: "about-1.webp", width: 876, height: 692, format: "webp", quality: 78 },
  ]);

  // D. Approach Image 2
  await processImage("about_2_1785694282166.png", [
    { outputPath: "about-2.avif", width: 1200, height: 800, format: "avif", quality: 55 },
    { outputPath: "about-2.webp", width: 1200, height: 800, format: "webp", quality: 78 },
  ]);

  // E. Case Study 1 Poster
  await processImage("lead_response_poster_1785694294026.png", [
    { outputPath: "work/lead-response-poster.avif", width: 960, height: 718, format: "avif", quality: 55 },
    { outputPath: "work/lead-response-poster.webp", width: 960, height: 718, format: "webp", quality: 78 },
  ]);

  // F. Case Study 2 Poster
  await processImage("ops_dispatch_poster_1785694306320.png", [
    { outputPath: "work/ops-dispatch-poster.avif", width: 720, height: 720, format: "avif", quality: 55 },
    { outputPath: "work/ops-dispatch-poster.webp", width: 720, height: 720, format: "webp", quality: 78 },
  ]);

  // G. Flow Noise Texture
  await processImage("flow_noise_texture_1785694317267.png", [
    { outputPath: "textures/flow-noise.avif", width: 1024, height: 1024, format: "avif", quality: 55 },
    { outputPath: "textures/flow-noise.png", width: 1024, height: 1024, format: "png" },
  ]);

  console.log("Asset conversion pipeline complete!");
}

main().catch(console.error);
