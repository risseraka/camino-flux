// efface le dossier /public/geojson et le recréé avec
// - un fichier geojson par definition présent dans le fichier definitions
// - un fichier d'infos contenant la liste des fichier geojson générés

require('dotenv').config()
const { join } = require('path')
const fileImport = require('./_utils/file-import')
const fileCreate = require('./_utils/file-create')
const directoryDelete = require('./_utils/directory-delete')
const directoryCreate = require('./_utils/directory-create')
const apiFetch = require('./_utils/api-fetch')
const titreFormat = require('./titre-format')
const definitions = require('./definitions')

const apiUrl = process.env.API_URL

const titresQuery = fileImport(__dirname, 'queries/titres.gql')
const metasQuery = fileImport(__dirname, 'queries/metas.gql')

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

// ------------------------------------
// process
// ------------------------------------

const run = async () => {
  // efface et recréé le dossier cible
  await directoryDelete(join(__dirname, '../public/geojson/'))
  await directoryCreate(join(__dirname, '../public/geojson/'))

  // récupère les metas
  const metas = await metasGet(apiUrl, metasQuery)

  // parcours les définitions
  // et construit un tableau d'objet qui contiennent:
  // - geojson: le contenu du fichier formaté
  // - path: le chemin du fichier
  const files = await definitions.reduce(async (files, definition) => {
    // récupère les titres
    const titres = await titresGet(apiUrl, titresQuery, definition)
    // si la réponse contient des titres
    return titres && titres.length
      ? // formate les données et les ajoute à files
        [...(await files), fileFormat(titres, definition, metas)]
      : files
  }, Promise.resolve([]))

  // génère un fichier par élément
  // retourne la liste des fichiers générés
  const infos = await filesCreate(files)

  // créé le fichier récapitulatif infos.json
  await infosFileCreate(infos)

  // génère les fichiers
  // await filesCreate(definitions)
  process.exit()
}

run()

// ------------------------------------
// scripts
// ------------------------------------

const metasGet = async (url, query) => {
  const res = await apiFetch(url, JSON.stringify({ query }))
  return res && res.data && res.data.metas
}

const titresGet = async (url, query, variables) => {
  const res = await apiFetch(url, JSON.stringify({ query, variables }))
  return res && res.data && res.data.titres
}

const filesCreate = async datas =>
  Promise.all(
    datas.map(async ({ path, geojson }) => {
      await fileCreate(path, JSON.stringify(geojson, null, 2))
      return geojson.properties
    })
  )

// génère un fichier infos contenant la liste des fichiers de definitions
const infosFileCreate = async infos => {
  try {
    const path = join(__dirname, '../public/geojson/infos.json')
    const content = JSON.stringify(infos, null, 2)
    await fileCreate(path, content)

    console.log(`${infos.length} fichiers générés`)
  } catch (err) {
    console.log(err)
  }
}

// pour une definition, retourne:
// - geojson: le contenu du fichier formaté
// - path: le chemin et le nom du fichier
const fileFormat = (titres, definition, metas) => {
  try {
    const fileName = fileNameFormat(definition)

    return {
      geojson: {
        type: 'FeatureCollection',
        properties: {
          fichier: fileName,
          couleur: domainesCouleurs[definition.domaineIds[0]],
          ...metasFormat(metas, definition)
        },
        features: titres.map(titreFormat)
      },
      path: join(__dirname, '../public/geojson/', fileName)
    }
  } catch (err) {
    console.log(err)
  }
}

const fileNameFormat = ({ domaineIds, statutIds, typeIds }) =>
  `titres-${domaineIds.join('-')}-${typeIds.join('-')}-${statutIds.join(
    '-'
  )}.geojson`

// parcourt les metas (types, domaines, statuts)
// et retourne les properties de chaque fichier
// - types []
// - domaines []
// - statuts []
const metasFormat = (metas, definition) =>
  Object.keys(metas).reduce(
    (i, metaName) => ({
      ...i,
      ...{
        // à chaque meta on associe un tableau
        // qui contient les noms de chaque id inclue dans la définition
        [metaName]: definition[`${metaName.slice(0, -1)}Ids`].map(metaId => {
          const meta = metas[metaName].find(m => m.id === metaId)
          return meta && meta.nom
        })
      }
    }),
    {}
  )
