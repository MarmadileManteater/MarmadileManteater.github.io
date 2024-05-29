
// @ts-check
import { parseString } from 'xml2js'
import { promisify } from 'util'

const BASE_HOST = 'https://raw.githubusercontent.com/MarmadileManteater/MyMonorepo/development/packages/social-feed/'

const pparseString = promisify(parseString)
// load the social feed in through vite
// @ts-expect-error
const socialFeed = import.meta.glob('../../static-data/feed.xml', { as: 'raw' })

/**
 * @typedef Media
 * @property {string} mimeType
 * @property {'image'|'video'} medium 🖼`image` or 🎥`video`
 * @property {string} url 🔗
 * @property {string} alt
 */

/**
 * @typedef SocialPost
 * @property {string} title
 * @property {string} originalUrl
 * @property {string} handle
 * @property {string} authorUrl
 * @property {string} platformUrl
 * @property {string} description 
 * @property {string} content
 * @property {number} date
 * @property {Media[]} media
 */

/**
 * 
 * @param {string} host 
 * @returns {Promise<string>} xml
 */
export async function getSocialFeed(host = BASE_HOST) {
  return (await socialFeed['../../static-data/feed.xml']())
    .replaceAll(BASE_HOST, host)
}

/**
 * @returns {Promise<number>} length of the social feed
 */
export async function getSocialFeedLength() {
  const feedXML = await getSocialFeed()
  const xmldom = await pparseString(feedXML)
  const channel = xmldom.rss.channel[0]
  return channel.item.length
}

/**
 * 
 * @param {number} startRange 
 * @param {number} endRange
 * @returns {Promise<SocialPost[]>}
 */
export async function getSocialPosts(startRange, endRange = -1, host = BASE_HOST) {
  const rssFeedString = await getSocialFeed(host)
  const xmldom = await pparseString(rssFeedString)
  const channel = xmldom.rss.channel[0]
  if (endRange === -1) {
    endRange = channel.item.length
  }
  return channel.item
    .slice(startRange, endRange)
    .map(item => {
      const title = item.title[0]
      const originalUrl = item.link[0]
      const authorUrl = item.author[0].uri[0]
      const handle = item.author[0].name[0]
      const platformUrl = `https://${new URL(authorUrl).hostname}`
      const description = item.description[0]
      const content = item['content:encoded'][0]
      const date = new Date(item.pubDate[0]).getTime()
      /** @type {Media[]} */
      const media = item['media:content'].filter(content => content !== undefined).map(content => {
        const mimeType = content.$?.type
        const medium = content.$?.medium
        const url = content.$?.url
        const alt = Object.keys(content).indexOf('media:description') !== -1 ? content["media:description"][0] : ''
        /** @type {Media} */
        return {
          mimeType,
          medium,
          url,
          alt
        }
      })
      /** @type {SocialPost} */
      return {
        title,
        originalUrl,
        handle,
        authorUrl,
        platformUrl,
        description,
        content,
        date,
        media
      }
    })
}
