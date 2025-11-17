import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  build: {
    // Enable tree shaking and code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@heroui/react'],
          icons: ['@heroicons/react', 'lucide-react'],
          
          // Feature-based chunks
          maps: ['@googlemaps/react-wrapper', '@googlemaps/js-api-loader'],
          animations: ['framer-motion'],
          utils: ['clsx', 'tailwind-merge']
        },
        // Optimize chunk file names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },
    // Enable minification and tree shaking
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        unused: true // Remove unused code
      },
      mangle: {
        safari10: true
      }
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Enable source maps for debugging (optional)
    sourcemap: false
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@heroui/react',
      'lucide-react',
      '@googlemaps/react-wrapper'
    ],
    exclude: [
      // Exclude heavy libraries that don't need pre-bundling
      'framer-motion',
      'gsap'
    ]
  },
  // Enable modern browser features
  esbuild: {
    target: 'es2020',
    drop: ['console', 'debugger'] // Remove console and debugger in production
  }
});
