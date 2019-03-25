// efface le dossier /public/geojson et le recréé avec
// - un fichier geojson par flux présent dans le fichier fluxList
// - un fichier d'infos contenant la liste des fichier geojson générés

require('dotenv').config()
const path = require('path')
const fileImport = require('./_utils/file-import')
const fileCreate = require('./_utils/file-create')
const directoryDelete = require('./_utils/directory-delete')
const directoryCreate = require('./_utils/directory-create')
const apiFetch = require('./_utils/api-fetch')
const titreFormat = require('./titre-format')
const sources = require('./sources')

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

// ------------------------------------
// process
// ------------------------------------

const run = async () => {
  // efface et recréé le dossier cible
  await directoryDelete(path.join(__dirname, '../public/geojson/'))
  await directoryCreate(path.join(__dirname, '../public/geojson/'))

  // interroge l'API et construit un tableau de réponses
  const datas = await datasGet(sources)

  // formate les datas
  const datasFormated = datasFormat(datas)

  // génère un fichier par élément
  // retourne la liste des fichiers générés
  const infos = await filesCreate(datasFormated)

  // créé le fichier récapitulatif infos.json
  await infosFileCreate(infos)

  // génère les fichiers
  // await filesCreate(flux)
  process.exit()
}

run()

// ------------------------------------
// scripts
// ------------------------------------

const datasGet = async flux =>
  Promise.all(
    flux.map(async params => ({
      res: await apiFetch(apiUrl, query, params),
      params
    }))
  )

const datasFormat = datas =>
  datas
    // - élimine du tableau les fichiers pour lesquelles l'API ne renvoi rien
    .reduce(
      (acc, { res, params }) =>
        res && res.data && res.data.titres.length
          ? [...acc, fileFormat({ res, params })]
          : acc,
      []
    )

const filesCreate = async datas =>
  Promise.all(
    datas.map(async ({ properties, filePath, fileContent }) => {
      await fileCreate(filePath, JSON.stringify(fileContent, null, 2))
      return properties
    })
  )

// génère un fichier infos contenant la liste des fichiers de flux
const infosFileCreate = async infos => {
  try {
    const infosFilePath = path.join(__dirname, '../public/geojson/infos.json')
    const infosFileContent = JSON.stringify(infos, null, 2)
    await fileCreate(infosFilePath, infosFileContent)

    console.log(`${infos.length} fichiers générés`)
  } catch (err) {
    console.log(err)
  }
}

// pour un flux, retourne:
// - fileContent: le contenu du fichier geojson formaté
// - filePath: le chemin et le nom du fichier
// - infos: la description du fichier
const fileFormat = ({ params, res }) => {
  try {
    const fileName = `titres-${params.domaineIds.join(
      '-'
    )}-${params.typeIds.join('-')}-${params.statutIds.join('-')}.geojson`

    // retourne les infos de chaque fichier
    // - fichier (nom)
    // - couleur (associée au domaine)
    // - types []
    // - domaines []
    // - statuts []
    // parcourt les metas (types, domaines, statuts)
    const properties = Object.keys(res.data.metas).reduce(
      (i, metaName) =>
        Object.assign(i, {
          // à chaque meta on associe un tableau
          // qui contient les noms associés aux ids renseignées dans paramsList
          [metaName]: params[`${metaName.slice(0, -1)}Ids`].map(metaId => {
            const meta = res.data.metas[metaName].find(m => m.id === metaId)
            return meta && meta.nom
          })
        }),
      {
        fichier: fileName,
        couleur: domainesCouleurs[params.domaineIds[0]]
      }
    )

    const fileContent = {
      type: 'FeatureCollection',
      properties,
      features: res.data.titres.map(titreFormat)
    }

    const filePath = path.join(__dirname, '../public/geojson/', fileName)

    return {
      fileContent,
      filePath,
      properties
    }
  } catch (err) {
    console.log(err)
  }
}
