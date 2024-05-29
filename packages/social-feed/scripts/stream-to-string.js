
/**
 * Converts a node readstream into a string
 * @param {NodeJS.ReadStream} stream usually `process.stdin`
 * @returns {Promise<string>}
 */
export function streamToString(stream = process.stdin) {
  return new Promise((resolve, _reject) => {
    let output = []
    stream.on('data', (data) => {
      output.push(data.toString())
    })
    stream.on('end', (code) => {
      resolve(output.join('\r\n'))
    })
  })
}
