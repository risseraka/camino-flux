const dateFormat = require('dateformat')

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

// pour une definition, retourne le contenu du geojson formaté
function geojsonFormat(definition, titres, metas) {
  return {
    type: 'FeatureCollection',
    properties: {
      fichier: fileNameFormat(definition),
      couleur: domainesCouleurs[definition.domaineIds[0]],
      ...metasFormat(definition, metas)
    },
    features: titres.map(titreFormat)
  }
}

function fileNameFormat({ domaineIds, statutIds, typeIds }) {
  return `titres-${domaineIds.join('-')}-${typeIds.join('-')}-${statutIds.join(
    '-'
  )}.geojson`
}

// pour chaque definition (typeIds, domaineIds, statutIds)
// retourne un tableau avec les noms correspondant aux ids
// - types: []
// - domaines: []
// - statuts: []
function metasFormat(definition, metas) {
  return Object.keys(definition).reduce(
    (metasObj, metaIdsName) => ({
      ...metasObj,
      ...{
        [metaIdsName]: definition[metaIdsName].map(metaId => {
          const meta = metas[`${metaIdsName.slice(0, -3)}s`].find(
            m => m.id === metaId
          )
          return meta && meta.nom
        })
      }
    }),
    {}
  )
}

function titreFormat({
  id,
  nom,
  type,
  domaine,
  statut,
  volume,
  volumeUnite,
  surface,
  substances,
  titulaires,
  amodiataires,
  references,
  demarches,
  geojsonMultiPolygon
}) {
  return {
    type: 'Feature',
    properties: {
      id: id,
      nom: nom,
      type: type.nom,
      domaine: domaine.nom,
      statut: statut.nom,
      volume: volume && `${volume} ${volumeUnite.nom}`,
      surface: surface && `${surface} km²`,
      substances:
        (substances &&
          substances.length &&
          substances
            .map(s => s.legales && s.legales.map(sl => sl.nom).join(', '))
            .join(', ')) ||
        null,
      titulaires:
        (titulaires &&
          titulaires.length &&
          titulaires.map(t => entrepriseFormat(t)).join(', ')) ||
        null,
      amodiataires:
        (amodiataires &&
          amodiataires.length &&
          amodiataires.map(t => entrepriseFormat(t)).join(', ')) ||
        null,
      references:
        references && references.map(r => `${r.type}: ${r.valeur}`).join(', '),
      date_debut: dateFormat(
        dateDebutFind(titreDemarchesPhasesFind(demarches)),
        'yyyy-mm-dd'
      ),
      date_fin: dateFormat(
        dateFinFind(titreDemarchesPhasesFind(demarches)),
        'yyyy-mm-dd'
      ),
      date_demande: dateFormat(dateDemandeFind(demarches), 'yyyy-mm-dd'),
      url: `https://camino.beta.gouv.fr/titres/${id}`
    },
    geometry: geojsonMultiPolygon && geojsonMultiPolygon.geometry
  }
}

function entrepriseNameFind(entreprise) {
  return (
    // si l'entreprise à un nom
    entreprise.nom ||
    // sinon, trouve l'établissement le plus récent
    entreprise.etablissements.reduce(
      (res, e) =>
        res &&
        dateFormat(res.dateDebut, 'yyyy-mm-dd') >
          dateFormat(e.dateDebut, 'yyyy-mm-dd')
          ? res
          : e,
      null
    ).nom
  )
}

function entrepriseFormat(e) {
  return `${entrepriseNameFind(e)} (${e.legalSiren || e.legalEtranger})`
}

function titreDemarchesPhasesFind(demarches) {
  return demarches.filter(td => td.phase)
}

function dateDebutFind(titreDemarchesPhases) {
  return (
    (titreDemarchesPhases.length && titreDemarchesPhases[0].phase.dateDebut) ||
    null
  )
}

function dateFinFind(titreDemarchesPhases) {
  return (
    (titreDemarchesPhases.length &&
      titreDemarchesPhases[titreDemarchesPhases.length - 1].phase.dateFin) ||
    null
  )
}

function dateDemandeFind(demarches) {
  return demarches.reduce((date, td) => {
    if (td.type.id !== 'oct' || date) {
      return date
    }

    const etapesMens = td.etapes && td.etapes.filter(te => te.type.id === 'men')

    date = etapesMens.length ? etapesMens[0].date : null

    return date
  }, null)
}

module.exports = geojsonFormat
