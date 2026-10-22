import * as Sentry from "@sentry/tanstackstart-react";

const SENTRY_DSN =
  "https://e56e939aebbf6cbda8dbbf2bb8232e2e@o4512259174236160.ingest.us.sentry.io/4512294623313920";

Sentry.init({
  dsn: SENTRY_DSN,
  environment: import.meta.env.MODE,
  // Inquiry or visitor IP data is not needed for debugging. Keep it out of
  // both error events and transactions even if an SDK integration adds it.
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
