
import sharp from 'sharp'
import { readdir, stat } from 'fs/promises' 

async function walkTree(directory) {
  let dir = await readdir(directory)
  let output = [];
  for (let i = 0; i < dir.length; i++) {
    let path = `${directory}/${dir[i]}`
    let stats = await stat(path);
    if (stats.isDirectory()) {
      output.push(...await walkTree(path))
    }
    if (stats.isFile()) {
      output.push(path)
    }
  }
  return output;
}

const mediaFiles = await walkTree("./media")
const imagesToOptimize = mediaFiles.filter((file) => file.endsWith(".png") || file.endsWith(".jpg"))
for (let i = 0; i < imagesToOptimize.length; i++) {
  const image = sharp(imagesToOptimize[i])
  const meta = await image.metadata();
  const width = meta.width > 300 ? 300 : meta.width;
  const result = await image
    .toFormat("webp")
    .resize(width)
    .toFile(`${imagesToOptimize[i]}.webp`)
  console.log(`Optimized ${imagesToOptimize[i]}`, result)
}
