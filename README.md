
# LegalBridge ⚖️

LegalBridge est une application web développée pour aider les personnes étrangères en France à trouver plus facilement un avocat et à prendre rendez-vous selon leur besoin juridique.

## Fonctionnalités

- Inscription et connexion utilisateur
- Authentification avec JWT
- Consultation des avocats
- Prise de rendez-vous
- Consultation de ses rendez-vous
- Espace administrateur
- Ajout, modification et suppression des avocats
- Gestion du statut des rendez-vous

## Technologies utilisées

### Frontend

- Angular
- TypeScript
- HTML
- CSS

### Backend

- Node.js
- Express.js
- API REST
- JWT
- bcrypt

### Base de données

- SQL
- MySQL

### Outils

- Git
- GitHub
- Postman
- Jest
- Visual Studio Code

## Modèle de la base de données

La base de données de LegalBridge est composée de 7 tables :

- `utilisateurs` : stocke les informations des utilisateurs et leurs rôles.
- `avocats` : contient les informations des avocats.
- `rendez_vous` : gère les rendez-vous entre les utilisateurs et les avocats.
- `specialisations` : contient les domaines de spécialisation juridique.
- `exercer` : table de liaison entre les avocats et leurs spécialisations.
- `langues` : contient les langues disponibles.
- `parler` : table de liaison entre les avocats et les langues qu'ils parlent.

### Diagramme des relations (ERD)

```mermaid
erDiagram
    UTILISATEURS ||--o{ RENDEZ_VOUS : "prend"
    AVOCATS ||--o{ RENDEZ_VOUS : "concerne"

    AVOCATS ||--o{ EXERCER : "possede"
    SPECIALISATIONS ||--o{ EXERCER : "concerne"

    AVOCATS ||--o{ PARLER : "parle"
    LANGUES ||--o{ PARLER : "est utilisee par"

    UTILISATEURS {
        int id_utilisateur PK
        varchar nom
        varchar prenom
        varchar email UK
        varchar mot_de_passe
        varchar telephone
        varchar role
        datetime date_creation
    }

    AVOCATS {
        int id_avocat PK
        varchar nom
        varchar prenom
        varchar email UK
        varchar ville
        varchar portable
        varchar adresse
        varchar img
        text description
        boolean traducteur_disponible
    }

    RENDEZ_VOUS {
        int id_rendez_vous PK
        int id_utilisateur FK
        int id_avocat FK
        date date_rendez_vous
        time heure_rendez_vous
        varchar statut
        text motif
        datetime date_creation
    }

    SPECIALISATIONS {
        int id_specialisation PK
        varchar nom UK
    }

    EXERCER {
        int id_avocat PK, FK
        int id_specialisation PK, FK
    }

    LANGUES {
        int id_langue PK
        varchar nom UK
    }

    PARLER {
        int id_avocat PK, FK
        int id_langue PK, FK
    }
```

## Tests

Le projet contient des tests unitaires avec Jest.

J’utilise également Postman pour tester manuellement les routes de l’API.

## Sécurité

- Hashage des mots de passe avec bcrypt
- Authentification avec JWT
- Protection des routes administrateur
- Validation des données côté serveur
- Requêtes SQL paramétrées

## Objectif du projet

Ce projet m’a permis de développer une application full-stack avec Angular, Node.js, Express et SQL, tout en travaillant sur l’authentification, les API REST, la gestion des rendez-vous et l’administration.

## Auteur

Sajjad
