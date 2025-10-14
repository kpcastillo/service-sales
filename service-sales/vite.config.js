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
        masonry: resolve('/pages/masonry.html'),
        pavers: resolve('/pages/pavers.html'),
        concrete: resolve('/pages/concrete.html'),
        contact: resolve('/pages/contact.html'),

      }
  },
})

