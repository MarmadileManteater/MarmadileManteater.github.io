
// @ts-check

import { readFile } from 'fs/promises'

/**
 * @typedef Tag
 * @property {string} name the display name of the tag
 * @property {string} link a link associated with the tag
 * @property {string[]} hashtags a list of social media hashtags associated with this tag
 */

/**
 * @param {string} pathToJSON
 * @returns {Promise<Tag[]>}
 */
export async function getAllTagsFromJSONFile(pathToJSON) {
  /** @type {Tag[]} */
  const tagsJSON = JSON.parse((await readFile(pathToJSON)).toString())
  return tagsJSON
}
