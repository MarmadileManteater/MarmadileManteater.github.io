import { defineConfig } from 'astro/config'
import { imagetools } from 'vite-imagetools'
import { cleanUpImagesIn } from '@marmadilemanteater/astro-plugins/clean-images'
import prettify from '@liquify/prettify'
import { fileURLToPath } from 'url'
import { join } from 'path'
import { readFile, writeFile } from 'fs/promises'
import jsdom from 'jsdom'
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
      name: '💄 Pretty print HTML w/ @liquify/prettify',
      hooks: {
        'astro:build:done': async function (options) {
          const outputDir = fileURLToPath(options.dir)
          const outputFiles = options.pages.map(({
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
      /*
      assetsInlineLimit: Infinity,
      */
    }
  }
});
