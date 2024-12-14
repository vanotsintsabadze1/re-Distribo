import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./scripts/actions/api/auth/auth";
import { cookies } from "next/headers";

async function redirect(request: NextRequest, pathname: string) {
  return NextResponse.redirect(new URL(pathname, request.nextUrl));
}

const allowedEndpointsForUnauthorizedUsers = ["/auth/login"];

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const user = await getCurrentUser();
  const userIsValid = "id" in user.data;

  if (!token && !allowedEndpointsForUnauthorizedUsers.includes(request.nextUrl.pathname)) {
    return redirect(request, "/auth/login");
  }

  if (token && userIsValid && allowedEndpointsForUnauthorizedUsers.includes(request.nextUrl.pathname)) {
    return redirect(request, "/products");
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};
