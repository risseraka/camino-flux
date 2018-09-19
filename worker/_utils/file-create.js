const fs = require('fs')
const util = require('util')
const writeFile = util.promisify(fs.writeFile)

module.exports = async (filePath, fileContent) => {
  await writeFile(filePath, fileContent, 'utf8')
  console.log('File:', filePath)
}
