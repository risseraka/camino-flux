require('dotenv').config()
const fileImport = require('./_utils/file-import')
const fileCreate = require('./_utils/file-create')
const apiFetch = require('./_utils/api-fetch')

const apiUrl = process.env.API_URL

const query = fileImport(__dirname, 'queries/titres.gql')

const variables = {
  first: 3
}

apiFetch(apiUrl, query, variables).then(t =>
  fileCreate('exports/geojson/test.json', JSON.stringify(t, null, 2))
)
