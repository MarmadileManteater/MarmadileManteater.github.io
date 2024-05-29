
// @ts-check

import { fromJSONFile } from '@marmadilemanteater/dataservice/projects'
import { getAllTagsFromJSONFile } from '@marmadilemanteater/dataservice/tags'
import { getAllLinksFromJSONFile } from '@marmadilemanteater/dataservice/links'
import { fromDirectory } from '@marmadilemanteater/dataservice/blog-posts'

export const projectsRepository = fromJSONFile('../../packages/static-data/projects.json')
export const blogPostRepository = fromDirectory('../../packages/static-data/posts/', 'vs2015')
export const allTags = await getAllTagsFromJSONFile('../../packages/static-data/tags.json')
export const allLinks = await getAllLinksFromJSONFile('../../packages/static-data/links.json')
export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export const sourceUrlBase = 'https://raw.githubusercontent.com/MarmadileManteater/MyMonorepo/tree/development/websites/personal-site/'
