# NYG Digital deployment

Production: https://nygagency.com

React 19, TanStack Start, Vite and Nitro server rendering run on the existing Cloudflare Worker. Deploy the full server and assets output; static file hosting alone does not run these routes and metadata.

## Current release — 21 October 2026

- Worker: `ntwayagaeaobakwe-dotcom-phenyo-digital-edge`.
- Verified route: `*nygagency.com/*`, zone `nygagency.com`.
- Published version: `0b36de1a-d689-4a14-9e9a-d4d6afd88c25`.
- Previous stable version for recovery: `f2207793-641f-47f6-97fb-2679565a194c`.
- Release scope: the completed agency redesign and SEO work, plus Sentry error monitoring, tracing, release metadata and private browser source-map uploads.
- Published directly with Wrangler; no Git commit or push performed by this release task.

## Build and deploy

Run from this project with the authorized Cloudflare account:

```sh
npx tsc --noEmit
npm run build
npx wrangler deploy --config .output/server/wrangler.json --keep-vars
```

The root configuration identifies the existing Worker and route. Nitro generates the deployment configuration with the server entry, module rules and ASSETS binding. Preserve remote variables with `--keep-vars`. Production metadata defaults to `https://nygagency.com`; use that origin if setting `VITE_SITE_URL` at build time. Public `VITE_` variables must never contain secrets.

## Sentry monitoring

- Organization: `nyg-digital`.
- Project: `nyg-digital-website`.
- SDK: `@sentry/tanstackstart-react` for browser, server, routing, request middleware and React error-boundary coverage.
- Production trace sampling: 20%; development trace sampling: 100%.
- The source-map upload credential stays in the ignored `.env.sentry-build-plugin` file or the deployment environment as `SENTRY_AUTH_TOKEN`.
- The build uploads browser source maps to Sentry, then removes every public `.map` file before Cloudflare deployment.

## Contact behavior

The release preserves the existing email preparation flow. Without `VITE_CONTACT_WEBHOOK_URL`, the form validates the inquiry and opens the visitor's email application; it does not deliver email itself.

For direct submission, supply an authorized HTTPS endpoint through that build-time variable, configure server validation, rate limiting and appropriate CORS, then rebuild. Test actual delivery with authorization before advertising confirmed delivery. Do not put secrets in the browser bundle or webhook URL.

## Verification and recovery

Type checking, changed-component lint, production build, and local desktop/tablet/mobile interaction checks passed. Local evidence is under `output/playwright/identity/`; published-site checks are under `output/playwright/live-identity/`. Generated evidence is ignored by Git.

After deployment check `/`, `/card`, menus, services, dialogs, contact validation, LinkedIn, canonical URLs, JSON-LD, crawl files and branding assets. Automated smoke checks must not send real inquiries.

If recovery is needed, use Cloudflare deployment history for the named Worker and previous version above, retaining the same route. This release did not migrate DNS, create a new hosting project or add an integration.
