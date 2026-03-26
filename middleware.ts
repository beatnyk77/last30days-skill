import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/config";
import { getSessionCookie } from "better-auth";

export async function middleware(request: NextRequest) {
    const sessionCookie = getSessionCookie(request);

    // Protected routes pattern
    const isDashboard = request.nextUrl.pathname.startsWith("/dashboard");
    const isAuth = request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/signup");

    if (isDashboard && !sessionCookie) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (isAuth && sessionCookie) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/login", "/signup"],
};
