import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  server: { port: 4173 },
  preview: { port: 4173 },
  build: {
    target: 'es2022',
    rollupOptions: { output: { manualChunks: { vendor: ['react', 'react-dom'], query: ['@tanstack/react-query'] } } }
  },
  test: {
    include: ['src/**/*.test.{ts,tsx}'],
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary'],
      include: ['src/lib/**/*.ts', 'src/components/**/*.tsx'],
      thresholds: { lines: 90, functions: 90, statements: 90, branches: 85 }
    }
  }
});
