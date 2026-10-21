// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { sentryTanstackStart } from "@sentry/tanstackstart-react/vite";
import { loadEnv } from "vite";

// Sentry's wizard writes the local upload credential here. loadEnv keeps the
// non-VITE_ value on the build side and out of the browser bundle.
const sentryBuildEnv = loadEnv("sentry-build-plugin", process.cwd(), "SENTRY_");
const sentryAuthToken = process.env.SENTRY_AUTH_TOKEN ?? sentryBuildEnv.SENTRY_AUTH_TOKEN;
const hasSentryAuthToken = Boolean(sentryAuthToken);

export default defineConfig({
  plugins: [
    sentryTanstackStart({
      org: "nyg-digital",
      project: "nyg-digital-website",
      autoInstrumentMiddleware: false,
      authToken: sentryAuthToken,
      // Keep builds usable for contributors who do not have the upload token.
      // Production builds with SENTRY_AUTH_TOKEN upload maps and remove them
      // from the deploy output after the upload succeeds.
      sourcemaps: hasSentryAuthToken
        ? { filesToDeleteAfterUpload: ["./**/*.map"] }
        : { disable: "disable-upload" },
      release: hasSentryAuthToken
        ? {
            setCommits: { auto: true, ignoreMissing: true, ignoreEmpty: true },
            deploy: { env: "production", url: "https://nygagency.com" },
          }
        : { create: false, inject: true },
      telemetry: false,
    }),
  ],
  vite: {
    build: {
      // Generate hidden maps only when they can be uploaded and removed.
      sourcemap: hasSentryAuthToken ? "hidden" : false,
    },
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
