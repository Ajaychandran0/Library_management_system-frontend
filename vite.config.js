import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@material-ui/core": "@material-ui/core/esm",
      "@material-ui/styles": "@material-ui/styles/esm",
      "@material-ui/icons": "@material-ui/icons/esm",
    },
  },
  build: {
    optimizeDeps: {
      exclude: ["@mui/icons-material", "@mui/x-data-grid"],
    },
  },
});
