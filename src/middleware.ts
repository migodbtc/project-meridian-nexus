import { NextRequest } from "next/server";
import { authMiddleware } from "./middleware/auth";

export function middleware(request: NextRequest) {
  // Delegate to auth middleware placeholder until auth flows are fully implemented.
  return authMiddleware(request);
}
