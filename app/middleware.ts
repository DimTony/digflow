import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const publicRoutes = ["/", "/login"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.includes("/_next") ||
    pathname.includes("/api/auth") ||
    pathname.includes("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET as string,
    });

    if (token && (pathname === "/login" || pathname === "/")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (
      !token &&
      !publicRoutes.some(
        (route) => pathname === route || pathname.startsWith(`${route}/`)
      )
    ) {
      const url = new URL(`/login`, request.url);
      url.searchParams.set("returnUrl", pathname);

      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);

    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
