const dateFormat = require('dateformat')

const titreFormat = ({
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
}) => ({
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
})

const entrepriseFormat = e =>
  `${
    e.etablissements[0] && e.etablissements[0].nom
      ? e.etablissements[0].nom
      : ''
  } (${e.legalSiren || e.legalEtranger})`

const titreDemarchesPhasesFind = demarches => demarches.filter(td => td.phase)

const dateDebutFind = titreDemarchesPhases =>
  (titreDemarchesPhases.length && titreDemarchesPhases[0].phase.dateDebut) ||
  null

const dateFinFind = titreDemarchesPhases =>
  (titreDemarchesPhases.length &&
    titreDemarchesPhases[titreDemarchesPhases.length - 1].phase.dateFin) ||
  null

const dateDemandeFind = demarches =>
  demarches.reduce((date, td) => {
    if (td.type.id !== 'oct' || date) {
      return date
    }

    const etapesMens = td.etapes && td.etapes.filter(te => te.type.id === 'men')

    date = etapesMens.length ? etapesMens[0].date : null

    return date
  }, null)

module.exports = titreFormat
