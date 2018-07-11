const titreFormat = t => {
  const perimetres = []
  const substances = []
  const titulaires = []
  const phases = []

  t.demarches &&
    t.demarches.forEach(d => {
      d.etapes &&
        d.etapes.forEach(e => {
          if (
            d.statut.id === 'acc' &&
            e.type.id === 'dpu' &&
            e.statut.id === 'ter'
          ) {
            if (
              d.type.nom === 'octroi' ||
              d.type.nom === 'prolongation' ||
              d.type.nom === 'prolongation 1' ||
              d.type.nom === 'prolongation 2'
            ) {
              phases.push({
                nom: d.type.nom,
                duree: e.duree,
                date: e.date
              })
            }

            if (e.geojsonPoints) {
              perimetres.push(e.geojsonMultiPolygon)
            }

            if (e.substances) {
              substances.push(...e.substances)
            }

            if (e.titulaires) {
              titulaires.push(...e.titulaires)
            }
          }
        })
    })

  return {
    type: 'Feature',
    properties: {
      id: t.id,
      nom: t.nom,
      type: t.type,
      domaine: t.domaine,
      statut: t.statut,
      substances,
      titulaires,
      phases
    },
    geometry: {
      type: 'MultiPolygon',
      coordinates: perimetres[0]
    }
  }
}

module.exports = titreFormat
