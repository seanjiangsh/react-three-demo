import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

// https://vite.dev/config/
export default defineConfig({
  base: "/react-three-demo/",
  plugins: [react()],
  resolve: {
    alias: {
      "@src": resolve(__dirname, "src"),
    },
  },
});
