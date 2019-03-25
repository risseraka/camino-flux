const { mkdir } = require('fs').promises

module.exports = async path => {
  await mkdir(path)

  console.log('Créé le répertoire:', path)
}
