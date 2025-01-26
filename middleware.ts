import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware function
export function middleware(request: NextRequest) {
  console.log("Running middleware on:", request.url);

  // You can modify the response here if needed
  // return NextResponse.redirect(new URL("/home", request.url));
}

// Apply middleware to all routes
export const config = {
  matcher: "/:path*", // Matches all routes
};
