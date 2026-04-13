import { NextRequest, NextResponse } from "next/server";

export function authMiddleware(_request: NextRequest) {
  // Placeholder auth middleware.
  // TODO: Add real auth checks once login/register/session flows are finalized.
  // TODO: Handle protected/public route rules and redirects.
  return NextResponse.next();
}
