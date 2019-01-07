Flux géographiques Camino

---

Les flux d’informations géographiques de Camino permettent de publier les informations administratives et géographiques relatives aux titres miniers valides et demandes initiales ou modificatives afférentes publiques et en cours d'instruction. Ces informations sont également disponibles pour les autorisations d’exploitation en Guyane.

Le format “Geojson” de publication des données est un format ouvert et réutilisable qui permet notamment l’utilisation de ces données par des services tiers ou des logiciels de visualisation ou gestion d’information géographique.

Ces flux sont mis à jour chaque matin

Ce mode de diffusion des données de Camino est basé sur les services de l’API qui offre des possibilités de requêtes avancées plus souples et complètes. L’API est disponible sur http://api.camino.beta.gouv.fr. 

---

Comment utiliser les flux géographiques Camino ?

---

> Avec le Géoportail : www.geoportail.gouv.fr
Bouton clef à molette à droite “Accéder aux outils cartographiques” > “Importer des données” > Format “geojson” > “par url” > copier-coller l’url d’un des flux Camino > ajouter un titre > importer.

> Avec QGIS : http://qgis.org
Glisser-déposer l’un des fichiers flux geojson préalablement téléchargé dans un projet Qgis ouvert.

> Avec un webservice tiers : http://geojson.io
Copier-coller le contenu d’un des flux dans l’éditeur JSON ou “Open” et sélectionner l’un des flux préalablement téléchargé et ouvrir.

---

Informations disponibles dans les flux géographiques Camino

---

> Informations administratives

    "properties": {
        "id": "id du titres dans Camino sous la forme : idDuDomaineMinier-idDuTypeDeTitre-NomDuTitre-AnnéeDeDemandeOuDOctroi",
        "nom": "Nom du Titre",
        "type": "type de titre",
        "domaine": "type de domaine minier",
        "statut": "Statut du titre [demande initiale / valide / modification en instance",
        "volume": “volume si applicable”,
        "surface": “surface légale indiquée dans l’acte”,
        "substances": “liste des substances légales”,
        "titulaires": “nom du ou des titulaires du titre”,
        "amodiataires": “nom du ou des amodiataires du titre”,
        "references": "nom de la référence métier et référence associée",
        "date_debut": “date de début de validité du titre”,
        "date_fin": “date de fin de validité du titre”,
        "date_demande": "date de la demande",
        "url": "url de la fiche du titre dans Camino"
    }


> Informations géographiques

    "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
            [
                [
                    [ 
                        Longitudes de chaque sommet au format WGS84,
                        Latitudes de chaque sommet au format WGS84]
                    ]
                ]
            ]
        ]
    }

Plus d’information sur la projection utilisée (WGS84) : http://spatialreference.org/ref/epsg/wgs-84/ 

Les périmètres de titres miniers peuvent prendre la forme d’un ou plusieurs polygones excluant ou non des enclaves. Le type "MultiPolygon" permet de prendre en compte cette diversité de forme.

---

Liste des flux géographiques disponibles.

---

La liste des flux géographiques de Camino est disponible dans le fichier “infos.json” (https://flux.camino.beta.gouv.fr/geojson/infos.json)

Ils sont disponibles par type de domaine minier, type de titre et autorisation, type de statut de validité.
