import { readdir, rm } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const publicOutput = fileURLToPath(new URL("../.output/public/", import.meta.url));

async function removeSourceMaps(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  await Promise.all(
    entries.map(async (entry) => {
      const path = join(directory, entry.name);

      if (entry.isDirectory()) {
        await removeSourceMaps(path);
      } else if (entry.name.endsWith(".map")) {
        await rm(path);
      }
    }),
  );
}

await removeSourceMaps(publicOutput);
