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

const entrepriseFormat = e => `${e.nom} (${e.legalSiren || e.legalEtranger})`

const titreFormat = ({
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
}) => {
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
        substances && substances.length
          ? substances
              .map(s => s.legales && s.legales.map(sl => sl.nom).join(', '))
              .join(', ')
          : null,
      titulaires:
        titulaires && titulaires.length
          ? titulaires.map(t => entrepriseFormat(t)).join(', ')
          : null,
      amodiataires:
        amodiataires && amodiataires.length
          ? amodiataires.map(t => entrepriseFormat(t)).join(', ')
          : null,
      references: references
        ? references.map(r => `${r.type.nom}: ${r.nom}`).join(', ')
        : null,
      date_debut: dateDebut,
      date_fin: dateFin,
      date_demande: dateDemande,
      url: `https://camino.beta.gouv.fr/titres/${id}`,
      pays: pays && pays.length ? pays.map(({ nom }) => nom).join(', ') : null,
      regions:
        regions && regions.length
          ? regions
              .map(({ nom }) => nom)
              .sort()
              .join(', ')
          : null,
      departements:
        departements && departements.length
          ? departements
              .map(({ nom }) => nom)
              .sort()
              .join(', ')
          : null,
      communes:
        communes && communes.length
          ? communes
              .map(({ nom }) => nom)
              .sort()
              .join(', ')
          : null
    },
    geometry: geojsonMultiPolygon && geojsonMultiPolygon.geometry
  }
}

const fileNameFormat = ({ domaines, types, statuts }) => {
  return `titres-${domaines.map(d => d.id).join('-')}-${types
    .map(t => t.id)
    .join('-')}-${statuts.map(s => s.id).join('-')}.geojson`
}

// pour chaque variables (domaineIds, statutIds)
// retourne un tableau avec les noms correspondant aux ids
// - domaines: []
// - types: []
// - statuts: []
const metasFormat = metas =>
  Object.keys(metas).reduce((metasObj, metaName) => {
    metasObj[`${metaName.slice(0, -1)}Ids`] = metas[metaName].map(
      m => m.nom || m.type.nom
    )
    return metasObj
  }, {})

const metasBuild = (variables, metas) =>
  Object.keys(variables).reduce((metasObj, metaIdsName) => {
    const metaNamePlural = `${metaIdsName.slice(0, -3)}s`

    metasObj[metaNamePlural] = []

    variables[metaIdsName].reduce((metasObj, metaId) => {
      // cas particulier pour les types,
      // car on les récupère dans les domaines
      if (metaNamePlural === 'types') {
        const titresTypes = metas.domaines.reduce(
          (titresTypes, d) =>
            // si le domaine fait partie de la liste de domaines dans les variables
            variables.domaineIds.includes(d.id)
              ? // alors on cherche tous les types faisant partie de la liste de types
                titresTypes.concat(
                  d.titresTypes.filter(t => t.type.id === metaId)
                )
              : titresTypes,
          []
        )

        metasObj[metaNamePlural].push(...titresTypes)
      } else {
        // pour les domaines et les statuts,
        // on cherche directement dans les metas
        const meta = metas[metaNamePlural].find(m => m.id === metaId)

        metasObj[metaNamePlural].push(meta)
      }

      return metasObj
    }, metasObj)

    return metasObj
  }, {})

// pour une definition, retourne le contenu du geojson formaté
const geojsonFormat = (titres, variables, metas) => {
  const { domaines, types, statuts } = metasBuild(variables, metas)

  return {
    type: 'FeatureCollection',
    properties: {
      fichier: fileNameFormat({ domaines, types, statuts }),
      couleur: domainesCouleurs[variables.domaineIds[0]],
      ...metasFormat({ domaines, types, statuts })
    },
    features: titres.map(titreFormat)
  }
}

module.exports = geojsonFormat
