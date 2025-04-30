import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// List of public paths that do not require authentication.
const publicPaths = ["/", "/create", "/join", "/login"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Retrieve the token using NextAuth's helper.
  const token = await getToken({
    req: request,
    secret: process.env.JWT_SECRET || "fallback_secret",
  });

  // If no token exists, redirect to the homepage (or login page if you prefer).
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Token exists so allow the request to proceed.
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
