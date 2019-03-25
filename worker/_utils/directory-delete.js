const rimraf = require('rimraf')
const dirRm = dir =>
  new Promise((resolve, reject) => {
    rimraf(dir, (err, res) => {
      if (err) {
        reject(err)
      }
      resolve(res)
    })
  })

module.exports = async dirPath => {
  await dirRm(dirPath)

  console.log('Supprime le répertoire:', dirPath)
}
