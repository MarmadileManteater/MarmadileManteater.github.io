
// @ts-check
import { basename } from 'path'
import unicodeMap from '../unicode-emoji-map.json'

/**
 * @callback EmojiMap
 * @param {string} unicodeRep the unicode representation of the emoji
 * @param {string} emoji the original emoji
 * @returns {string} pathToImage path to an image containing a representation of the emoji
 */

/**
 * @param {string} givenEmoji ex: 🤪, 📡, 👩‍🚀
 * @param {EmojiMap} emojiMap a function which takes the raw unicode representation of an emoji and returns a path to an image file
 * @returns {string}
*/
export function emojiToOtherMoji(givenEmoji, emojiMap) {
  let { unicode } = unicodeMap[givenEmoji]
  return emojiMap(unicode.toLowerCase().replaceAll(' ', '-'), givenEmoji)
}
/**
 * 
 * @param {string} givenEmoji ex: 🤪, 📡, 👩‍🚀
 * @param {string[][]} directoryLists a list of directory listings for directories containing emoji
 * @param {EmojiMap?} extraCondition a condition to be tried before checking dir listings
 */
export function emojiToOtherMojiInDirs(givenEmoji, directoryLists, extraCondition = null) {
  if (extraCondition !== null) {
    const conditionResponse = emojiToOtherMoji(givenEmoji, extraCondition)
    if (typeof conditionResponse === 'string') {
      return conditionResponse
    }
  }

  return emojiToOtherMoji(givenEmoji, (unicode, emoji) => {
    for (let i = 0; i < directoryLists.length; i++) {
      const directory = directoryLists[i]
      for (let k = 0; k < directory.length; k++) {
        const file = directory[k]
        if (basename(file).split('.')[0] === unicode) {
          return file
        }
      }
    }
  })
}

/**
 * @typedef EmojiMatch
 * @property {string} emoji emoji representation
 * @property {string} unicode unicode representation
 */

/**
 * 
 * @param {string} text 
 * @param {EmojiMap|string[][]} emojiMapOrDirs 
 * @param {EmojiMap?} emojiMap 
 */
export function parseEmojiInString(text, emojiMapOrDirs, emojiMap = null) {
  const emojiMatches = emoji.filter((emoji) => text.indexOf(emoji) !== -1)
  /** @type {EmojiMatch[]} */
  const listOfEmojiFound = emojiMatches.map((match) => {
    const unicode = unicodeMap[match].unicode
    return {
      emoji: match,
      unicode
    }
  }).filter(({ unicode }) => unicode.length > 2)
  // Convert the list to a set to deduplicate entries
  const setOfEmojiFound = Array.from(new Set(listOfEmojiFound)).sort((a, b) => b.emoji.length - a.emoji.length)
  for (const { emoji, unicode } of setOfEmojiFound) {
    let otherMoji
    if (Array.isArray(emojiMapOrDirs)) {
      otherMoji = emojiToOtherMojiInDirs(emoji, emojiMapOrDirs, emojiMap)
    } else {
      otherMoji = emojiToOtherMoji(emoji, emojiMapOrDirs)
    }
    if (otherMoji)
      text = text.replaceAll(emoji, `<img src="${otherMoji}" alt="${unicode}" style="width: 1.5em; height: 1.5em; vertical-align: top; margin-right: 0.15em;" class="emoji" />`)
  }
  setOfEmojiFound.sort((a, b) => b.unicode.length - a.unicode.length).forEach((match) => {
    text = text.replaceAll(` alt="${match.unicode}"`, ` alt="${match.emoji}"`)
  })
  return text
}

/**
 * a non-comprehensive list of emoji
 */
export const emoji = Object.keys(unicodeMap)
