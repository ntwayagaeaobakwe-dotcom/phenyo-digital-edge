import { test } from "node:test";
import assert from "node:assert/strict";
import { secureResponse } from "./security-headers.ts";

test("protects successful and error responses without losing body or headers", async () => {
  for (const status of [200, 404, 500]) {
    const result = secureResponse(
      new Response("content", {
        status,
        headers: { "content-type": "text/html", "set-cookie": "sample=value; Secure; HttpOnly" },
      }),
      new Request("https://nygagency.com/"),
    );
    assert.equal(result.status, status);
    assert.equal(await result.text(), "content");
    assert.equal(result.headers.get("x-content-type-options"), "nosniff");
    assert.equal(result.headers.get("x-frame-options"), "SAMEORIGIN");
    assert.match(result.headers.get("content-security-policy"), /frame-ancestors 'self'/);
    assert.equal(result.headers.get("set-cookie"), "sample=value; Secure; HttpOnly");
  }
});

test("keeps editor previews frameable and avoids HSTS on HTTP", () => {
  const preview = secureResponse(new Response("preview"), new Request("http://localhost:3000/"));
  assert.equal(preview.headers.get("x-frame-options"), null);
  assert.equal(preview.headers.get("strict-transport-security"), null);
  const www = secureResponse(new Response("site"), new Request("https://www.nygagency.com/card"));
  assert.equal(www.headers.get("x-frame-options"), "SAMEORIGIN");
  assert.equal(www.headers.get("strict-transport-security"), "max-age=31536000");
});
