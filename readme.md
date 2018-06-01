# Camino flux

> Flux de données générés quotidiennement à partir de l'API de [Camino](https://camino.beta.gouv.fr).

Application en cours de développement, provisoirement accessible [ici](https://camino.site).

---

## Technologies

* Node.js
* Express.js

### Outils

* Eslint
* Prettier
* Standardjs

---

## Configuration

* Renommer le fichier `.env.example` en `.env`.
* Compléter le fichier `env`.

---

## Npm scripts

```bash
# Installe les dépendances
npm install

# Créé les fichiers geojson des titres miniers à partir de l'api
# et les enregistre dans le dossier /index/geojson
npm run dist

# Démarre le serveur qui sert les fichiers du dossier /index
npm start
```

---

## Docker

### Serveur local dans un container docker

```bash
# Démarre le serveur de fichier dans un conteneur Docker
# en mode `development`
# écoute sur http://localhost:NODE_PORT
docker-compose -f ./docker-compose.localhost.yml up --build
```

### Tester l'application en local dans un environement de production

Pré-requis:

* une installation locale active de https://github.com/jwilder/nginx-proxy
* un certificat ssl auto-signé

[instructions](https://medium.com/@francoisromain/set-a-local-web-development-environment-with-custom-urls-and-https-3fbe91d2eaf0)

```bash
# Démarre l'application dans un container Docker
# en mode `production`
# accessible sur https://flux.camino.local
docker-compose -f ./docker-compose.local.yml up --build
```

### Serveur de production

Pré-requis:

* une installation active de https://github.com/jwilder/nginx-proxy

[instructions](https://medium.com/@francoisromain/host-multiple-websites-with-https-inside-docker-containers-on-a-single-server-18467484ab95)

```bash
docker-compose -f ./docker-compose.yml up --build
```

---

## Contribution

Voir `contributing.md` (en anglais) pour plus d'infos.

---

## Credits

### Production

* [La Fabrique Numérique, Ministère de la transition écologique et solidaire](https://www.ecologique-solidaire.gouv.fr/inauguration-fabrique-numerique-lincubateur-des-ministeres-charges-lecologie-et-des-territoires)

#### Équipe

* Guillaume Levieux, intrapreneur
* Joeffrey Arruyer, coach
* [François Romain](http://francoisromain.com), développeur
