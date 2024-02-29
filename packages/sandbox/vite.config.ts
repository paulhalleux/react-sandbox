import { resolve } from "path";

import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.lib.ts"),
      name: "Sandbox",
      fileName: "index",
    },
    rollupOptions: {
      external: ["react"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
