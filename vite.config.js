import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      // WebP output settings
      webp: { quality: 78, effort: 4 },
      // Compress any remaining JPGs/PNGs in the build output
      jpg: { quality: 82, progressive: true },
      jpeg: { quality: 82, progressive: true },
      png: { quality: 80, speed: 4 },
      // Skip tiny images — not worth the overhead
      includePublic: true,
      logStats: true,
    }),
  ],
  // Increase the inline asset limit so tiny images get inlined as base64
  build: {
    assetsInlineLimit: 8192, // inline files < 8 KB as base64 (no extra HTTP request)
    rollupOptions: {
      output: {
        // Group assets by type for better caching
        assetFileNames: (assetInfo) => {
          const ext = assetInfo.name?.split('.').pop();
          if (/png|jpe?g|webp|avif|gif|svg/.test(ext)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (/woff2?|ttf|eot/.test(ext)) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
});
