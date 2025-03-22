import { defineConfig } from 'astro/config'
import { imagetools } from 'vite-imagetools'
import { cleanUpImagesIn } from '@marmadilemanteater/astro-plugins/clean-images'
import prettify from '@liquify/prettify'
import { fileURLToPath } from 'url'
import { join } from 'path'
import { cp, mkdir, readFile, writeFile } from 'fs/promises'
import jsdom from 'jsdom'
import { exec } from 'child_process'
const { JSDOM } = jsdom
const SITE_NAME = 'https://marmadilemanteater.dev'
// https://astro.build/config
export default defineConfig({
  site: SITE_NAME,
  publicDir: '../../packages/static-data/public',
  integrations: [
    /** remove unused images from the output */
    cleanUpImagesIn(
      ['images/'],
      true // check all subfolders
    ),
    {
      name: 'Build emoji-used page',
      hooks: {
        'astro:build:done': async function (options) {
          const outputDir = fileURLToPath(options.dir)
          // build emoji-used page
          console.log(await new Promise((resolve, reject) => {
            exec("cd ../emoji-used && pnpm astro build", (error, stdout, stderr) => {
              if (error) {
                console.log('Failed to build `emoji-used` page')
                return reject(stderr)
              }
              resolve(stdout)
            })
          }))
          await mkdir(join(outputDir, 'emoji-used'))
          await cp('../emoji-used/dist/index.html', join(outputDir, 'emoji-used', 'index.html'))
        }
      }
    },
    {
      name: '💄 Pretty print HTML w/ @liquify/prettify',
      hooks: {
        'astro:build:done': async function (options) {
          const outputDir = fileURLToPath(options.dir)
          const outputFiles = [...options.pages, { pathname: 'emoji-used' }].map(({
            pathname
          }) => join(outputDir, pathname, 'index.html'))
          for (const file of outputFiles) {
            let html = (await readFile(file)).toString()
            const doc = new JSDOM(html)
            // fix absolute urls
            const offendingElements = doc.window.document.querySelectorAll(`[src^="${SITE_NAME}"], [href^="${SITE_NAME}"]`)
            for (const element of offendingElements) {
              let attribute = undefined
              if (element.tagName === 'IMG') {
                attribute = 'src'
              }
              if (element.tagName === 'A') {
                attribute = 'href'
              }
              if (attribute !== undefined) {
                const relativeSrc = element.getAttribute(attribute).substring(SITE_NAME.length)
                element.setAttribute(attribute, relativeSrc)
              }
            }
            html = `\r\n<!DOCTYPE HTML>\r\n${doc.window.document.body.parentElement.outerHTML}`
            const pres = Array.from(doc.window.document.querySelectorAll('pre')).map((pre) => pre.outerHTML)
            // replace all `pre` elements with placeholders
            for (let i = 0; i < pres.length; i++) {
              html = html.replace(pres[i], `<pre-${i} />`)
            }

            html = await prettify.format(`<!-- 🎀prettified by @liquify/prettify https://www.npmjs.com/package/@liquify/prettify -->${html
              .replace(/> </g, '>\r\n<')
              .replace(/></g, '>\r\n<')}`, {
              language: 'html',
              markup: {
                attributeSort: true,
                forceLeadAttribute: true,
                ignoreScripts: true
              }
            })
            // replace `pre` placeholders with their original contents
            for (let i = 0; i < pres.length; i++) {
              html = html.replace(`<pre-${i}/>`, pres[i])
            }
            await writeFile(file, html)
            console.log(`💄 Pretty printed '${file}'`)
          }
        }
      }
    }
  ],
  vite: {
    plugins: [imagetools()],
    
    build: {
      assetsInlineLimit: Infinity
    }
  }
});
