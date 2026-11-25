
const BaseModel = require('./base.model');

class AvocatModel extends BaseModel {

    constructor() {
        super();
    }

    // Rechercher les avocats par ville et spécialisation
    rechercherAvocats(ville, specialisation, callback) {

        this.db.query(
            `SELECT
                avocats.id_avocat,
                avocats.nom,
                avocats.prenom,
                avocats.email,
                avocats.ville,
                avocats.portable,
                avocats.adresse,
                avocats.img,
                avocats.description,
                avocats.traducteur_disponible,

                specialisations.nom AS specialisation,

                GROUP_CONCAT(
                    DISTINCT langues.nom
                    SEPARATOR ','
                ) AS langues

            FROM avocats

            JOIN exercer
                ON avocats.id_avocat = exercer.id_avocat

            JOIN specialisations
                ON exercer.id_specialisation = specialisations.id_specialisation

            LEFT JOIN parler
                ON avocats.id_avocat = parler.id_avocat

            LEFT JOIN langues
                ON parler.id_langue = langues.id_langue

            WHERE avocats.ville = ?
            AND specialisations.nom = ?

            GROUP BY
                avocats.id_avocat,
                avocats.nom,
                avocats.prenom,
                avocats.email,
                avocats.ville,
                avocats.portable,
                avocats.adresse,
                avocats.img,
                avocats.description,
                avocats.traducteur_disponible,
                specialisations.nom`,
            [ville, specialisation],
            callback
        );

    }

    // Récupérer un avocat par son ID
    getAvocatById(id, callback) {

        this.db.query(
            `SELECT
                avocats.id_avocat,
                avocats.nom,
                avocats.prenom,
                avocats.email,
                avocats.ville,
                avocats.portable,
                avocats.adresse,
                avocats.img,
                avocats.description,
                avocats.traducteur_disponible,

                GROUP_CONCAT(
                    DISTINCT specialisations.nom
                    SEPARATOR ','
                ) AS specialisation,

                GROUP_CONCAT(
                    DISTINCT langues.nom
                    SEPARATOR ','
                ) AS langues

            FROM avocats

            LEFT JOIN exercer
                ON avocats.id_avocat = exercer.id_avocat

            LEFT JOIN specialisations
                ON exercer.id_specialisation = specialisations.id_specialisation

            LEFT JOIN parler
                ON avocats.id_avocat = parler.id_avocat

            LEFT JOIN langues
                ON parler.id_langue = langues.id_langue

            WHERE avocats.id_avocat = ?

            GROUP BY
                avocats.id_avocat,
                avocats.nom,
                avocats.prenom,
                avocats.email,
                avocats.ville,
                avocats.portable,
                avocats.adresse,
                avocats.img,
                avocats.description,
                avocats.traducteur_disponible`,
            [id],
            callback
        );

    }

}

module.exports = new AvocatModel();
