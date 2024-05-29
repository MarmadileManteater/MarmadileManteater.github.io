
import { fileURLToPath } from 'url'
import db from '../db.json' assert { type: 'json' }
import { writeFile } from 'fs/promises'
import { dirname, join } from 'path'

let sortedFeedKeys = Object.keys(db.rss).sort()
let newRss = {}
for (const key of sortedFeedKeys) {
  newRss[key] = db.rss[key]
}
db.rss = newRss

const __dirname = dirname(fileURLToPath(new URL(import.meta.url)))

await writeFile(join(__dirname, '..', 'db.json'), JSON.stringify(db, null, 2))
