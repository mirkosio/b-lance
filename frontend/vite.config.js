import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': '"production"',
    'process.env': '{}',
  },
  build: {
    lib: {
      entry: './src/main.jsx',
      formats: ['es'],
      fileName: () => 'blance.js',
    },
    outDir: '../app/static/build',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'blance.js',
        assetFileNames: 'blance.[ext]',
        manualChunks: undefined,
      },
    },
  },
});
