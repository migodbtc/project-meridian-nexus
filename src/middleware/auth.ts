import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

/**
 * PUBLIC_AUTH_ROUTES: routes for unauthenticated access (login/register/etc).
 * PRIVATE_AUTH_ROUTES: auth-only routes that require a signed-in user.
 * PROTECTED_ROUTE_PREFIXES: URL prefixes (e.g. dashboard) that require auth.
 */
const PUBLIC_AUTH_ROUTES = [
  "/polaris/auth/login",
  "/polaris/auth/register",
  "/polaris/auth/forgot-password",
  "/polaris/auth/reset-password",
];
const PRIVATE_AUTH_ROUTES = ["/polaris/auth/change-password"];
const PROTECTED_ROUTE_PREFIXES = ["/polaris/dash"];

export async function authMiddleware(request: NextRequest) {
  const response = NextResponse.next({ request });

  // Call supabase client, the call current user data
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Retrieve URL and check if public, private, or protected
  const pathname = request.nextUrl.pathname;
  const isPublicAuthRoute = PUBLIC_AUTH_ROUTES.includes(pathname);
  const isPrivateAuthRoute = PRIVATE_AUTH_ROUTES.includes(pathname);
  const isProtectedRoute = PROTECTED_ROUTE_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );

  // If there is no user, and the current route is protected or a private auth
  if (!user && (isProtectedRoute || isPrivateAuthRoute)) {
    const loginUrl = new URL("/polaris/auth/login", request.url);
    loginUrl.searchParams.set("returnTo", pathname + request.nextUrl.search);
    return NextResponse.redirect(loginUrl);
  }

  // If there is a user, and the current route is a public auth route
  if (user && isPublicAuthRoute) {
    return NextResponse.redirect(
      new URL("/polaris/dash/overview", request.url),
    );
  }

  return response;
}
