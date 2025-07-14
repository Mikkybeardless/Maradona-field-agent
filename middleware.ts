import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  console.log("Middleware triggered for URL:", url.href);
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // Only matches /dashboard routes
};
