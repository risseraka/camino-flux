require('dotenv').config()
const fileImport = require('./_utils/file-import')
const fileCreate = require('./_utils/file-create')
const apiFetch = require('./_utils/api-fetch')
const titreFormat = require('./titre-format')

const apiUrl = process.env.API_URL

const query = fileImport(__dirname, 'queries/titres.gql')

const domaineIds = ['m', 'h', 's', 'g', 'c', 'w', 'r']

const variables = {
  statutIds: ['val']
}
const apiFetchAndFileCreate = async d => {
  const v = Object.assign(variables, { domaineIds: [d] })
  const res = await apiFetch(apiUrl, query, v)
  const titres = res.data.titres.map(t => titreFormat(t))
  const fileContent = JSON.stringify(titres, null, 2)
  const fileName = `${__dirname}/../public/geojson/titres-${d}.geojson`
  fileCreate(fileName, fileContent)
}

domaineIds.forEach(apiFetchAndFileCreate)
