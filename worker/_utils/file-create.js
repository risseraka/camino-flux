const { writeFile } = require('fs').promises

module.exports = async (path, content) => {
  await writeFile(path, content, 'utf8')
  console.log('Créé le fichier:', path)
}
