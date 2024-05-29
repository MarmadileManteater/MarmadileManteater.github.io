
// @ts-check
import rss from '@astrojs/rss'
import { blogPostRepository } from '../../dataservice'
// @ts-ignore
import jsdom from 'jsdom'
const { JSDOM } = jsdom

/**
 * @param {import('astro').APIContext} context 
 */
export async function GET(context) {
  /** @type {import('@marmadilemanteater/dataservice/blog-posts').BlogPost[]} */
  const posts = await Promise.all((await blogPostRepository.getAllIdsSorted()).map(async (id) => await blogPostRepository.getBlogPost(id)))
  // fallback to using the current site url (useful for local dev)
  const site = context.site?.toString() || context.url.toString().replace(context.url.pathname, '')
  return rss({
    title: 'Emma\'s Blog!',
    description: 'my blog; 🤷‍♀️ i guess',
    site: new URL('/blog/', site).toString(),
    items: posts.map((post) => {
      const doc = new JSDOM(post.html)
      // convert absolute links into links containing the site url
      Array.from(doc.window.document.querySelectorAll('img[src^="/blog/"]')).map(
        /**
         * @param {Element} img 
         */
        (img) => {
          const src = img.getAttribute('src')
          img.setAttribute('src', new URL(src || '', site.toString()).toString())
        }
      )
      return {
        title: post.title,
        pubDate: new Date(post.gitDate),
        description: post.shortDescription,
        content: doc.window.document.querySelector('root div').innerHTML,
        link: post.id
      }
    }),
    customData: '<language>en-us</language>'
  })
}
