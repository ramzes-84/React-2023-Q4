/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["src/setupTest.ts"],
    coverage: {
      all: true,
      provider: "v8",
      include: ["src/**/*.tsx", "src/**/*.ts"],
      exclude: [
        "src/utils/test-utils.ts",
        "src/vite-env.d.ts",
        "src/store/hooks.ts",
      ],
    },
    clearMocks: true,
  },
});
