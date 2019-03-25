const fs = require('fs').promises

module.exports = async path => (await fs.readFile(path, 'utf8')).toString()
