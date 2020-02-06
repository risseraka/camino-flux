// efface le dossier /public/geojson, le recréé et y ajoute:
// - un fichier .geojson par definition présent dans le fichier definitions.js
// - un fichier infos.json contenant la liste des fichiers générés

require('dotenv').config()
const { join } = require('path')
var { job } = require('cron')

const fileImport = require('./_utils/file-import')
const fileCreate = require('./_utils/file-create')
const directoryDelete = require('./_utils/directory-delete')
const directoryCreate = require('./_utils/directory-create')
const apiFetch = require('./_utils/api-fetch')
const geojsonFormat = require('./geojson-format')
const definitions = require('./definitions')
const EXPORT_DIRECTORY = '../public/geojson/'

const apiUrl = process.env.API_URL

// ------------------------------------
// fonctions
// ------------------------------------

const apiGet = async (url, { query, variables = {} }, prop) => {
  const res = await apiFetch(url, JSON.stringify({ query, variables }))

  return res && res.data && res.data[prop]
}

const geojsonsBuild = async (definitions, query, metas) =>
  definitions.reduce(async (geojsons, variables) => {
    // récupère les titres
    let titres = await apiGet(apiUrl, { query, variables }, 'titres')

    // Note: inconvénient, quand tous les titres valides d'un domaine
    // et d'un type passent en échu (ex ARM), le flux disparaît
    if (!titres || !titres.length) return geojsons

    // si la réponse contient des titres
    // formate les données et les ajoute
    titres = geojsonFormat(titres, variables, metas)

    return (await geojsons).concat(titres)
  }, Promise.resolve([]))

const filesCreate = async geojsons =>
  Promise.all(
    geojsons.map(async geojson => {
      await fileCreate(
        join(__dirname, EXPORT_DIRECTORY, geojson.properties.fichier),
        JSON.stringify(geojson, null, 2)
      )

      return geojson.properties
    })
  )

// génère un fichier infos contenant la liste des fichiers générés
const infosFileCreate = async infos => {
  await fileCreate(
    join(__dirname, EXPORT_DIRECTORY, 'infos.json'),
    JSON.stringify(infos, null, 2)
  )

  console.log(`${infos.length} fichiers générés`)
}

// ------------------------------------
// process
// ------------------------------------

const run = async () => {
  try {
    // importe les requêtes graphQL
    const titresQuery = await fileImport(join(__dirname, 'queries/titres.gql'))
    const domainesQuery = await fileImport(
      join(__dirname, 'queries/domaines.gql')
    )
    const statutsQuery = await fileImport(
      join(__dirname, 'queries/statuts.gql')
    )

    // efface le dossier cible et son contenu
    await directoryDelete(join(__dirname, EXPORT_DIRECTORY))

    // créé le dossier cible
    await directoryCreate(join(__dirname, EXPORT_DIRECTORY))

    // récupère les domaines
    const domaines = await apiGet(apiUrl, { query: domainesQuery }, 'domaines')
    // récupère les statuts
    const statuts = await apiGet(apiUrl, { query: statutsQuery }, 'statuts')

    const metas = { domaines, statuts }

    // parcourt les définitions et construit un tableau de geojsons
    // dont l'entrée properties contient, entre autre le nom du fichier
    const geojsons = await geojsonsBuild(definitions, titresQuery, metas)

    // génère un fichier par geojson
    // retourne la liste des fichiers générés
    const infos = await filesCreate(geojsons)

    // créé le fichier récapitulatif infos.json
    await infosFileCreate(infos)
  } catch (e) {
    console.error(e)
  }
}

job(
  // cronTime
  '00 00 04 * * 1-5',
  // onTick
  run,
  //  onComplete
  null,
  // start
  true,
  // timezone
  'Europe/Paris',
  // context
  null,
  // runOnInit
  true
  // utcOffset
  // unrefTimeout
)
