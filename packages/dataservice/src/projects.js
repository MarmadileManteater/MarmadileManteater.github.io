
// @ts-check

import { readFile, writeFile } from 'fs/promises'

/**
 * @typedef ProjectButton
 * @property {string} prefix ex: `Play on`, `View on`,
 * @property {string} locationName ex: `Itch.io`, `GitHub`
 * @property {string} link 
 * @property {string} target ⚠️deprecated no longer used
 */

/** 
 * @typedef Project
 * @property {'Project'} type
 * @property {string} title the formal title of the project
 * @property {string} ghFullName the github url minus `https://github.com/` (ex: `MarmadileManteater/FreeTubeCordova`)
 * @property {string[]} tags
 * @property {string} summary
 * @property {ProjectButton[]} buttons
 * @property {string} thumbnail an image (can be 🔥hotlinked and will be 🧊de-hotlinked at build time)
 * @property {string} lastUpdate either the last time a commit was pushed or the last time a release was made
 * @property {string} lastUpdateUrl the github url associated with the last update
 * @property {'releases'|'commits'} pullUpdatedInfoFrom where to pull the last update info from
 * @property {number} ghStars ⭐ the number of stars this project has on github
 * @property {number} ghForks 🍴 the number of forks this project has on github
 */

/**
 * @param {string} pathToJSON path-like to a JSON file containing project data 📃
 * @returns {Promise<Project[]>} all projects contained in the JSON file
 */
export async function getAllProjectsFromJSON(pathToJSON) {
  /** @type {Project[]} */
  const projectsJSON = JSON.parse((await readFile(pathToJSON)).toString())
  return projectsJSON
}

/**
 * 
 * @param {Project[]} projects to be written to the file
 * @param {string} pathToJSON the file to be written to
 * @returns {Promise<void>}
 */
export async function writeAllProjectsToJSON(projects, pathToJSON) {
  const serialized = JSON.stringify(projects, null, 2)
  await writeFile(pathToJSON, serialized);
}

/**
 * @callback fromJSONGetAllProjects 
 * @returns {Promise<Project[]>} 
 */
/**
 * @callback toJSONWriteAllProjects
 * @param {Project[]} projects
 * @returns {Promise<void>}
 */
/**
 * @typedef ProjectsRepository
 * @property {fromJSONGetAllProjects} getAllProjects returns all projects contained in the repository
 * @property {toJSONWriteAllProjects} writeAllProjects writes over all projects in the repository
 */
/**
 * 
 * @param {string} pathTo path-like to a JSON file containing project data 📃
 * @returns {ProjectsRepository}
 */
export function fromJSONFile(pathTo) {
  return {
    async getAllProjects() {
      return await getAllProjectsFromJSON(pathTo)
    },
    async writeAllProjects(projects) {
      await writeAllProjectsToJSON(projects, pathTo)
    }
  }
}
