import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfig from './tsconfig.app.json';

// https://vite.dev/config/
export default defineConfig({

  esbuild: {
    tsconfigRaw: tsconfig,
  },
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
});
