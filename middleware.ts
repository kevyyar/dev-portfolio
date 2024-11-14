import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Handle OPTIONS request for the upload endpoint
  if (
    request.method === "OPTIONS" &&
    request.nextUrl.pathname === "/api/upload"
  ) {
    return NextResponse.json({}, { status: 200 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
