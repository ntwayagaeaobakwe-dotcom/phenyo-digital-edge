import fs from "node:fs";
import path from "node:path";
import { execFile } from "node:child_process";
import ffmpegPath from "ffmpeg-static";
import sharp from "sharp";

const inputVideo =
  "C:\\Users\\CJ\\Downloads\\Create_website_background_animation_1080p_202608171801.mp4";
const outDir = path.resolve(process.cwd(), "public", "bg-video");

fs.mkdirSync(outDir, { recursive: true });

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
  console.log("Preparing scrub-optimized background videos...");

  // 1. Desktop MP4: 1600x900, H.264, GOP=6 (every 0.25s keyframe), crf=24, fastdecode, yuv420p
  const desktopMp4 = path.join(outDir, "bg-desktop.mp4");
  console.log("Generating desktop MP4 (frequent keyframes for instantaneous scroll scrubbing)...");
  await runFfmpeg([
    "-y",
    "-i",
    inputVideo,
    "-vf",
    "scale=1600:900",
    "-c:v",
    "libx264",
    "-profile:v",
    "main",
    "-level",
    "4.0",
    "-pix_fmt",
    "yuv420p",
    "-g",
    "6",
    "-keyint_min",
    "6",
    "-sc_threshold",
    "0",
    "-crf",
    "23",
    "-preset",
    "slow",
    "-movflags",
    "+faststart",
    "-an",
    desktopMp4,
  ]);
  const desktopMp4Stat = fs.statSync(desktopMp4);
  console.log(`Desktop MP4 generated: ${(desktopMp4Stat.size / (1024 * 1024)).toFixed(2)} MB`);

  // 2. Desktop WebM (VP9, keyframe every 6 frames)
  const desktopWebm = path.join(outDir, "bg-desktop.webm");
  console.log("Generating desktop WebM...");
  await runFfmpeg([
    "-y",
    "-i",
    inputVideo,
    "-vf",
    "scale=1600:900",
    "-c:v",
    "libvpx-vp9",
    "-g",
    "6",
    "-keyint_min",
    "6",
    "-b:v",
    "0",
    "-crf",
    "30",
    "-deadline",
    "good",
    "-cpu-used",
    "2",
    "-an",
    desktopWebm,
  ]);
  const desktopWebmStat = fs.statSync(desktopWebm);
  console.log(`Desktop WebM generated: ${(desktopWebmStat.size / (1024 * 1024)).toFixed(2)} MB`);

  // 3. Mobile MP4: 960x540, H.264, GOP=6, crf=26
  const mobileMp4 = path.join(outDir, "bg-mobile.mp4");
  console.log("Generating mobile MP4...");
  await runFfmpeg([
    "-y",
    "-i",
    inputVideo,
    "-vf",
    "scale=960:540",
    "-c:v",
    "libx264",
    "-profile:v",
    "baseline",
    "-level",
    "3.0",
    "-pix_fmt",
    "yuv420p",
    "-g",
    "6",
    "-keyint_min",
    "6",
    "-sc_threshold",
    "0",
    "-crf",
    "25",
    "-preset",
    "slow",
    "-movflags",
    "+faststart",
    "-an",
    mobileMp4,
  ]);
  const mobileMp4Stat = fs.statSync(mobileMp4);
  console.log(`Mobile MP4 generated: ${(mobileMp4Stat.size / (1024 * 1024)).toFixed(2)} MB`);

  // 4. WebP poster frame from ~2.5s (clean recognizable frame)
  const posterWebp = path.join(outDir, "poster.webp");
  console.log("Generating poster WebP...");
  const tempPosterPng = path.join(outDir, "temp_poster.png");
  await runFfmpeg([
    "-y",
    "-ss",
    "2.5",
    "-i",
    inputVideo,
    "-vframes",
    "1",
    "-q:v",
    "2",
    tempPosterPng,
  ]);
  await sharp(tempPosterPng)
    .resize(1600, 900, { fit: "cover" })
    .webp({ quality: 75 })
    .toFile(posterWebp);
  fs.unlinkSync(tempPosterPng);

  const posterStat = fs.statSync(posterWebp);
  console.log(`Poster WebP generated: ${(posterStat.size / 1024).toFixed(1)} KB`);

  console.log("\nAll background video derivatives successfully created!");
}

main().catch((err) => {
  console.error("Video preparation error:", err);
  process.exit(1);
});
