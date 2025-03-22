
import { spawn } from 'child_process'
import { chmod } from 'fs/promises'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

function exec(command, args = [], liveStdout = false) {
  return new Promise((resolve, reject) => {
    const output = []
    const process = spawn(command, args)
    process.stdout.on('data', (data) => {
      if (liveStdout)
        console.log(data.toString())
      output.push(data.toString())
    })
    process.stderr.on('data', (data) => {
      if (liveStdout)
        console.error(data.toString())
      output.push(data.toString())
    })
    process.on('exit', (code) => {
      if (liveStdout)
        console.log(`child process exited with code: ${code}`)
      if (code === 0) {
        resolve(output.join('\r\n'))
      } else {
        reject(output.join('\r\n'))
      }
    })
  })
}


const __dirname = dirname(fileURLToPath(new URL(import.meta.url)))

const args = process.argv
let executable_name = './bin/syndication_junction'
if (process.platform === 'win32') {
  executable_name = `${executable_name}.exe`
}
if (process.platform === 'linux') {
  // need to determine which executable to use based on which version of openssl is installed
  const versionNumber = (await exec('openssl', ['version'])).match(/[0-9]\.[0-9]\.[0-9]/g)[0]
  if (versionNumber.startsWith('1.1.1')) {
    executable_name = `${executable_name}_openssl1_1_1f`
  }
  if (versionNumber.startsWith('3')) {
    executable_name = `${executable_name}_openssl3_0_2`
  }
  if (executable_name !== './bin/syndication_junction') {
    await exec('unzip', [join(__dirname, `${executable_name}.zip`), '-d', join(__dirname, './bin/')])
    await chmod(join(__dirname, executable_name), 0o100)
  }
}

if (executable_name === './bin/syndication_junction') {
  console.error('Unsupported platform 🤷‍♀️; if you are using linux, make sure you have either openssl 3 or 1.1.1 installed')
}

await exec(join(__dirname, executable_name), process.argv.slice(2), true)
