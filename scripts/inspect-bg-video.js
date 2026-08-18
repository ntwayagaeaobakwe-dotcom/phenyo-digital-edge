import fs from "node:fs";
import path from "node:path";
import { execFile } from "node:child_process";
import ffmpegPath from "ffmpeg-static";
import sharp from "sharp";

const inputVideo =
  "C:\\Users\\CJ\\Downloads\\Create_website_background_animation_1080p_202608171801.mp4";
const inspectDir = path.resolve(process.cwd(), "scripts", "inspect_bg");

fs.mkdirSync(inspectDir, { recursive: true });

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
  console.log("Checking video duration and info...");
  // Extract key sample frames at timestamps: 0s, 2s, 4s, 6s, 8s (approx 0%, 25%, 50%, 75%, 100%)
  const timestamps = [0, 2, 4, 6, 7.9];
  for (let i = 0; i < timestamps.length; i++) {
    const t = timestamps[i];
    const outPng = path.join(inspectDir, `sample_${i}_${t}s.png`);
    await runFfmpeg([
      "-y",
      "-ss",
      String(t),
      "-i",
      inputVideo,
      "-vframes",
      "1",
      "-q:v",
      "2",
      outPng,
    ]);
    console.log(`Extracted sample frame at ${t}s -> ${outPng}`);
  }
}

main().catch(console.error);
