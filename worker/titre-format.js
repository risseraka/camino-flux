const titreFormat = t => {
  const dates = t.demarches.reduce(
    (d, titreDemarche) => {
      if (titreDemarche.phase) {
        console.log(titreDemarche.phase)
      }

      titreDemarche.etapes &&
        titreDemarche.etapes.forEach(e => {
          if (
            titreDemarche.statut.id === 'acc' &&
            (e.type.id === 'dex' || e.type.id === 'dpu') &&
            (e.statut.id === 'acc' || e.statut.id === 'fai')
          ) {
          }
        })

      return d
    },
    { debut: null, fin: null, demande: null }
  )

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
            .map(s => s.legal.map(sl => sl.nom).join(', '))
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
      date_debut: dates.debut,
      date_fin: dates.fin,
      date_demande: dates.demande,
      url: `https://camino.beta.gouv.fr/titres/${t.id}`
    },
    geometry: t.geojsonMultiPolygon && t.geojsonMultiPolygon.geometry
  }
}

module.exports = titreFormat
