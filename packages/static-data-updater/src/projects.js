
// @ts-check

import { existsSync } from 'fs'
import { readFile } from 'fs/promises'
import { dirname, join } from 'path'
import { fetch } from 'undici'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

/**
 * @typedef EnvironmentConfig
 * @property {string} token the 🔑 personal access token provided by github
 */
/**
 * @param {string} fileName defaults to './environment.json'
 * @returns {Promise<EnvironmentConfig?>} the environment configuration (if it exists)
 */
async function getEnvironment(fileName = './environment.json') {
  try {
    /** @type {EnvironmentConfig} */
    const config = JSON.parse((await readFile(fileName))
                      .toString())
    return config
  } catch {
    return null
  }
}

/**
 * Fetches the github API using the token provided in the environment file
 * @param {string} path path proceeding endpoint
 * @param {string?} endpoint (optional) rest API endpoint
 * @param {string|EnvironmentConfig} environmentFile (optional) defaults to `./environment.json`
 * @returns {Promise<import('undici').Response>}
 */
async function fetchGithub(path, endpoint = null, environmentFile = './environment.json') {
  if (path.startsWith('https://api.github.com/'))
    path = path.substring('https://api.github.com/'.length, path.length)
  const environment = typeof environmentFile === 'string' ? await getEnvironment(environmentFile) : environmentFile
  const url = new URL(`https://api.github.com/${path}${endpoint !== null? '/' : ''}${endpoint || ''}`)
  /** @type {HeadersInit} */
  const headers = environment !== null?{
    Accept: 'application/vnd.github+json',
    Authorization: `token ${environment.token}`
  }:{}
  const response = await fetch(`${url.protocol}//${url.hostname}${url.pathname}`, {
    headers: headers || {}
  })
  return response
}

/**
 * @typedef GithubRepo
 * @property {number} stargazers_count number of people who 🌠starred the project on github
 * @property {string} commits_url
 * @property {string} releases_url
 * @property {number} forks 🍴 the number of forks of this project on GitHub
 */
/**
 * @typedef GithubCommitSecondRequest
 * @property {string} html_url 🔗github url to the commit
 */
/**
 * @typedef GithubAuthor
 * @property {string} date ⌚datetime of commit
 */
/**
 * @typedef GithubCommit
 * @property {GithubAuthor} author 
 * @property {string} url API url to commit
 */
/**
 * @typedef GithubCommitWrapper
 * @property {GithubCommit} commit
 */
/**
 * @typedef GithubRelease
 * @property {string} published_at ⌚datetime of release
 * @property {string} html_url 🔗link to the release
 */
/**
 * @typedef Ratelimited
 * @property {string} type
 */
/**
 * Updates the given projects with the github rest API
 * @param {Array<import('@marmadilemanteater/dataservice/projects').Project>} projects
 * @param {string|EnvironmentConfig} environmentFile (defaults to `./environment.json`)
 * @param {boolean} debug whether to print debug logs
 * @returns {Promise<Array<import('@marmadilemanteater/dataservice/projects').Project>>} 
 */
