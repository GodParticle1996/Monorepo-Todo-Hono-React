import type { AuthConfig } from "@hono/auth-js";

import GitHub from "@auth/core/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { drizzle } from "drizzle-orm/d1";

import type { AppEnv } from "./types";

export default function createAuthConfig(env: AppEnv["Bindings"]): AuthConfig {
  return {
    adapter: DrizzleAdapter(drizzle(env.DB)),
    secret: env.AUTH_SECRET,
    providers: [
      GitHub({
        clientId: env.GITHUB_CLIENT_ID,
        clientSecret: env.GITHUB_CLIENT_SECRET,
      }),
    ],
  };
};
