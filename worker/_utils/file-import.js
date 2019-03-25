const fs = require('fs').promises

module.exports = async p => (await fs.readFile(p, 'utf8')).toString()