export async function update(projects, environmentFile = './environment.json', debug = false, log = console.log, error = console.error) {
  for (const project of projects) {
    let updated = false
    try {
      const repo = /** @type {GithubRepo} */ (await (await fetchGithub('repos', project.ghFullName, environmentFile)).json())
      if (repo.stargazers_count === undefined) {
        const error = /** @type {Ratelimited & Error} */ (new Error(`⚠ Ratelimited by GitHub API; try passing an \`--access-token=\``))
        error.type = 'ratelimited'
        throw error
      }
      if (repo.stargazers_count !== project.ghStars) {
        updated = true
        const diff = Math.abs(repo.stargazers_count - project.ghStars)
        const comparisonWord = repo.stargazers_count > project.ghStars ? 'more' : 'less'
        log(`${project.title} has ${diff} ${comparisonWord} star${diff !== 1 ? 's' : ''}.\r\n${project.ghStars}⭐ -> ${repo.stargazers_count}🌠\r\n`)
        project.ghStars = repo.stargazers_count
      }
      if (repo.forks !== project.ghForks) {
        updated = true
        const diff = Math.abs(repo.forks - project.ghForks)
        const comparisonWord = repo.forks > project.ghForks ? 'more' : 'less'
        let text = ''
        if (!isNaN(diff)) {
          text = `${project.title} has ${diff} ${comparisonWord} fork${diff !== 1 ? 's' : ''}.`
        } else {
          text = `${project.title} has new data for forks.`
        }
        log(`${text}\r\n${project.ghForks} -> ${repo.forks}🍴\r\n`)
        project.ghForks = repo.forks
      }
      if (project.pullUpdatedInfoFrom === 'commits') {
        const commitsUrl = repo.commits_url.split('{')[0]
        const commits = /** @type {GithubCommitWrapper[]} */ (await (await fetchGithub(commitsUrl, null, environmentFile)).json())
        if (commits.length > 0) {
          if (project.lastUpdate !== commits[0].commit.author.date) {
            updated = true
            project.lastUpdate = commits[0].commit.author.date
            await log(`${project.title} has a new commit!\r\n\`lastUpdate\` -> \`${project.lastUpdate}\``)
          }
          const { html_url }= /** @type {GithubCommitSecondRequest} */ (await (await fetchGithub(commits[0].commit.url, null, environmentFile)).json())
          if (project.lastUpdateUrl !== html_url) {
            
            updated = true
            project.lastUpdateUrl = html_url
            await log(`\`lastUpdateUrl\` -> ${project.lastUpdateUrl}\r\n`)
          }
        }
      }
      if (project.pullUpdatedInfoFrom === 'releases') {
        const releasesUrl = repo.releases_url.split('{')[0]
        const releases = /** @type {GithubRelease[]} */ (await (await fetchGithub(releasesUrl, null, environmentFile)).json())
        if (releases.length > 0) {
          if (project.lastUpdate !== releases[0].published_at) {
            updated = true
            project.lastUpdate = releases[0].published_at
            await log(`${project.title} has a new release!\r\n\`lastUpdate\` -> \`${project.lastUpdate}\``)
          }
          if (project.lastUpdateUrl !== releases[0].html_url) {
            updated = true
            project.lastUpdateUrl = releases[0].html_url
            await log(`\`lastUpdateUrl\` -> ${project.lastUpdateUrl}\r\n`)
          }
        }
      }
    } catch (exception) {
      error(exception, `\r\n⚠ ${project.title} failed to complete its update.`)
      // if ratelimited, end there
      if ('type' in exception && exception['type'] === 'ratelimited')
        error('Since this is a ratelimited error, the update sequence will now end.')
        break
    }
    if (!updated && debug) {
      log(`[DEBUG]: ${project.title} was not updated.`)
    }
  }
  return projects
}

/**
 * @param {import('@marmadilemanteater/dataservice/projects').Project[]} projects 
 * @param {string} outDirectory 📁directory to output files to
 * @param {number} width defaults to `150px`
 * @param {boolean} debug whether to print debug logs
 * @returns {Promise<void>}
 */
export async function unhotlinkImages(projects, outDirectory, width = 150, debug = false) {
  for (let project of projects) {
    try {
      const fileName = join(outDirectory, `${sanitizeTitle(project.title)}.webp`)
      if (!existsSync(fileName)) {
        /** @type {string|ArrayBuffer} */
        let thumbnailOrLocalFile
        // no thumbnail found, downloading thumbnail
        if (project.thumbnail.startsWith("https")) {
          const projectThumbnail = await fetch(project.thumbnail)
          if (projectThumbnail.body !== null) {
            // finish downloading the file for sharp
            thumbnailOrLocalFile = await projectThumbnail.arrayBuffer()
          } else {
            throw new Error('Image failed to download')
          }
        } else {
          const __dirname = dirname(fileURLToPath(import.meta.url))
          thumbnailOrLocalFile = join(__dirname, '../../static-data/public/', project.thumbnail)
        }
        // utils.promisfy isn't compatible with sharp's callback notation
        /** @type {import('sharp').OutputInfo} */
        const info = await new Promise((resolve, reject) => {
          sharp(thumbnailOrLocalFile)
            // resize the image to the given width
            .resize(width)
            // output the resized image to webp
            .toFile(fileName, (err, info) => {
              if (err) {
                return reject(err)
              }
              resolve(info)
            })
        })
        console.log(`Successfully downloaded image for ${project.title} to ${fileName}!\r\nDetails:\r\n`, info)

      } else if (debug) {
        console.log(`[DEBUG]: Skipping \`${project.title}\` because there is already a thumbnail for it.`)
      }
    } catch (exception) {
      console.error(exception, `\r\n⚠ ${project.title} failed to complete its process.`)
    }
  }
}

/**
 * 🧹 remove common symbols in my titles which do not fit into ntfs
 * @param {string} title 
 */
export function sanitizeTitle(title) {
  return title
          .replace(/\?/g, "")
          .replace(/!/g, "")
}
