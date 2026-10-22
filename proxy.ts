import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";
import { hasAdminAccess } from "@/lib/definitions";

// 1. Specify protected and public auth routes
const protectedRoutes = ["/admin", "/dashboard"];
const publicAuthRoutes = ["/login", "/signup", "/signin"];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some(
    (route) => path === route || path.startsWith(`${route}/`)
  );
  const isPublicAuthRoute = publicAuthRoutes.some(
    (route) => path === route || path.startsWith(`${route}/`)
  );

  // 2. Read session from cookie (optimistic check without hitting DB)
  const cookie = req.cookies.get("session")?.value;
  const session = await decrypt(cookie);

  // 3. Redirect to /login if user is not authenticated on a protected route
  if (isProtectedRoute && !session?.userId) {
    const loginUrl = new URL("/login", req.nextUrl);
    loginUrl.searchParams.set("from", path);
    return NextResponse.redirect(loginUrl);
  }

  // 3b. Role-based access control: only admin and editor role have access to the admin panel
  if (isProtectedRoute && !hasAdminAccess(session?.role)) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // 4. Redirect authenticated user away from login or signup
  if (isPublicAuthRoute && session?.userId) {
    const destination = hasAdminAccess(session?.role) ? "/admin" : "/";
    return NextResponse.redirect(new URL(destination, req.nextUrl));
  }

  // 5. Pass current pathname to downstream server components
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", path);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// Routes proxy should run on (excludes static assets, images, favicons)
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
