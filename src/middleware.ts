import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("auth-token")?.value;

  // Allow public access to user profile pages that start with @
  if (pathname.startsWith("/@")) {
    return NextResponse.next();
  }

  // Redirect authenticated users away from login/signup
  if (pathname.startsWith("/login") || pathname.startsWith("/signup")) {
    if (token) {
      const res = NextResponse.redirect(new URL("/", req.url));
      res.headers.set("Cache-Control", "no-store"); // prevent caching
      return res;
    }
    return NextResponse.next();
  }

  // Redirect unauthenticated users trying to access protected pages
  if (!token) {
    const res = NextResponse.redirect(new URL("/login", req.url));
    res.headers.set("Cache-Control", "no-store"); // prevent caching
    return res;
  }

  // Set currentPath for authenticated users
  const res = NextResponse.next();
  res.cookies.set("currentPath", pathname);
  res.headers.set("Cache-Control", "no-store"); // prevent Netlify caching
  return res;
}

// Apply middleware to all routes except static assets and auth callback
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|auth/callback).*)"],
};
