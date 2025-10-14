import { defineConfig } from 'vite'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        masonry: resolve(__dirname, 'pages/masonry.html'),
        pavers: resolve(__dirname, 'pages/pavers.html'),
        concrete: resolve(__dirname, 'pages/concrete.html'),
      },
    },
  },
});

