require('dotenv').config()
const fileImport = require('./_utils/file-import')
const fileCreate = require('./_utils/file-create')
const apiFetch = require('./_utils/api-fetch')
const titreFormat = require('./titre-format')

const apiUrl = process.env.API_URL

const query = fileImport(__dirname, 'queries/titres.gql')

const domaineIds = ['m', 'h', 's', 'g', 'c', 'w', 'a']

const variables = {
  typeIds: [
    'apx',
    'arc',
    'arg',
    'axm',
    'prx',
    'prh',
    'pxc',
    'pxg',
    'pxm',
    'cxx'
  ],
  statutIds: ['val'],
  substances: []
}

const fetchAndFileCreate = async (u, q, v, d) => {
  v.domaineIds = [d]
  const res = await apiFetch(u, q, v)
  const titres = res.data.titres.map(t => titreFormat(t))
  fileCreate(
    `${__dirname}/../public/geojson/titres-${d}.geojson`,
    JSON.stringify(titres, null, 2)
  )
}

domaineIds.forEach(domaine =>
  fetchAndFileCreate(apiUrl, query, variables, domaine)
)
