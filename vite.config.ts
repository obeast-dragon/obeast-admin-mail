import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslintPlugin from "vite-plugin-eslint";
//解决 ：Internal server error: Failed to parse source for import analysis because the content contains invalid JS syntax. If you use tsconfig.json, make sure to not set jsx to preserve.
import vueJsx from "@vitejs/plugin-vue-jsx";

import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), eslintPlugin(), vueJsx()],
  server: {
    host: "0.0.0.0",
    port: 4309,
    open: false,
    cors: true,
    // 跨域代理配置
    proxy: {
      "/api": {
        // target: "https://mock.mengxuegu.com/mock/629d727e6163854a32e8307e", // easymock
        target: "http://localhost:9999",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, "")
      }
    }
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js"
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/var.scss";`
      }
    }
  }
});
