
// @ts-check

import { readFile } from 'fs/promises'

/**
 * @typedef Link
 * @property {string} emoji the emoji associated with this link
 * @property {string} name the text of the link
 * @property {string} url the URL to open when clicked
 */

/**
 * @param {string} pathToJSON path to the JSON file
 * @returns {Promise<Link[]>} all links stored in the file
 */
export async function getAllLinksFromJSONFile(pathToJSON) {
  return JSON.parse((await readFile(pathToJSON)).toString())
}
