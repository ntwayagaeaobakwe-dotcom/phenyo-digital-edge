import * as Sentry from "@sentry/tanstackstart-react";

const SENTRY_DSN =
  "https://e56e939aebbf6cbda8dbbf2bb8232e2e@o4512259174236160.ingest.us.sentry.io/4512294623313920";

let initialized = false;

export function ensureSentryServerInitialized() {
  if (initialized) return;

  Sentry.init({
    dsn: SENTRY_DSN,
    environment: import.meta.env.MODE,
    // Keep visitor IPs out of issue and transaction payloads. Error context
    // does not require customer identity data for this application.
    beforeSend(event) {
      if (event.user?.ip_address) delete event.user.ip_address;
      return event;
    },
    beforeSendTransaction(event) {
      if (event.user?.ip_address) delete event.user.ip_address;
      return event;
    },
    tracesSampleRate: import.meta.env.DEV ? 1 : 0.2,
  });
  initialized = true;
}
