import { test } from "node:test";
import assert from "node:assert/strict";
import { canonicalRedirect } from "./canonical-redirect.ts";

test("production variants redirect in one hop preserving path and campaign parameters", () => {
  for (const origin of ["http://nygagency.com", "http://www.nygagency.com", "https://www.nygagency.com"]) {
    const response = canonicalRedirect(new Request(`${origin}/card?utm_source=linkedin`));
    assert.equal(response.status, 308);
    assert.equal(response.headers.get("location"), "https://nygagency.com/card?utm_source=linkedin");
  }
});

test("canonical URLs and editor/local hosts do not redirect", () => {
  for (const url of ["https://nygagency.com/", "https://nygagency.com/privacy", "http://localhost:3000/", "https://preview.example.com/", "https://nygagency.com.evil.example/"]) {
    assert.equal(canonicalRedirect(new Request(url)), undefined);
  }
});
