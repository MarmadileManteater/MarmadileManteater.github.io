import { defineConfig } from 'vite'
import { jsdocs2dts } from '@marmadilemanteater/jsdocs2dts'
import { resolve } from 'path'
// bundles based on args
// EX: `pnpm build -- blog-posts` builds blog-posts.js
let fileName = 'index'
var argsStart
if ((argsStart = process.argv.indexOf('--')) !== -1) {
  fileName = process.argv[argsStart + 1]
}

const entry = resolve(__dirname, `src/${fileName}.js`)
const name = `@marmadilemanteater/dataservice${fileName !== 'index'?`/${fileName}`:''}`

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
    outDir: `dist/${fileName}`
  },
  plugins: [jsdocs2dts(`../../${fileName}.d.ts`)]
})
