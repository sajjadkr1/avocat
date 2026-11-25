
const BaseModel = require('./base.model');

class RendezVousModel extends BaseModel {

    constructor() {
        super();
    }

    // Vérifier si l'avocat existe
    verifierAvocat(id_avocat, callback) {

        this.db.query(
            `SELECT id_avocat
             FROM avocats
             WHERE id_avocat = ?`,
            [id_avocat],
            callback
        );

    }

    // Vérifier la disponibilité de l'avocat
verifierDisponibilite(
    id_avocat,
    date_rendez_vous,
    heure_rendez_vous,
    callback
) {

    this.db.query(
        `SELECT id_rendez_vous
         FROM rendez_vous
         WHERE id_avocat = ?
         AND date_rendez_vous = ?
         AND heure_rendez_vous = ?
         AND statut != 'annule'`,
        [
            id_avocat,
            date_rendez_vous,
            heure_rendez_vous
        ],
        callback
    );

}

    // Créer un rendez-vous
    creerRendezVous(
        id_utilisateur,
        id_avocat,
        date_rendez_vous,
        heure_rendez_vous,
        motif,
        callback
    ) {

        this.db.query(
            `INSERT INTO rendez_vous
            (
                id_utilisateur,
                id_avocat,
                date_rendez_vous,
                heure_rendez_vous,
                motif
            )
            VALUES (?, ?, ?, ?, ?)`,
            [
                id_utilisateur,
                id_avocat,
                date_rendez_vous,
                heure_rendez_vous,
                motif
            ],
            callback
        );

    }

    // Récupérer les rendez-vous d'un utilisateur
    getMesRendezVous(id_utilisateur, callback) {

        this.db.query(
            `SELECT
                rendez_vous.id_rendez_vous,
                avocats.nom,
                avocats.prenom,
                avocats.email,
                avocats.portable,
                rendez_vous.date_rendez_vous,
                rendez_vous.heure_rendez_vous,
                rendez_vous.statut,
                rendez_vous.motif

            FROM rendez_vous

            JOIN avocats
            ON rendez_vous.id_avocat = avocats.id_avocat

            WHERE rendez_vous.id_utilisateur = ?

            ORDER BY
                rendez_vous.date_rendez_vous ASC,
                rendez_vous.heure_rendez_vous ASC`,
            [id_utilisateur],
            callback
        );

    }

}

module.exports = new RendezVousModel();
