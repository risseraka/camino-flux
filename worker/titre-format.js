const titreFormat = t => {
  const titreDemarchesPhases = t.demarches.filter(td => td.phase)

  const dateDebut =
    (titreDemarchesPhases.length && titreDemarchesPhases[0].phase.dateDebut) ||
    null
  const dateFin =
    (titreDemarchesPhases.length &&
      titreDemarchesPhases[titreDemarchesPhases.length - 1].phase.dateFin) ||
    null
  const dateDemande = t.demarches
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
      id: t.id,
      nom: t.nom,
      type: t.type.nom,
      domaine: t.domaine.nom,
      statut: t.statut.nom,
      substances:
        (t.substances &&
          t.substances.length &&
          t.substances
            .map(s => s.legales.map(sl => sl.nom).join(', '))
            .join(', ')) ||
        null,
      titulaires:
        (t.titulaires &&
          t.titulaires.length &&
          t.titulaires
            .map(t => `${t.nom} (${t.legalSiren || t.legalEtranger})`)
            .join(', ')) ||
        null,
      amodiataires:
        (t.amodiataires &&
          t.amodiataires.length &&
          t.amodiataires.map(t => `${t.nom} (${t.siret})`).join(', ')) ||
        null,
      references:
        t.references &&
        t.references.map(r => `${r.type}: ${r.valeur}`).join(', '),
      date_debut: dateDebut,
      date_fin: dateFin,
      date_demande: dateDemande,
      url: `https://camino.beta.gouv.fr/titres/${t.id}`
    },
    geometry: t.geojsonMultiPolygon && t.geojsonMultiPolygon.geometry
  }
}

module.exports = titreFormat
