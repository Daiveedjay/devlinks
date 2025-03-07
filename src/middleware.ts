import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Get the current pathname
  const path = req.nextUrl.pathname;

  // Set the pathname in cookies
  res.cookies.set("currentPath", path);

  return res;
}

// Apply middleware to all routes (modify if needed)
export const config = {
  matcher: "/:path*",
};
