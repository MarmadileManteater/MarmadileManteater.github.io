
// @ts-check

import { readFile, readdir, stat } from 'fs/promises'
import { promisify } from 'util'
import { exec } from 'child_process'
import { basename, dirname, join } from 'path'
import { fileURLToPath } from 'url'
import hljs from 'highlight.js'
import hljspkg from 'highlight.js/package.json'
import jsdom from 'jsdom'
const { JSDOM } = jsdom

/** import all highlight js styles */
const styles = Object.fromEntries(
  Object.entries(
    // @ts-ignore
    import.meta.glob('../node_modules/highlight.js/styles/*.css')
  ).map(([key, value]) => {
    return [key.replace('../node_modules/highlight.js/styles/', '').replace('.css', ''), value]
  })
)

const pexec = promisify(exec)

/**
 * Returns all valid blog post ids from a directory of files
 * @param {string} directory 📁 path to look in for files
 * @returns {Promise<string[]>}
 */
export async function getAllBlogPostIds(directory) {
  // return all the files from the given directory
  return (await readdir(directory))
          // that end in `.html`
          .filter((file) => file.endsWith('.html'))
          // but only the non `.html` sections
          .map((file) => file.split('.html')[0])
}

/**
 * @param {string} directory 📁 path to look in for files
 * @returns {Promise<string[]>} all `BlogPost` ids sorted by gitDate
 */
export async function getAllBlogPostIdsSorted(directory) {
  return (await Promise.all(
    // get all blog post ids
    (await getAllBlogPostIds(directory))
      // get each blog post gitdate
      .map(async (id) => { 
        try {
          return { id, date: await getGitDateFromPath(join(directory, `${id}.html`)) }
        } catch (err) {
          console.warn(err, 'No git time set for blog post')
          return { id, date: new Date().getTime() }
        } 
      })))
    // sort them by gitdate
    .sort((a, b) => b.date - a.date)
    // only return ids
    .map(({id}) => id)
}

/**
 * @param {string} path to file
 * @returns the git date of the file in ms
 */
async function getGitDateFromPath(path) {
  const directory = dirname(path)
  const id = basename(path).replace('.html', '')
  const command = `cd ${directory} && git log --follow --pretty=format:"%h %ad %s" --date=format:'(%Y-%m-%d)' -- "${id}.html" | grep -v '80fe391'`// ignore this specific commit because it is the commit that merged the repositories
  const gitDateResult = (await pexec(command)).stdout
  return Date.parse(
    Array.from(
      gitDateResult
        .toString()
        .matchAll(/\(([0-9]{4}-[0-9]{2}-[0-9]{2})\)/g))[0][1]
    )
}

/**
 * @typedef BlogPost 
 * @property {'BlogPost'} type
 * @property {string} id
 * @property {string} title
 * @property {string} shortDescription
 * @property {string} html
 * @property {string[]} tags
 * @property {number} gitDate 🌿⌚ git commited datetime in ms
 * @property {number} mDate 📁⌚ file system modified datetime in ms
 **/
/**
 * Gets a `BlogPost` from a path to the `.html` file
 * @param {string} path to blog post file
 * @param {string?} hljsStyles stylesheet for highlight.js (defaults to none)
 * @returns {Promise<BlogPost>}
 */
