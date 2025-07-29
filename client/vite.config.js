import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components/components"),
      "@utils": path.resolve(__dirname, "src/components/lib"),
      "components": path.resolve(__dirname, "src/components"), // 👈 Add this
    },
  },
});
