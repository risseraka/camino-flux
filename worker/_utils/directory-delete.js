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

module.exports = async path => {
  await dirRm(path)

  console.log('Supprime le répertoire:', path)
}