export async function getBlogPost(path, hljsStyles = null) {
  const id = basename(path).replace('.html', '')
  const { mtimeMs } = await stat(path)
  const blogPostHTML = (await readFile(path)).toString()
  // #region Get committed date from 🌿git
  let gitDate = mtimeMs
  try {
    gitDate = await getGitDateFromPath(path)
  } catch (exception) {
    console.warn(exception, `⚠ ${exception} - this could possibly mean there is no git history, but it could also mean the command failed for any number of reasons.`)
  }
  // #endregion
  // #region 🧹Parse the HTML and remove the metadata from the markup
  const postMarkup = new JSDOM(blogPostHTML).window.document.querySelector('root')
  // Get the title
  const titleElement = postMarkup?.querySelector('#title')
  const title = titleElement?.childNodes[0].textContent || ''
  if (titleElement !== null && titleElement !== undefined)
    postMarkup?.removeChild(titleElement)
  // Get the short description
  const shortDescriptionElement = postMarkup?.querySelector('#short-description')
  const shortDescription = shortDescriptionElement?.childNodes[0].textContent || ''
  if (shortDescriptionElement !== null && shortDescriptionElement !== undefined)
    postMarkup?.removeChild(shortDescriptionElement)
  // Get the tags
  const tagsElement = postMarkup?.querySelector('#tags')
  const tagElements = Array.from(tagsElement?.childNodes?tagsElement?.childNodes:[]).filter((node) => node.textContent?.trim() !== '')
  const tags = Array.from(tagElements?tagElements:[]).map((tag) => tag.textContent || '')
  if (tagsElement !== null && tagsElement !== undefined)
    postMarkup?.removeChild(tagsElement)
  let usesHljs = false
  // Return a well-formatted object
  Array.from(postMarkup?.querySelectorAll('code') || []).map((element) => {
    usesHljs = true
    const htmlFormattedCode = hljs.highlightAuto(element.textContent || '', ['javascript', 'html']).value
    const newElement = new JSDOM(`<div id="formatted"><div>${htmlFormattedCode}</div></div>`).window.document.querySelector('#formatted')?.firstChild
    if (newElement && element.parentNode) {
      element.parentNode.insertBefore(newElement, element)
      element.parentNode.removeChild(element)
    }
  })
  // 🔨 Fix relative image links
  const images = postMarkup?.querySelectorAll("img") || []
  Array.from(images).forEach((image) => {
    let src
    if ((src = image.getAttribute('src')) !== null) {
      if (src.startsWith("./")) {
        image.setAttribute('src', src.replace("./", `/blog/${id}/`))
      }
    }
  })
  const html = postMarkup?.outerHTML
  // #endregion
  // generate cjs dirname from esm syntax
  const __dirname = dirname(fileURLToPath(import.meta.url))
  /** @type {BlogPost} */
  return {
    type: 'BlogPost',
    id,
    title,
    shortDescription,
    html: `${html}
${hljsStyles !== null ? 
  `<style>${usesHljs ?
      `/** highlight.js ${hljspkg['homepage']} **/\r\n/** https://github.com/highlightjs/highlight.js/blob/main/src/styles/${hljsStyles}.css **/\r\n\r\n${(await styles[hljsStyles]()).default.toString()}`
      : ''}</style>`
    : ''}`,
    tags,
    gitDate,
    mDate: mtimeMs
  }
}

/**
 * @callback fromDirGetAllIds
 * @returns {Promise<string[]>} all ids from the repo
 */
/**
 * @callback fromDirGetAllIdsSorted
 * @returns {Promise<string[]>} all ids from the repo sorted by git commit date
 */
/**
 * @callback fromDirGetBlogPost
 * @param {string} id the id of the blog post
 * @returns {Promise<BlogPost>}
 */
/** 
 * @typedef BlogPostRepository 
 * @type {object}
 * @property {fromDirGetAllIds} getAllIds gets all `BlogPost` ids from the repo
 * @property {fromDirGetAllIdsSorted} getAllIdsSorted gets all `BlogPost` ids from the repo sorted by git commit date
 * @property {fromDirGetBlogPost} getBlogPost gets the `BlogPost` associated with the id if it exists, throws otherwise
 */
/**
 * Creates a `BlogPostRepository` from a path to a directory
 * @param {string} directory 📁 path to look in for files
 * @param {string?} hljsStyles highlight.js stylesheet name to use
 * @returns {BlogPostRepository}
 */
export function fromDirectory(directory, hljsStyles = null) {
  return {
    async getAllIds() {
      return getAllBlogPostIds(directory)
    },
    async getAllIdsSorted() {
      return await getAllBlogPostIdsSorted(directory)
    },
    async getBlogPost(id, givenStyles = null) {
      return getBlogPost(join(directory, `${id}.html`), givenStyles || hljsStyles)
    }
  }
}
