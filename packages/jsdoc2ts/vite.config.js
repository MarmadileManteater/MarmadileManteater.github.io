import { defineConfig } from 'vite'
import { jsdocs2dts } from './src'
import { resolve } from 'path'

const entry = resolve(__dirname, 'src/index.js')
const name = '@marmadilemanteater/jsdocs2dts'

export default defineConfig({
  build: {
    ssr: true,
    lib: {
      entry,
      name
    },
    outDir: 'dist'
  },
  // use plugin on itself
  plugins: [jsdocs2dts()]
})