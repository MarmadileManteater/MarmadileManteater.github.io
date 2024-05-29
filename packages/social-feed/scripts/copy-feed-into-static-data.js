
import { cp, readdir, rename, readFile, writeFile, rm } from 'fs/promises'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(new URL(import.meta.url)))

const staticMediaPath = join(__dirname, '../../static-data/public/media')

try {
  await rm(staticMediaPath, { recursive: true })
} catch {
  // pass if file doesn't exist yet
}

await cp(join(__dirname, '../media'), staticMediaPath, { recursive: true })

const itchMainDir = join(__dirname, '../../static-data/public/media/img.itch.zone')

const itchGameDirectories = await readdir(itchMainDir)

const feedXMLPath = join(__dirname, '../../social-feed/feed.xml')
let feedXML = (await readFile(feedXMLPath)).toString()

for (const directory of itchGameDirectories) {
  const path = join(itchMainDir, directory, '315x250%23c')
  const newPath = join(itchMainDir, directory, '315x250')
  await rename(path, newPath)
  const urlPath =  `/img.itch.zone/${directory}/315x250%2523c`
  const newUrlPath = `/img.itch.zone/${directory}/315x250`
  // replace the links in the feed xml
  feedXML = feedXML.replaceAll(urlPath, newUrlPath)
}

const staticDataFeedXMLPath = join(__dirname, '../../static-data/feed.xml') 

await writeFile(staticDataFeedXMLPath, feedXML)
