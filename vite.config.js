import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import orderHandler from './api/order.js'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables for local development server
  const env = loadEnv(mode, process.cwd(), '');
  if (env.TELEGRAM_BOT_TOKEN) {
    process.env.TELEGRAM_BOT_TOKEN = env.TELEGRAM_BOT_TOKEN;
  }
  if (env.TELEGRAM_CHAT_ID) {
    process.env.TELEGRAM_CHAT_ID = env.TELEGRAM_CHAT_ID;
  }

  return {
    plugins: [
      react(),
      {
        name: 'api-order-server',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === '/api/order' || req.url?.startsWith('/api/order?')) {
              try {
                await orderHandler(req, res);
              } catch (err) {
                console.error('Error in /api/order middleware:', err);
                if (!res.headersSent) {
                  res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
                  res.end(JSON.stringify({ ok: false, error: 'Internal Server Error' }));
                }
              }
              return;
            }
            next();
          });
        }
      }
    ],
  server: {
    port: 5173,
    open: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/react-router-dom/')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/lucide-react/')) {
            return 'vendor-icons';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1200
  }
};
})
