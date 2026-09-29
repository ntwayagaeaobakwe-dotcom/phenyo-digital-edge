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
    assert.equal(
      result.headers.get("link"),
      status === 200 ? '<https://nygagency.com/>; rel="canonical"' : null,
    );
  }
});

test("keeps editor previews frameable and avoids HSTS on HTTP", () => {
  const preview = secureResponse(new Response("preview"), new Request("http://localhost:3000/"));
  assert.equal(preview.headers.get("x-frame-options"), null);
  assert.equal(preview.headers.get("strict-transport-security"), null);
  const www = secureResponse(
    new Response("site", { headers: { "content-type": "text/html" } }),
    new Request("https://www.nygagency.com/card"),
  );
  assert.equal(www.headers.get("x-frame-options"), "SAMEORIGIN");
  assert.equal(www.headers.get("strict-transport-security"), "max-age=31536000");
  assert.equal(www.headers.get("link"), '<https://nygagency.com/card>; rel="canonical"');
});

test("adds canonicals only to successful HTML pages", () => {
  const json = secureResponse(
    new Response("{}", { headers: { "content-type": "application/json" } }),
    new Request("https://nygagency.com/api/status"),
  );
  const missing = secureResponse(
    new Response("missing", { status: 404, headers: { "content-type": "text/html" } }),
    new Request("https://nygagency.com/missing"),
  );
  assert.equal(json.headers.get("link"), null);
  assert.equal(missing.headers.get("link"), null);
});
