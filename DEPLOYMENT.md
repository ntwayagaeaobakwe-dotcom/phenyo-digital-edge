# NYG Digital deployment

Production: https://nygagency.com

React 19, TanStack Start, Vite and Nitro server rendering run on the existing Cloudflare Worker. Deploy the full server and assets output; static file hosting alone does not run these routes and metadata.

## Current release — 27 October 2026

- Worker: `ntwayagaeaobakwe-dotcom-phenyo-digital-edge`.
- Verified route: `*nygagency.com/*`, zone `nygagency.com`.
- Published version: `20efa77b-2cad-4b6f-b7b5-b62f5bf55927`.
- Previous stable version for recovery: `dc71a543-d796-4bf4-bcfc-1131997844c0`.
- Release scope: extend the contact webhook timeout and form wait window, and document the current D1 outbox, n8n, Sheets, and notification status behavior. No D1 migration or binding changes.
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

The form posts to the same-origin `/api/contact` server route. The route validates and normalizes fields, bounds the request body to 8 KiB, checks same-origin requests, rejects a filled honeypot, applies the `CONTACT_SUBMISSION_LIMITER` binding (5 submissions per IP per 60 seconds), and saves the full inquiry plus outbox state in `CONTACT_IDEMPOTENCY_DB` before returning success. D1 is the durable acceptance boundary; it stores contact details as well as processing status. The browser reuses the same `submissionId` for an unchanged retry.

For local development, place `N8N_CONTACT_WEBHOOK_URL`, `N8N_CONTACT_WEBHOOK_TOKEN`, and `CONTACT_IDEMPOTENCY_TOKEN` in the ignored `.dev.vars` file. Production uses Worker secrets with those names. Do not use `VITE_` variables for secrets. Preserve current Cloudflare variables with `--keep-vars`. Apply the SQL migrations before deploying. The `CONTACT_SUBMISSION_LIMITER` binding is approximate per Cloudflare location; add stricter protection if observed abuse requires it.

The Worker forwards pending D1 outbox rows to the HTTPS n8n production webhook with a 10-second timeout. The contact form waits up to 15 seconds for the Worker. A successful form message confirms only that D1 saved the inquiry; it does not claim that n8n, Google Sheets, or email delivery has completed. The scheduled Worker retry runs every five minutes and retries pending webhook deliveries up to five times. After Sheets records an inquiry, the same scheduled retry also replays inquiries whose notification is pending or failed. D1 separately tracks notification attempts, retry timing, and an attempt lease; failed notifications become `unavailable` after five provider attempts. Personal details are not written to application logs.

Expected n8n input fields: `submissionId`, `submittedAt`, `name`, `email`, `company`, `service`, `message`, `industryContext`, and `sourcePath`. The workflow must authenticate the bearer token, claim the ID through `/api/contact/idempotency`, upsert Sheets by `submissionId`, confirm the inquiry row, and acknowledge it through the same endpoint. It then claims an email attempt through `/api/contact/notification`, sends the internal notification only when that claim succeeds, and reports the result to D1 and Sheets. Its response should include `recorded: true` only after durable sheet storage and `notificationStatus: "provider_accepted"` only after the email provider accepts the internal notification. Replays of recorded submissions must continue through the notification claim; they must not stop at the Sheets acknowledgment. A provider acceptance is not inbox-delivery confirmation; verify the intended Gmail inbox before reporting the full pipeline as operational.

D1 tracks `n8n_status`, `sheets_status`, and `notification_status` separately. A saved inquiry with pending downstream status is not a lost form submission, but the downstream path remains unverified until its retry state, sheet row, and notification are checked. Use only clearly labeled owner-controlled test inquiries for production verification; do not trigger customer outreach.

## Verification and recovery

Type checking, changed-component lint, production build, and local desktop/tablet/mobile interaction checks passed. Local evidence is under `output/playwright/identity/`; published-site checks are under `output/playwright/live-identity/`. Generated evidence is ignored by Git.

After deployment check `/`, the permanent `/card` redirect to `/#contact`, menus, services, dialogs, contact validation, LinkedIn, canonical URLs, JSON-LD, crawl files and branding assets. Automated smoke checks must not send real inquiries.

If recovery is needed, use Cloudflare deployment history for the named Worker and previous version above, retaining the same route. This release did not migrate DNS, create a new hosting project or add an integration.
