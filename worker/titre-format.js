const titreFormat = t => {
  const perimetres = []
  const substances = []
  const titulaires = []
  const phases = []

  t.demarches &&
    t.demarches.forEach(d => {
      if (d.phase) {
        phases.push(d.phase)
      }

      d.etapes &&
        d.etapes.forEach(e => {
          if (
            d.statut.id === 'acc' &&
            (e.type.id === 'dex' || e.type.id === 'dpu') &&
            (e.statut.id === 'acc' || e.statut.id === 'fai')
          ) {
            if (e.geojsonPoints) {
              perimetres.push(e.geojsonMultiPolygon)
            }

            if (e.substances && substances.length === 0) {
              e.substances.forEach(s => {
                substances.push(s)
              })
            }

            if (e.titulaires && titulaires.length === 0) {
              e.titulaires.forEach(t => {
                if (!titulaires.find(ti => ti.id === t.id)) {
                  titulaires.push(t)
                }
              })
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
    geometry: perimetres[0] && perimetres[0].geometry
  }
}

module.exports = titreFormat
