import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    proxy: {
      "/books": {
        target: "http://localhost:3333",
        changeOrigin: true,
      },
    },
  },
  build: { 
    chunkSizeWarningLimit: 1000,
  },
});