/** Consolidate production host and protocol variants without affecting previews. */
export function canonicalRedirect(request: Request): Response | undefined {
  const url = new URL(request.url);
  if (url.hostname !== "nygagency.com" && url.hostname !== "www.nygagency.com") return;

  if (url.pathname === "/card" || url.pathname === "/card/") {
    url.protocol = "https:";
    url.hostname = "nygagency.com";
    url.port = "";
    url.pathname = "/";
    url.hash = "contact";
    return Response.redirect(url.toString(), 308);
  }

  const canonicalPath = url.pathname === "/" ? "/" : url.pathname.replace(/\/+$/, "");
  if (
    url.protocol === "https:" &&
    url.hostname === "nygagency.com" &&
    canonicalPath === url.pathname
  ) {
    return;
  }
  url.protocol = "https:";
  url.hostname = "nygagency.com";
  url.port = "";
  url.pathname = canonicalPath;
  return Response.redirect(url.toString(), 308);
}
