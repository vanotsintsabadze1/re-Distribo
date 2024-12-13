import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./scripts/actions/api/auth/auth";

async function redirect(request: NextRequest, pathname: string) {
  return NextResponse.redirect(new URL(pathname, request.nextUrl));
}

const allowedEndpointsForUnauthorizedUsers = ["/auth/login"];

export async function middleware(request: NextRequest) {
  const user = await getCurrentUser();

  if ("id" in user.data && allowedEndpointsForUnauthorizedUsers.includes(request.nextUrl.pathname)) {
    return redirect(request, "/products");
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
