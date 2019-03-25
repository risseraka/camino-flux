# Camino flux

> Flux de données générés quotidiennement à partir de l'API de [Camino](https://camino.beta.gouv.fr): [flux.camino.beta.gouv.fr](https://flux.camino.beta.gouv.fr)

---

## Technologies

- Node.js
- Express.js
- Eslint
- Prettier
- Standardjs

---

## Configuration

- Renommer le fichier `.env.example` en `.env`.
- Compléter le fichier `env`.

---

## Npm scripts

```bash
# Installe les dépendances
npm install

# Créé les fichiers geojson des titres miniers à partir de l'api
# et les enregistre dans le dossier /public/geojson
npm run build

# Démarre le serveur qui sert les fichiers du dossier /public
npm start
```

---

## Contribution

Voir `contributing.md` (en anglais) pour plus d'infos.

---

## Credits

### Production

- [La Fabrique Numérique, Ministère de la transition écologique et solidaire](https://www.ecologique-solidaire.gouv.fr/inauguration-fabrique-numerique-lincubateur-des-ministeres-charges-lecologie-et-des-territoires)

#### Équipe

- Guillaume Levieux, intrapreneur
- Joeffrey Arruyer, coach
- [François Romain](http://francoisromain.com), développeur
