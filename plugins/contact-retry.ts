import { definePlugin } from "nitro";
import {
  retryDueContactSubmissions,
  type ContactOutboxEnvironment,
} from "../src/lib/contact-outbox";

export default definePlugin((nitroApp) => {
  nitroApp.hooks.hook("cloudflare:scheduled", ({ env, context }) => {
    context.waitUntil(retryDueContactSubmissions(env as ContactOutboxEnvironment));
  });
});
