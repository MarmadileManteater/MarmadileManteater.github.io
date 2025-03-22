import { defineConfig } from 'vite'
import { jsdocs2dts } from '@marmadilemanteater/jsdocs2dts'
import { resolve } from 'path'

let fileName = 'index'

const entry = resolve(__dirname, `src/${fileName}.js`)
const name = `@marmadilemanteater/emoji-to-othermoji${fileName !== 'index'?`/${fileName}`:''}`

export default defineConfig({
  build: {
    ssr: true,
    lib: {
      entry,
      name,
      fileName: (format) => {
        return format == 'es'?`${fileName}.js`:`${fileName}.cjs`
      }
    },
    outDir: `dist`
  },
  plugins: [jsdocs2dts(`../${fileName}.d.ts`)]
})
