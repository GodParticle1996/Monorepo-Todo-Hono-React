import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  build: {
    // Specifies the output directory for production build
    outDir: "../api/public",
    // Cleans the output directory before building
    emptyOutDir: true,
  },
  plugins: [
    // Enables TypeScript path aliases support from tsconfig.json
    tsconfigPaths(),
    
    // TanStack Router plugin configuration for route generation
    TanStackRouterVite({
      // Prefix for route files
      routeFilePrefix: "~",
      // Header comments added to generated route tree file
      routeTreeFileHeader: [
        "/* eslint-disable eslint-comments/no-unlimited-disable */",
        "/* eslint-disable */",
      ],
      // Output path for the generated route tree file
      generatedRouteTree: "./src/route-tree.gen.ts",
    }),
    
    // React plugin for JSX/TSX support and Fast Refresh
    react(),
  ],
  server: {
    // Development server proxy configuration
    proxy: {
      "/api": "http://localhost:8787",
    },
  },
});