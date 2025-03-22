import { resolve } from 'path'
import tsc from 'typescript'
import { readFile, writeFile, rm } from 'fs/promises'

/**
 * plugin for vite that takes a source file path and outputs a .d.ts file with the jsdocs
 * @param {string?} outputFileName
 * @returns {import('vite').Plugin}
 */
export function jsdocs2dts(outputFileName = 'index.d.ts') {
  /** @type {string} */
  let packageName
  /** @type {string} */
  let entry
  /** @type {string} */
  let outDir = 'dist'
  const name = 'jsdocs2dts'
  const buildEnd = async () => {
    // emit .d.ts files 4 jsdocs
    tsc.createProgram([entry], {
      allowJs: true,
      declaration: true,
      emitDeclarationOnly: true,
    }).emit()
  }
  const closeBundle = async () => {
    // copy .d.ts files into out dir
    let fileContents = (await readFile(entry.replace('.js', '.d.ts'))).toString()
    // allow defining type properties as deprecated
    fileContents = fileContents.replace(/⚠️deprecated/g, '@deprecated') // typescript will gut @deprecated on the same line as @property
    await writeFile(resolve(outDir, outputFileName), `declare module '${packageName}';\r\n${fileContents}`)
    await rm(entry.replace('.js', '.d.ts'))
  }
  /**
   * @param {import('vite').UserConfig} config
   */
  const config = (config) => {
    packageName = config.build.lib.name
    entry = config.build.lib.entry
    if ('outDir' in config.build) {
      outDir = config.build.outDir
    }
  }
  return {
    name,
    buildEnd,
    closeBundle,
    config
  }
}
