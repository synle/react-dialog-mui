// vite.config.js
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    // this is mostly for local dev storybook to reference local module
    alias: {
      'react-dialog-mui': path.resolve(__dirname, 'src/components'),
    },
  },
  test: {
    global: true,
    environment: 'jsdom',
  },
});
