import { NextRequest, NextResponse } from "next/server";
import { parse } from "cookie";

export function middleware(request: NextRequest) {
  const cookies = parse(request.headers.get("cookie") || "");
  const access_token = cookies.Authorization;
  const { pathname } = request.nextUrl;

  if (!access_token && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (access_token && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Menentukan jalur yang akan diproses oleh middleware
export const config = {
  matcher: ["/login", "/"], 
};
