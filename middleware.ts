import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "./routes";

export const { auth } = NextAuth(authConfig);

export default auth((req) => {
  // Extract the next URL from the request object
  const { nextUrl } = req;

  // Check if the user is logged in by evaluating req.auth
  const isLoggedIn = !!req.auth;

  // Determine if the request is for an API authentication route
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  // Determine if the request is for an authentication-related route (e.g., login, register)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Determine if the request is for a public route that doesn't require authentication
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  // If the route is an API authentication route, allow the request to proceed without interruption
  if (isApiAuthRoute) {
    return null;
  }

  // If the route is an authentication route (like login or register)
  if (isAuthRoute) {
    // If the user is already logged in, redirect them to the default logged-in page
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    // If the user is not logged in, allow them to access the login or register page
    return null;
  }

  // If the route is protected (not public) and the user is not logged in, redirect to the login page
  if (!isPublicRoute && !isLoggedIn) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  // For all other cases, allow the request to proceed without redirection
  return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
