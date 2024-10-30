/**
 * List of publicly accessible routes
 * 
 * Routes defined here are accessible without requiring authentication.
 * Use this array to specify pages that should be available to all users,
 * including non-authenticated visitors.
 * 
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * List of authentication-related routes
 * 
 * Routes specified in this array are used for login and registration purposes.
 * If a logged-in user attempts to access these routes, they will be redirected
 * to the settings page. This is useful to prevent authenticated users from 
 * accessing the login or register pages.
 * 
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register" ,"/auth/error"];

/**
 * Prefix for API authentication routes
 * 
 * Any API route that starts with this prefix is intended for authentication 
 * purposes. This helps to organize and differentiate authentication-specific 
 * API endpoints from other API routes in the application.
 * 
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Default redirect route after successful login
 * 
 * This route is used as the destination for redirecting users after they 
 * successfully log in. Adjust this value based on where you want authenticated 
 * users to be directed immediately after logging in.
 * 
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/setting";
