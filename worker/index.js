require('dotenv').config()
const fileImport = require('./_utils/file-import')
const fileCreate = require('./_utils/file-create')
const apiFetch = require('./_utils/api-fetch')

const apiUrl = process.env.API_URL

const query = fileImport(__dirname, 'queries/geojson.gql')

const domaineIds = ['m', 'h', 's', 'g', 'c']

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
  polices: [true, false],
  substances: []
}

const fetchAndFileCreate = async (u, q, v, d) => {
  v.domaineIds = [d]
  const res = await apiFetch(u, q, v)

  fileCreate(
    `${__dirname}/../public/geojson/${d}-val.geojson`,
    JSON.stringify(res.data.geojsonMultiPolygons, null, 2)
  )
}

domaineIds.forEach(domaine =>
  fetchAndFileCreate(apiUrl, query, variables, domaine)
)
