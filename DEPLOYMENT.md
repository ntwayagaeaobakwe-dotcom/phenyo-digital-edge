# NYG Agency deployment

Production: https://nygagency.com

React 19, TanStack Start, Vite and Nitro server rendering run on the existing Cloudflare Worker. Deploy the full server and assets output; static file hosting alone does not run these routes and metadata.

## Current release — 6 September 2026

- Worker: `ntwayagaeaobakwe-dotcom-phenyo-digital-edge`.
- Verified route: `*nygagency.com/*`, zone `nygagency.com`.
- Published version: `b4ca9d15-2558-4c06-a475-78d2a09caa5c`.
- Previous version for recovery: `c5ee21a8-e075-42d3-95e2-ea241b0e33c4`.
- Published directly with Wrangler; no Git commit or push performed by this release task.

## Build and deploy

Run from this project with the authorized Cloudflare account:

```sh
npx tsc --noEmit
npm run build
npx wrangler deploy --config .output/server/wrangler.json --keep-vars
```

The root configuration identifies the existing Worker and route. Nitro generates the deployment configuration with the server entry, module rules and ASSETS binding. Preserve remote variables with `--keep-vars`. Production metadata defaults to `https://nygagency.com`; use that origin if setting `VITE_SITE_URL` at build time. Public `VITE_` variables must never contain secrets.

## Contact behavior

The release preserves the existing email preparation flow. Without `VITE_CONTACT_WEBHOOK_URL`, the form validates the inquiry and opens the visitor's email application; it does not deliver email itself.

For direct submission, supply an authorized HTTPS endpoint through that build-time variable, configure server validation, rate limiting and appropriate CORS, then rebuild. Test actual delivery with authorization before advertising confirmed delivery. Do not put secrets in the browser bundle or webhook URL.

## Verification and recovery

Type checking, changed-component lint, production build, and local desktop/tablet/mobile interaction checks passed. Local evidence is under `output/playwright/identity/`; published-site checks are under `output/playwright/live-identity/`. Generated evidence is ignored by Git.

After deployment check `/`, `/card`, menus, services, dialogs, contact validation, LinkedIn, canonical URLs, JSON-LD, crawl files and branding assets. Automated smoke checks must not send real inquiries.

If recovery is needed, use Cloudflare deployment history for the named Worker and previous version above, retaining the same route. This release did not migrate DNS, create a new hosting project or add an integration.
