# Déploiement

---

## Environnement de développement

```bash
# démarre l'application un conteneur Docker
# en mode `development`
# accessible à http://localhost:NODE_PORT
docker-compose -f ./docker-compose.local.yml up --build
```

---

## Environnement de test

Pour tester l'application en local dans un environnement de production

Pré-requis:

- une installation locale active de https://github.com/jwilder/nginx-proxy
- un certificat ssl auto-signé
- [instructions](https://medium.com/@francoisromain/set-a-local-web-development-environment-with-custom-urls-and-https-3fbe91d2eaf0)

```bash
# démarre l'application dans un container Docker
# en mode `production`
# accessible à https://flux.camino.local
docker-compose -f ./docker-compose.local.yml up --build
```

---

## Environnement de production

Pré-requis:

- une installation active de https://github.com/jwilder/nginx-proxy
- [instructions](https://medium.com/@francoisromain/host-multiple-websites-with-https-inside-docker-containers-on-a-single-server-18467484ab95)

```bash
# démarre l'application dans un container Docker
# en mode `production`
# accessible à https://{URL}
docker-compose -f ./docker-compose.yml up -d --build
```
