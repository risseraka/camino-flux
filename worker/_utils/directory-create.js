const fs = require('fs')
const util = require('util')
const mkdir = util.promisify(fs.mkdir)

module.exports = async (fileName, fileContent) => {
  await mkdir(fileName)

  console.log('Directory:', fileName)
}
