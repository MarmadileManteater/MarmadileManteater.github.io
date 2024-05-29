
import DomParser from 'dom-parser'
import { streamToString } from './stream-to-string.js'

const { parseFromString } = new DomParser()
let input = await streamToString(process.stdin)
var parsed = parseFromString(input)
parsed.getElementsByTagName("item").forEach(item => {
  const before_html = parseFromString(item.innerHTML).getElementsByTagName("description")[0].innerHTML
  let description_html = before_html
  description_html = description_html.replace("<img", "<br/><br/> <img")
  input = input.replace(before_html, description_html)
})
console.log(input)
