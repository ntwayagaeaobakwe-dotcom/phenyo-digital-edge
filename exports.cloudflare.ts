import { retryDueContactSubmissions } from "./src/lib/contact-outbox";

type ScheduledEnvironment = Parameters<typeof retryDueContactSubmissions>[0];

export async function scheduled(
  _controller: ScheduledController,
  environment: ScheduledEnvironment,
): Promise<void> {
  await retryDueContactSubmissions(environment);
}
