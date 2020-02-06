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

// pour chaque definition (domaineIds, statutIds)
// retourne un tableau avec les noms correspondant aux ids
// - domaines: []
// - types: []
// - statuts: []
function metasFormat(definition, metas) {
  return Object.keys(definition).reduce((metasObj, metaIdsName) => {
    if (metaIdsName === 'domaines') {
      definition[metaIdsName].reduce((metasObj, metaId) => {
        const domaine = metas[`${metaIdsName.slice(0, -3)}s`].find(
          m => m.id === metaId
        )

        return metasObj
      }, metasObj)
    } else {
    }

    return metasObj
  }, {})
}

function titreFormat({
  id,
  nom,
  type,
  domaine,
  statut,
  dateDebut,
  dateFin,
  dateDemande,
  volume,
  volumeUnite,
  surface,
  substances,
  titulaires,
  amodiataires,
  references,
  geojsonMultiPolygon,
  pays
}) {
  const regions =
    pays &&
    pays.length &&
    pays.reduce(
      (regions, pay) =>
        pay.regions && pay.regions.length
          ? [...regions, ...pay.regions]
          : regions,
      []
    )

  const departements =
    regions &&
    regions.length &&
    regions.reduce(
      (departements, region) =>
        region.departements && region.departements.length
          ? [...departements, ...region.departements]
          : departements,
      []
    )

  const communes =
    departements &&
    departements.length &&
    departements.reduce(
      (communes, departement) =>
        departement.communes && departement.communes.length
          ? [...communes, ...departement.communes]
          : communes,
      []
    )

  return {
    type: 'Feature',
    properties: {
      id: id,
      nom: nom,
      type: type.type.nom,
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
        references && references.map(r => `${r.type.nom}: ${r.nom}`).join(', '),
      date_debut: dateDebut,
      date_fin: dateFin,
      date_demande: dateDemande,
      url: `https://camino.beta.gouv.fr/titres/${id}`,
      pays:
        (pays && pays.length && pays.map(({ nom }) => nom).join(', ')) || null,
      regions:
        (regions &&
          regions.length &&
          regions
            .map(({ nom }) => nom)
            .sort()
            .join(', ')) ||
        null,
      departements:
        (departements &&
          departements.length &&
          departements
            .map(({ nom }) => nom)
            .sort()
            .join(', ')) ||
        null,
      communes:
        (communes &&
          communes.length &&
          communes
            .map(({ nom }) => nom)
            .sort()
            .join(', ')) ||
        null
    },
    geometry: geojsonMultiPolygon && geojsonMultiPolygon.geometry
  }
}

function entrepriseFormat(e) {
  return `${e.nom} (${e.legalSiren || e.legalEtranger})`
}

module.exports = geojsonFormat
