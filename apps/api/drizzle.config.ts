import { defineConfig } from "drizzle-kit";

// Only used to create migrations
// I have used wrangler to apply migrations (see package.json)
export default defineConfig({
  out: "./src/db/migrations",
  schema: "./src/db/schema/index.ts",
  dialect: "sqlite",
});
