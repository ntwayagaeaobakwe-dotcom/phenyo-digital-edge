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

## Contact workflow

The form posts to the same-origin `/api/contact` server route. The route is fail-closed until `N8N_CONTACT_WEBHOOK_URL`, `N8N_CONTACT_WEBHOOK_TOKEN`, `CONTACT_IDEMPOTENCY_TOKEN`, the D1 binding, and the existing rate-limit binding are configured. Do not use a `VITE_` variable: Vite exposes those values in the browser bundle. The webhook URL must be the n8n production webhook over HTTPS, and the workflow must verify the bearer token.

For local development, place those values in the ignored `.dev.vars` file. For production, set Worker secrets with `wrangler secret put N8N_CONTACT_WEBHOOK_URL`, `wrangler secret put N8N_CONTACT_WEBHOOK_TOKEN`, and `wrangler secret put CONTACT_IDEMPOTENCY_TOKEN`; then build and deploy only after an authorized controlled test. Preserve current Cloudflare variables with `--keep-vars`. The `CONTACT_IDEMPOTENCY_DB` D1 binding is the durable, unique-key coordination store; it contains submission IDs and processing state, not inquiry text or contact details. Apply its SQL migrations before deploying.

The route validates and normalizes fields, bounds the request body to 8 KiB, checks same-origin requests, rejects a filled honeypot, applies the `CONTACT_SUBMISSION_LIMITER` binding (5 submissions per IP per 60 seconds), and times out the n8n request after 10 seconds. It sends no personal details to application logs. The Cloudflare Worker rate-limit binding is approximate per Cloudflare location, so add a stricter Cloudflare rule or workflow-side protection if observed abuse requires it. Confirm the rate-limit namespace ID is unique in the Cloudflare account before deployment.

The browser reports success only when n8n returns HTTP success with JSON `{ "status": "accepted", "recorded": true, "submissionId": "<same-id>" }`. The workflow must claim the ID through the authenticated `/api/contact/idempotency` endpoint before touching Sheets, then confirm the row exists and mark the ID recorded. This atomic D1 claim serializes concurrent retries; if the workflow crashes after appending, its next attempt can inspect the row before appending and then finish the D1 state transition. The same `submissionId` is reused on an unchanged retry. Email notification is a separate workflow step and must never be presented as confirmed inbox delivery based on this response.

Expected n8n input fields: `submissionId`, `submittedAt`, `name`, `email`, `service`, `message`, `industryContext`, and `sourcePath`. Map those fields to matching Google Sheets columns, use the D1 claim plus a Sheet lookup to prevent duplicate rows, then attempt an email notification using the submitted details and reply-to address. Record notification status separately from the durable inquiry row. Do not mark the lead accepted if the sheet write failed.

Until the production URL, bearer token, n8n persistence response, Google Sheets mapping, and email notification path are configured and tested, the API returns a safe unavailable/error response. The form keeps its values and offers retry and a manually selected prepared-email option. Do not report the workflow as operational before a controlled end-to-end test verifies the Sheet row and email notification attempt.

## Verification and recovery

Type checking, changed-component lint, production build, and local desktop/tablet/mobile interaction checks passed. Local evidence is under `output/playwright/identity/`; published-site checks are under `output/playwright/live-identity/`. Generated evidence is ignored by Git.

After deployment check `/`, the permanent `/card` redirect to `/#contact`, menus, services, dialogs, contact validation, LinkedIn, canonical URLs, JSON-LD, crawl files and branding assets. Automated smoke checks must not send real inquiries.

If recovery is needed, use Cloudflare deployment history for the named Worker and previous version above, retaining the same route. This release did not migrate DNS, create a new hosting project or add an integration.
