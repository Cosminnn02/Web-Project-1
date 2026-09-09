import { NextRequest, NextResponse } from "next/server";

/**
 * Serve the experience clips with a long, immutable cache.
 *
 * The files are content-hashed (e.g. yacht-e58b3f7a.mp4), so a given URL
 * always maps to the same bytes. That lets us tell the browser to cache
 * forever and never revalidate — first visit downloads once, every later
 * visit plays instantly from cache with zero round-trips. Swapping a clip
 * produces a new hash → new URL → no stale-cache confusion.
 */
export function proxy(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/videos/")) {
    const res = NextResponse.next();
    res.headers.set("Cache-Control", "public, max-age=31536000, immutable");
    return res;
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/videos/:path*",
};
