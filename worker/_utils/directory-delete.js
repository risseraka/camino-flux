const rimraf = require('rimraf')
const util = require('util')
const directoryDelete = util.promisify(rimraf)

module.exports = async directoryName => {
  await directoryDelete(directoryName)

  console.log('Directory:', directoryName)
}
