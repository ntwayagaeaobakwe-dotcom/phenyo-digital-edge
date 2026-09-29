/** Apply browser protections without restricting scripts, forms, or API connections. */
export function secureResponse(response: Response, request: Request): Response {
  const headers = new Headers(response.headers);
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Keep the editor's cross-origin preview working on development hosts.
  const url = new URL(request.url);
  if (url.hostname === "nygagency.com" || url.hostname === "www.nygagency.com") {
    headers.set("X-Frame-Options", "SAMEORIGIN");
    headers.append(
      "Content-Security-Policy",
      "frame-ancestors 'self'; object-src 'none'; base-uri 'self'",
    );
    if (url.protocol === "https:") {
      headers.set("Strict-Transport-Security", "max-age=31536000");
    }

    // Reinforce the HTML canonical in the HTTP response. This is especially
    // useful while search engines separate the domain from an old hosting
    // placeholder that they previously grouped with it.
    if (
      response.status >= 200 &&
      response.status < 300 &&
      (headers.get("content-type") ?? "").includes("text/html")
    ) {
      const pathname = url.pathname === "/" ? "/" : url.pathname.replace(/\/+$/, "");
      headers.set("Link", `<https://nygagency.com${pathname}>; rel="canonical"`);
    }
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
