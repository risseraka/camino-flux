const { mkdir } = require('fs').promises

module.exports = async dirPath => {
  await mkdir(dirPath)

  console.log('Créé le répertoire:', dirPath)
}
