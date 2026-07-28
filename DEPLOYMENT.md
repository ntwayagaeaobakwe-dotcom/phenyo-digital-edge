# Deployment

## This is not a static site

This project is built with **TanStack Start**, which compiles to a **Nitro** server
build (`vite build` → `.output/`). That output includes a server entry
(`src/server.ts`) that runs SSR, route loaders, and the `head()` meta/OG-tag logic
on every request. It is **not** a folder of pre-rendered HTML/CSS/JS that you can
drop onto a static file host.

**GitHub Pages only serves static files — it has no server runtime.** If you deploy
this repo's build output to GitHub Pages as-is, the site will not run correctly:
routing, SSR, and the dynamic `<head>` tags (including the OG/Twitter meta tags
added in this branch) will not work, and most requests will 404 or serve a broken
shell.

## Where this can actually run

`vite.config.ts` uses `@lovable.dev/vite-tanstack-config`, which wires up Nitro
with **Cloudflare Pages/Workers as the default target**. That works today if you
deploy to Cloudflare.

**Vercel** also supports Nitro/TanStack Start SSR natively, but it needs the Nitro
preset pointed at Vercel instead of the Cloudflare default. To target Vercel
specifically, pass the preset through to Nitro in `vite.config.ts`:

```ts
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  // Add this to override the Cloudflare default with the Vercel preset:
  vite: {
    // nitro config is merged in by @lovable.dev/vite-tanstack-config;
    // check its docs for the exact passthrough key if this doesn't apply directly —
    // the underlying Nitro option is `preset: "vercel"`.
  },
});
```

The one config change that matters: **Nitro's `preset` needs to be `"vercel"`**
instead of the Cloudflare default that `@lovable.dev/vite-tanstack-config` ships
with. Everything else (routes, SSR entry, build command) stays the same.

## Summary

| Target                   | Works out of the box? | Notes                                                             |
| ------------------------ | --------------------- | ----------------------------------------------------------------- |
| GitHub Pages             | ❌ No                 | Static-only host, no server runtime — do not use for this project |
| Cloudflare Pages/Workers | ✅ Yes                | Current default Nitro preset                                      |
| Vercel                   | ⚠️ One config change  | Needs Nitro `preset: "vercel"` instead of the Cloudflare default  |

No production deployment has been triggered as part of this branch. Review the
diff first, then deploy from whichever target you choose.

## Current Vercel status

Checked via the Vercel connector: the "Phenyo" Vercel team has **no existing
project** for this repo yet — nothing is connected or deployed there today.
Cloudflare remains the only target this build has actually run against so far.
