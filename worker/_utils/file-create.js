const { writeFile } = require('fs').promises

module.exports = async (filePath, fileContent) => {
  await writeFile(filePath, fileContent, 'utf8')
  console.log('Créé le fichier:', filePath)
}
