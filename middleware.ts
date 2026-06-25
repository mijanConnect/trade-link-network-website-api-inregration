import { NextRequest, NextResponse } from "next/server";

function getRole(token: string) {
  try {
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString(),
    );

    return payload?.role;
  } catch {
    return null;
  }
}

// Define routes that require authentication
const protectedRoutes = [
  "/trade-person",
  "/profile",
  "/my-jobs",
  "/post-service",
];

// Define auth routes (only accessible if NOT logged in)
const authRoutes = [
  "/login",
  "/register",
  "/professional-register",
  "/register-professional",
  "/forgot-password",
  "/update-password",
  "/verify-otp",
  "/verify-register-otp"
];

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const token = req.cookies.get("accessToken")?.value;

  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isTradePersonRoute = pathname.startsWith("/trade-person");

  // 1. If there's no token and user tries to access a protected route, redirect to /login
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 2. If there's no token, allow access to public routes (including auth routes)
  if (!token) {
    return NextResponse.next();
  }

  // --- From here, user is authenticated ---
  const role = getRole(decodeURIComponent(token));

  // 3. Prevent logged-in users from accessing auth pages (like /login or /register)
  if (isAuthRoute) {
    if (role === "PROFESSIONAL") {
      return NextResponse.redirect(new URL("/trade-person/leads", req.url));
    }
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 4. Role-based access control for /trade-person
  if (isTradePersonRoute && role !== "PROFESSIONAL") {
    // Non-professionals cannot access /trade-person routes
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 5. Professionals should be directed to their dashboard instead of public/client pages
  if (role === "PROFESSIONAL" && !isTradePersonRoute) {
    return NextResponse.redirect(new URL("/trade-person/leads", req.url));
  }

  return NextResponse.next();
}

// Optimize matcher to ignore static files and API routes
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
