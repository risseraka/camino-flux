require('dotenv').config()
const fileImport = require('./_utils/file-import')
const fileCreate = require('./_utils/file-create')
const directoryDelete = require('./_utils/directory-delete')
const directoryCreate = require('./_utils/directory-create')
const apiFetch = require('./_utils/api-fetch')
const titreFormat = require('./titre-format')
const fluxList = require('./flux-list')

const apiUrl = process.env.API_URL

const query = fileImport(__dirname, 'queries/titres.gql')

const domainesCouleurs = {
  m: '#498bd6',
  h: '#856940',
  s: '#8468b1',
  g: '#d16c3e',
  w: '#3ed1ac',
  r: '#c2d13e',
  c: '#3ea3d1',
  f: '#a8782f'
}

const apiFetchAndFileFormat = async flux => {
  const res = await apiFetch(apiUrl, query, flux)
  const titres = res.data.titres.map(t => titreFormat(t))
  const fileName = `titres-${flux.domaineIds.join('-')}-${flux.typeIds.join(
    '-'
  )}-${flux.statutIds.join('-')}.geojson`
  const infos = Object.keys(res.data.metas).reduce(
    (i, meta) =>
      Object.assign(i, {
        [meta]: flux[`${meta.slice(0, -1)}Ids`].map(
          id => res.data.metas[meta].find(m => m.id === id).nom
        )
      }),
    {
      file: fileName,
      couleur: domainesCouleurs[flux.domaineIds[0]]
    }
  )
  const fileContent = titres
  const filePath = `${__dirname}/../public/geojson/${fileName}`

  return {
    fileContent,
    filePath,
    infos
  }
}

const filesCreate = async () => {
  const flux = await Promise.all([...fluxList.map(apiFetchAndFileFormat)]).then(
    fx => fx.filter(f => f.fileContent.length > 0)
  )
  const infos = await Promise.all([
    ...flux.map(async f => {
      await fileCreate(f.filePath, JSON.stringify(f.fileContent, null, 2))
      return f.infos
    })
  ])

  const infosFilePath = `${__dirname}/../public/geojson/infos.json`
  const infosFileContent = JSON.stringify(infos, null, 2)

  await fileCreate(infosFilePath, infosFileContent)
  console.log(`${infos.length} fichiers générés`)
}

const run = async () => {
  await directoryDelete(`${__dirname}/../public/geojson/`)
  await directoryCreate(`${__dirname}/../public/geojson/`)
  await filesCreate()
  process.exit()
}

run()
