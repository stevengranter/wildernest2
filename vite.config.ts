import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tailwindcss(),react()],
  build: {
    outDir: "dist/client"
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3500', // The URL of your Express server
        changeOrigin: true,              // To handle cross-origin requests
        rewrite: (path) => path.replace(/^\/api/, ''), // Optionally, you can rewrite the API path
      },
    },
  },
});
