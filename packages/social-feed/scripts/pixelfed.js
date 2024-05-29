
import DomParser from 'dom-parser'
import { streamToString } from './stream-to-string.js'
import { fetch } from 'undici'

const { parseFromString } = new DomParser()

let input = await streamToString(process.stdin)

var parsed = parseFromString(input)
await Promise.all(parsed.getElementsByTagName("entry").map(async entry => {
  const id = entry.getElementsByTagName("id")[0]
  const url = id.innerHTML
  const json = await (await fetch(url, {
    headers: {
      'Accept': 'application/activity+json'
    }
  })).json()

  for (var i = 1; i < json.attachment.length; i++) {
    var attachment = json.attachment[i]
    if (input.indexOf(attachment.url) === -1) {
      input = input.replace(`<media:content url="${json.attachment[0].url}" type="${json.attachment[0].mediaType}" medium="image" />`, `<media:content url="${json.attachment[0].url}" type="${json.attachment[0].mediaType}" medium="image" />\r\n				<media:content url="${attachment.url}" type="${attachment.mediaType}" medium="image" />`)
      input = input.replace(` alt="${json.attachment[0].name.replaceAll("\"", "&quot;")}">`, ` alt="${json.attachment[0].name.replaceAll("\"", "&quot;")}"> <img src="${attachment.url}" alt="${attachment.name}" />`)
    }
  }
}))
console.log(input)
