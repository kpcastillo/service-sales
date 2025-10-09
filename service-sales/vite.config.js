import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: './lib/main.js',
      name: 'Counter',
      fileName: 'counter',
    },
    rollupOptions: {
      input: {
        main: resolve('./src/index.html'),
        masonry: resolve('./src/masonry.html'),
        pavers: resolve('./src/pavers.html'),
        concrete: resolve('./src/concrete.html'),
        contact: resolve('./src/contact.html'),

      }
  },
})

