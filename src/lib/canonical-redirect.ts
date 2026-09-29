/** Consolidate production host and protocol variants without affecting previews. */
export function canonicalRedirect(request: Request): Response | undefined {
  const url = new URL(request.url);
  if (url.hostname !== "nygagency.com" && url.hostname !== "www.nygagency.com") return;
  if (url.protocol === "https:" && url.hostname === "nygagency.com") return;
  url.protocol = "https:";
  url.hostname = "nygagency.com";
  url.port = "";
  return Response.redirect(url.toString(), 308);
}
