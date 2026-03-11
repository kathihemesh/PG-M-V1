import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Routes that require authentication
const PROTECTED_ROUTES = ["/dashboard", "/rooms", "/tenants", "/payments", "/reminders", "/settings"]

// Routes that are public
const PUBLIC_ROUTES = ["/login", "/forgot-password", "/reset-password"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if it's a protected route
  const isProtectedRoute = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  )

  // Check if it's a public route
  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  )

  // Handle root path - treat as protected (dashboard)
  const isRootPath = pathname === "/"

  // If not a protected or public route, skip middleware
  if (!isProtectedRoute && !isPublicRoute && !isRootPath) {
    return NextResponse.next()
  }

  // Get the access token from cookies
  const accessToken = request.cookies.get("sb-access-token")?.value
  const refreshToken = request.cookies.get("sb-refresh-token")?.value

  // Also check for the Supabase auth cookie format
  const supabaseAuthCookie = request.cookies.getAll().find(
    (cookie) => cookie.name.startsWith("sb-") && cookie.name.endsWith("-auth-token")
  )

  const hasSession = accessToken || refreshToken || supabaseAuthCookie

  // For protected routes and root path, redirect to login if no session
  if ((isProtectedRoute || isRootPath) && !hasSession) {
    const loginUrl = new URL("/login", request.url)
    return NextResponse.redirect(loginUrl)
  }

  // For public routes, redirect to dashboard if user has a session
  if (isPublicRoute && hasSession && pathname === "/login") {
    const dashboardUrl = new URL("/dashboard", request.url)
    return NextResponse.redirect(dashboardUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
