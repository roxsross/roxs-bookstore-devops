import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Usar variable de entorno para la URL base de la API con valor por defecto
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3333';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    proxy: {
      "/books": {
        target: API_BASE_URL,
        changeOrigin: true,
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
  },
  // Exponer las variables de entorno al código cliente
  define: {
    'process.env.API_BASE_URL': JSON.stringify(API_BASE_URL)
  }
});