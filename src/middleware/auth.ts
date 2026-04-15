import { createClient } from "@/utils/supabase/server";
import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

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

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isPublicAuthRoute = PUBLIC_AUTH_ROUTES.includes(pathname);
  const isPrivateAuthRoute = PRIVATE_AUTH_ROUTES.includes(pathname);
  const isProtectedRoute = PROTECTED_ROUTE_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );

  if (!user && (isProtectedRoute || isPrivateAuthRoute)) {
    const loginUrl = new URL("/polaris/auth/login", request.url);
    loginUrl.searchParams.set("returnTo", pathname + request.nextUrl.search);
    return NextResponse.redirect(loginUrl);
  }

  if (user && isPublicAuthRoute) {
    return NextResponse.redirect(new URL("/polaris/dash", request.url));
  }

  return response;
}
