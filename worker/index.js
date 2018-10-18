// efface le dossier /public/geojson et le recréé avec
// - un fichier geojson par flux présent dans le fichier fluxList
// - un fichier d'infos contenant la liste des fichier geojson générés

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

// ------------------------------------
// process
// ------------------------------------

const run = async () => {
  // efface et recréé le dossier cible
  await directoryDelete(`${__dirname}/../public/geojson/`)
  await directoryCreate(`${__dirname}/../public/geojson/`)

  // génère les fichiers
  await filesCreate()
  process.exit()
}

run()

// ------------------------------------
// scripts
// ------------------------------------

// génère
// - un fichier par flux (présent dans fluxList)
// - un fichier infos
const filesCreate = async () => {
  // construit un tableau avec chaque flux de fluxList:
  // - interroge l'API
  // - formate un fichier geojson correspondant
  // - élimine du tableau les fichiers pour lesquelles l'API ne renvoit rien
  const flux = await Promise.all([...fluxList.map(apiFetchAndFileFormat)]).then(
    fx => fx.filter(f => f.fileContent.length > 0)
  )

  // génère un fichier pour chaque élément du tableau ci-dessus
  // retourne la liste des fichiers générés
  const infos = await Promise.all([
    ...flux.map(async f => {
      await fileCreate(f.filePath, JSON.stringify(f.fileContent, null, 2))
      return f.infos
    })
  ])

  // génère un fichier infos contenant la liste des fichiers de flux
  const infosFilePath = `${__dirname}/../public/geojson/infos.json`
  const infosFileContent = JSON.stringify(infos, null, 2)
  await fileCreate(infosFilePath, infosFileContent)

  console.log(`${infos.length} fichiers générés`)
}

// pour un flux, retourne:
// - fileContent: le contenu du fichier geojson formaté
// - filePath: le chemin et le nom du fichier
// - infos: la description du fichier
const apiFetchAndFileFormat = async flux => {
  const res = await apiFetch(apiUrl, query, flux)
  const fileContent = res.data.titres.map(t => titreFormat(t))
  const fileName = `titres-${flux.domaineIds.join('-')}-${flux.typeIds.join(
    '-'
  )}-${flux.statutIds.join('-')}.geojson`
  const filePath = `${__dirname}/../public/geojson/${fileName}`

  // retourne les infos de chaque fichier
  // - fichier (nom)
  // - couleur (associée au domaine)
  // - types []
  // - domaines []
  // - statuts []
  // parcourt les metas (types, domaines, statuts)
  const infos = Object.keys(res.data.metas).reduce(
    (i, metaName) =>
      Object.assign(i, {
        // à chaque meta on associe un tableau
        // qui contient les noms associés aux ids renseignées dans fluxList
        [metaName]: flux[`${metaName.slice(0, -1)}Ids`].map(metaId => {
          const meta = res.data.metas[metaName].find(m => m.id === metaId)
          return meta && meta.nom
        })
      }),
    {
      fichier: fileName,
      couleur: domainesCouleurs[flux.domaineIds[0]]
    }
  )

  return {
    fileContent,
    filePath,
    infos
  }
}
