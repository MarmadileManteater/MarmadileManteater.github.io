
// @ts-check

import * as lib from '../dist/index.js'

const { parseEmojiInString } = /** @type {import('../index')} */ (lib)

describe('Are all emoji covered?', () => {
  it('some of my favorites', () => {

    let emojiList = ['🦎', '♥', '📞', '🐘', '🍴', '🎃', '🥰'].reverse()
    parseEmojiInString('🦎 ♥testadfsd 📞d sad as🐘 dsa d🍴 dsa d🎃 dsadas🥰', (_unicode, emoji) => {
      let index, popped
      if ((index = emojiList.indexOf(emoji)) !== -1) {
        popped = emojiList.splice(index, 1)[0]
      }
      expect(popped).toBe(emoji)
      return ''
    })
    expect(emojiList).toEqual([])
  })
})
