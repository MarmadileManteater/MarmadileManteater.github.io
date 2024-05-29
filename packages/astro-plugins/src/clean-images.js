import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { readFile, readdir, rm, stat } from 'fs/promises'
import jsdom from 'jsdom'

const {
  JSDOM
} = jsdom

/**
 * @param  {string[]} directories 📂 a list of directories to be checked
 * @param {Boolean} recursive 📁 whether or not to look in all subdirectories or not
 * @param {Boolean} (defaults to false) display debug logs
 * @returns {import('astro').AstroIntegration}
 */
export function cleanUpImagesIn(directories, recursive = false, debug = false) {
  return {
    name: '🧹Clean up unused images',
    hooks: {
      'astro:build:done': async function (options) {
        const outputDir = fileURLToPath(options.dir)
        const outputFiles = options.pages.map(({
          pathname
        }) => join(outputDir, pathname, 'index.html'))
        const imagesFound = []
        for (const file of outputFiles) {
          const htmlAsString = (await readFile(file)).toString()
          if (htmlAsString.indexOf('background-image:url') !== -1) {
            imagesFound.push(Array.from(htmlAsString.matchAll(/background-image:url\(([^)]*?)\)/g)).map(regex => regex[1])[0]);
          }
          const dom = new JSDOM(htmlAsString)
          const images = Array.from(dom.window.document.querySelectorAll(directories.map(directory => `[src^="/${directory}"]`).join(', '))).map(element => element.getAttribute('src'))
          const links = Array.from(dom.window.document.querySelectorAll(directories.map(directory => `[href^="/${directory}"]`).join(', '))).map(element => element.getAttribute('href'))
          imagesFound.push(...images)
          imagesFound.push(...links)
        }
        const filesToKeep = Array.from(new Set(imagesFound))
        for (const directory of directories) {
          const path = join(outputDir, directory)
          const filesFound = await readdir(path)
          let filesDeleted = 0
          for (const file of filesFound) {
            const relativePath = join(`/${directory}`, file).replaceAll('\\', '/')
            if (filesToKeep.indexOf(relativePath) === -1) {
              const filePath = join(path, file)
              if (!(await stat(filePath)).isDirectory()) {
                // file found in output directory, but not referenced in any html file
                if (debug) {
                  console.log(`[DEBUG]: 🧹 Removing unused image: ${relativePath}`)
                }
                filesDeleted++
                await rm(filePath)
              } else if (recursive) {
                directories.push(relativePath.substring(1))
              }
            }
          }
          if (!debug && filesDeleted !== 0) {
            console.log(`🧹 Removed ${filesDeleted} file${filesDeleted !== 1?'s':''} from ${directory}`)
          }
        }
      }
    }
  };
}
