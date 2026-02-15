import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    // this is mostly for local dev storybook to reference local module
    alias: {
      'react-dialog-mui': path.resolve(__dirname, 'src/components'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      include: ['src/components/**'],
      exclude: ['src/components/types.tsx', 'src/components/ActionDialogs.tsx'],
      reporter: ['text', 'lcov'],
    },
  },
});
