import { defineConfig } from 'vite'
import { resolve } from 'path';
import postcssPresetEnv from 'postcss-preset-env';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
          main: resolve(__dirname, 'index.html'),
      },
    },
  },
  css: {
    postcss: {
      plugins: [
        postcssPresetEnv(),
        autoprefixer(),
    ]},
  },
});