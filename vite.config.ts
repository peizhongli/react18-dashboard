import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        math: "always",
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: {
      "@src": "/src",
      "@components": "/src/components",
      "@utils": "/src/utils",
      "@hooks": "/src/hooks",
      "@pages": "/src/pages",
      "@assets": "/src/assets",
    },
  },
  build: {
    outDir: 'docs'
  },
  server: {
    proxy: {
      "/api/weather": {
        target: "http://t.weather.itboy.net/api/weather/city",
        changeOrigin: true,
        rewrite: (path) => {
          console.log("rewrite", path.replace(/^\/api/, ""));
          return path.replace(/^\/api\/weather/, "");
        },
      },
    },
  }
})
