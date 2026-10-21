import { createStart, createCsrfMiddleware, createMiddleware } from "@tanstack/react-start";
import * as Sentry from "@sentry/tanstackstart-react";

import { renderErrorPage } from "./lib/error-page";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    Sentry.captureException(error, {
      mechanism: { type: "auto.http.tanstackstart.middleware", handled: false },
    });
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

// Start installs this automatically when src/start.ts is absent; defining the
// file opts out, so re-add it explicitly to keep server functions protected
// from cross-site requests.
const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
});

const instrumentedRequestMiddleware = Sentry.wrapMiddlewaresWithSentry({
  errorMiddleware,
  csrfMiddleware,
});

export const startInstance = createStart(() => ({
  requestMiddleware: [Sentry.sentryGlobalRequestMiddleware, ...instrumentedRequestMiddleware],
  functionMiddleware: [Sentry.sentryGlobalFunctionMiddleware],
}));
