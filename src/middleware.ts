import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("auth-token")?.value;

  // Allow public access to user profile pages that start with @
  if (pathname.startsWith("/@")) {
    return NextResponse.next();
  }

  // For /login and /signup routes:
  if (pathname.startsWith("/login") || pathname.startsWith("/signup")) {
    if (token) {
      // If authenticated, redirect to home.
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  // For all other routes, if not authenticated, redirect to /login.
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Set currentPath cookie for authenticated routes.
  const res = NextResponse.next();
  res.cookies.set("currentPath", pathname);
  return res;
}

// Apply middleware to all routes except static assets.
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|auth/callback).*)"],
};
