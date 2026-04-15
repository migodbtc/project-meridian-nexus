import { NextRequest } from "next/server";
import { authMiddleware } from "./middleware/auth";

export async function proxy(request: NextRequest) {
  return authMiddleware(request);
}

export const config = {
  matcher: ["/polaris/auth", "/polaris/auth/:path*", "/polaris/dash/:path*"],
};
