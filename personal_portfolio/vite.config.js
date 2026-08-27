import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),  tailwindcss()], 
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src") /*instead of directly importing from path folder we can use @ symbol to be a pathway/key */
    }
  }
});

