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
  policeIds: [true, false]
}

const fetchAndFileCreate = async (u, q, v, d) => {
  v.domaineIds = [d]
  const data = await apiFetch(u, q, v)

  fileCreate(
    `${__dirname}/../public/geojson/${d}-val.geojson`,
    JSON.stringify(data, null, 2)
  )
}

domaineIds.forEach(domaine =>
  fetchAndFileCreate(apiUrl, query, variables, domaine)
)
