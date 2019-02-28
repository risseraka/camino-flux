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
}) => {
  const titreDemarchesPhases = demarches.filter(td => td.phase)

  const dateDebut =
    (titreDemarchesPhases.length && titreDemarchesPhases[0].phase.dateDebut) ||
    null

  const dateFin =
    (titreDemarchesPhases.length &&
      titreDemarchesPhases[titreDemarchesPhases.length - 1].phase.dateFin) ||
    null

  const dateDemande = demarches
    .filter(td => td.type.id === 'oct')
    .reduce((date, td) => {
      if (!date) {
        const etapesMens =
          td.etapes && td.etapes.filter(te => te.type.id === 'men')

        date = etapesMens.length ? etapesMens[0].date : null
      }

      return date
    }, null)

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
            .map(s => s.legales.map(sl => sl.nom).join(', '))
            .join(', ')) ||
        null,
      titulaires:
        (titulaires &&
          titulaires.length &&
          titulaires
            .map(t => `${t.nom} (${t.legalSiren || t.legalEtranger})`)
            .join(', ')) ||
        null,
      amodiataires:
        (amodiataires &&
          amodiataires.length &&
          amodiataires
            .map(t => `${t.nom} (${t.legalSiren || t.legalEtranger})`)
            .join(', ')) ||
        null,
      references:
        references && references.map(r => `${r.type}: ${r.valeur}`).join(', '),
      date_debut: dateFormat(dateDebut, 'yyyy-mm-dd'),
      date_fin: dateFormat(dateFin, 'yyyy-mm-dd'),
      date_demande: dateFormat(dateDemande, 'yyyy-mm-dd'),
      url: `https://camino.beta.gouv.fr/titres/${id}`
    },
    geometry: geojsonMultiPolygon && geojsonMultiPolygon.geometry
  }
}

module.exports = titreFormat
