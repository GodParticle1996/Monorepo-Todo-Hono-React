import { authHandler } from "@hono/auth-js";
import { notFound, onError } from "stoker/middlewares";

import type { AppOpenAPI } from "./types";

import { BASE_PATH } from "./constants";
import createAuthConfig from "./create-auth-config";
import createRouter from "./create-router";

// This function creates and configures the main application
export default function createApp() {
  // Create a new router instance and configure initial middleware
  const app = createRouter()
    // Middleware to handle all routes (*)
    .use("*", (c, next) => {
      // If the request path starts with BASE_PATH, continue to next middleware
      if (c.req.path.startsWith(BASE_PATH)) {
        return next();
      }
      // For other paths, redirect to SPA's index.html (Single Page Application handling)
      const requestUrl = new URL(c.req.raw.url);
      return c.env.ASSETS.fetch(new URL("/index.html", requestUrl.origin));
    })
    // Set the base path for all routes and cast to AppOpenAPI type
    .basePath(BASE_PATH) as AppOpenAPI;

  // Configure additional middleware and error handlers
  app
    .use(
      "*",
      // Middleware to set authentication configuration
      async (c, next) => {
        c.set("authConfig", createAuthConfig(c.env));
        return next();
      },
    )
    // Add authentication handler for /auth/* routes
    .use("/auth/*", authHandler())
    // Add handlers for 404 (Not Found) and general errors
    .notFound(notFound)
    .onError(onError);

  return app;
}

// Helper function to create a test version of the app with additional routes
export function createTestApp<R extends AppOpenAPI>(router: R) {
  return createApp().route("/", router);
}
