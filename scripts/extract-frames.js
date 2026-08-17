import fs from "node:fs";
import path from "node:path";
import { execFile } from "node:child_process";
import ffmpegPath from "ffmpeg-static";
import sharp from "sharp";

const inputVideo = "C:\\Users\\CJ\\Downloads\\Creating_website_hero_loop_1080p_202608171738.mp4";
const outputBase = path.resolve(process.cwd(), "public", "hero-sequence");
const desktopDir = path.join(outputBase, "desktop");
const mobileDir = path.join(outputBase, "mobile");
const tempDir = path.join(outputBase, "temp");

// Ensure directories exist
fs.mkdirSync(desktopDir, { recursive: true });
fs.mkdirSync(mobileDir, { recursive: true });
fs.mkdirSync(tempDir, { recursive: true });

console.log("Using ffmpeg binary:", ffmpegPath);
console.log("Input video:", inputVideo);

// Step 1: Extract high-quality PNGs/raw frames temporarily using ffmpeg
// 8 seconds * 24 fps ≈ 192 total frames. We can extract 72 frames for desktop and 48 for mobile.
function runFfmpeg(args) {
  return new Promise((resolve, reject) => {
    execFile(ffmpegPath, args, (error, stdout, stderr) => {
      if (error) {
        console.error("FFmpeg error:", stderr);
        return reject(error);
      }
      resolve(stdout);
    });
  });
}

async function main() {
  console.log("Extracting raw frames from video...");
  
  // Extract all frames from video to temp directory as PNG
  const tempPattern = path.join(tempDir, "frame_%04d.png");
  await runFfmpeg([
    "-y",
    "-i", inputVideo,
    "-vsync", "0",
    tempPattern
  ]);

  const rawFrames = fs.readdirSync(tempDir)
    .filter(f => f.endsWith(".png"))
    .sort();

  const totalRaw = rawFrames.length;
  console.log(`Extracted ${totalRaw} raw frames in total.`);

  if (totalRaw === 0) {
    throw new Error("No frames were extracted!");
  }

  // --- Process Desktop: Exactly 72 frames evenly sampled ---
  const DESKTOP_COUNT = 72;
  console.log(`Processing ${DESKTOP_COUNT} desktop frames (1600x900, WebP)...`);
  let desktopBytes = 0;

  for (let i = 0; i < DESKTOP_COUNT; i++) {
    const rawIndex = Math.min(
      Math.floor((i / (DESKTOP_COUNT - 1)) * (totalRaw - 1)),
      totalRaw - 1
    );
    const sourceFramePath = path.join(tempDir, rawFrames[rawIndex]);
    const frameNumStr = String(i + 1).padStart(4, "0");
    const targetPath = path.join(desktopDir, `frame-${frameNumStr}.webp`);

    const buffer = await sharp(sourceFramePath)
      .resize(1600, 900, { fit: "cover", position: "center" })
      .webp({ quality: 74, effort: 4 })
      .toBuffer();

    fs.writeFileSync(targetPath, buffer);
    desktopBytes += buffer.length;

    // Also export first frame as poster
    if (i === 0) {
      const posterPath = path.join(outputBase, "poster.webp");
      fs.writeFileSync(posterPath, buffer);
      console.log(`Saved main poster (${(buffer.length / 1024).toFixed(1)} KB) -> ${posterPath}`);
    }
  }

  console.log(`Desktop sequence complete: ${(desktopBytes / (1024 * 1024)).toFixed(2)} MB total (avg ${(desktopBytes / DESKTOP_COUNT / 1024).toFixed(1)} KB/frame).`);

  // --- Process Mobile: Exactly 48 frames evenly sampled ---
  const MOBILE_COUNT = 48;
  console.log(`Processing ${MOBILE_COUNT} mobile frames (800x450, WebP)...`);
  let mobileBytes = 0;

  for (let i = 0; i < MOBILE_COUNT; i++) {
    const rawIndex = Math.min(
      Math.floor((i / (MOBILE_COUNT - 1)) * (totalRaw - 1)),
      totalRaw - 1
    );
    const sourceFramePath = path.join(tempDir, rawFrames[rawIndex]);
    const frameNumStr = String(i + 1).padStart(4, "0");
    const targetPath = path.join(mobileDir, `frame-${frameNumStr}.webp`);

    const buffer = await sharp(sourceFramePath)
      .resize(800, 450, { fit: "cover", position: "center" })
      .webp({ quality: 72, effort: 4 })
      .toBuffer();

    fs.writeFileSync(targetPath, buffer);
    mobileBytes += buffer.length;

    if (i === 0) {
      const mobilePosterPath = path.join(outputBase, "poster-mobile.webp");
      fs.writeFileSync(mobilePosterPath, buffer);
      console.log(`Saved mobile poster (${(buffer.length / 1024).toFixed(1)} KB) -> ${mobilePosterPath}`);
    }
  }

  console.log(`Mobile sequence complete: ${(mobileBytes / (1024 * 1024)).toFixed(2)} MB total (avg ${(mobileBytes / MOBILE_COUNT / 1024).toFixed(1)} KB/frame).`);

  // Clean up temp frames
  for (const f of rawFrames) {
    fs.unlinkSync(path.join(tempDir, f));
  }
  fs.rmdirSync(tempDir);

  const totalPayloadMb = (desktopBytes + mobileBytes) / (1024 * 1024);
  console.log(`\nAll media processed successfully! Total combined payload: ${totalPayloadMb.toFixed(2)} MB.`);
}

main().catch(err => {
  console.error("Frame extraction error:", err);
  process.exit(1);
});
