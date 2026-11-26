const BaseModel = require('./base.model');

class AdminModel extends BaseModel {

    constructor() {
        super();
    }
     // Récupérer tous les avocats
     getAllAvocats(callback) {

         this.db.query(
            `
            SELECT
                id_avocat,
                nom,
                prenom,
                email,
                ville,
                portable
            FROM avocats
            `,
            callback
        );

    }
    // Récupérer toutes les spécialisations
    getAllSpecialisations(callback) {

        this.db.query(
            `
            SELECT * FROM specialisations
            `,
            callback
        );

    }

    // Récupérer toutes les langues
    getAllLangues(callback) {

        this.db.query(
            `
            SELECT * FROM langues
            `,
            callback
        );

    }

     
    // Supprimer un avocat
    deleteAvocat(id, callback) {

        this.db.beginTransaction((err) => {

            if (err) {
                return callback(err);
            }

            this.db.query(
                'DELETE FROM exercer WHERE id_avocat = ?',
                [id],
                (err) => {

                    if (err) {
                        return this.db.rollback(() => callback(err));
                    }

                    this.db.query(
                        'DELETE FROM parler WHERE id_avocat = ?',
                        [id],
                        (err) => {

                            if (err) {
                                return this.db.rollback(() => callback(err));
                            }

                            this.db.query(
                                'DELETE FROM avocats WHERE id_avocat = ?',
                                [id],
                                (err, result) => {

                                    if (err) {
                                        return this.db.rollback(() => callback(err));
                                    }

                                    if (result.affectedRows === 0) {
                                        return this.db.rollback(() => {
                                            callback(null, result);
                                        });
                                    }

                                    this.db.commit((err) => {

                                        if (err) {
                                            return this.db.rollback(() => callback(err));
                                        }

                                        callback(null, result);

                                    });

                                }
                            );

                        }
                    );

                }
            );

        });

    }

   
  
   
// Modifier un avocat
updateAvocat(id, donnees, callback) {

    this.db.query(
        `
        SELECT id_avocat
        FROM avocats
        WHERE id_avocat = ?
        `,
        [id],
        (err, result) => {

            if (err) {
                return callback(err);
            }

            // Vérifier si l'avocat existe
            if (result.length === 0) {
                return callback(null, {
                    affectedRows: 0,
                    avocatExiste: false
                });
            }

            // Modifier l'avocat
            this.db.query(
                `
                UPDATE avocats
                SET
                    nom = ?,
                    prenom = ?,
                    email = ?,
                    ville = ?,
                    portable = ?
                WHERE id_avocat = ?
                `,
                [
                    donnees.nom,
                    donnees.prenom,
                    donnees.email,
                    donnees.ville,
                    donnees.portable,
                    id
                ],
                (err, result) => {

                    if (err) {
                        return callback(err);
                    }

                    callback(null, {
                        ...result,
                        avocatExiste: true
                    });
                }
            );
        }
    );
}


    // Ajouter un avocat avec ses spécialisations et ses langues
    addAvocat(donnees, id_specialisations, id_langues, callback) {

        this.db.beginTransaction((err) => {

            if (err) {
                return callback(err);
            }

            // Ajouter l'avocat
            this.db.query(
                `
                INSERT INTO avocats
                (
                    nom,
                    prenom,
                    email,
                    ville,
                    portable,
                    img
                )
                VALUES (?, ?, ?, ?, ?, ?)
                `,
                [
                    donnees.nom,
                    donnees.prenom,
                    donnees.email,
                    donnees.ville,
                    donnees.portable,
                    donnees.img
                ],
                (err, result) => {

                    if (err) {
                        return this.db.rollback(() => callback(err));
                    }

                    const idAvocat = result.insertId;

                    // Ajouter les spécialisations
                    const ajouterSpecialisations = (next) => {

                        if (id_specialisations.length === 0) {
                            return next(null);
                        }

                        const valeurs = id_specialisations.map(id => [
                            idAvocat,
                            id
                        ]);

                        this.db.query(
                            `
                            INSERT INTO exercer
                            (id_avocat, id_specialisation)
                            VALUES ?
                            `,
                            [valeurs],
                            next
                        );
                    };

                    // Ajouter les langues
                    const ajouterLangues = (next) => {

                        if (id_langues.length === 0) {
                            return next(null);
                        }

                        const valeurs = id_langues.map(id => [
                            idAvocat,
                            id
                        ]);

                        this.db.query(
                            `
                            INSERT INTO parler
                            (id_avocat, id_langue)
                            VALUES ?
                            `,
                            [valeurs],
                            next
                        );
                    };

                    // Enregistrer les spécialisations
                    ajouterSpecialisations((err) => {

                        if (err) {
                            return this.db.rollback(() => callback(err));
                        }

                        // Enregistrer les langues
                        ajouterLangues((err) => {

                            if (err) {
                                return this.db.rollback(() => callback(err));
                            }

                            // Confirmer la transaction
                            this.db.commit((err) => {

                                if (err) {
                                    return this.db.rollback(() => callback(err));
                                }

                                callback(null, {
                                    insertId: idAvocat
                                });

                            });
                        });
                    });
                }
            );
        });
    }


// Récupérer tous les rendez-vous
getAllRendezVous(callback) {

    this.db.query(
        `
        SELECT
            rendez_vous.id_rendez_vous,
            rendez_vous.id_utilisateur,
            utilisateurs.nom AS nom_utilisateur,
            utilisateurs.prenom AS prenom_utilisateur,
            rendez_vous.id_avocat,
            avocats.nom AS nom_avocat,
            avocats.prenom AS prenom_avocat,
            rendez_vous.date_rendez_vous,
            rendez_vous.heure_rendez_vous,
            rendez_vous.statut,
            rendez_vous.motif,
            rendez_vous.date_creation
        FROM rendez_vous
        JOIN utilisateurs
            ON rendez_vous.id_utilisateur = utilisateurs.id_utilisateur
        JOIN avocats
            ON rendez_vous.id_avocat = avocats.id_avocat
        ORDER BY rendez_vous.date_rendez_vous DESC
        `,
        callback
    );

}


// Modifier le statut d'un rendez-vous
updateStatutRendezVous(id, statut, callback) {

    this.db.query(
        `
        UPDATE rendez_vous
        SET statut = ?
        WHERE id_rendez_vous = ?
        `,
        [statut, id],
        callback
    );

}



     }


module.exports = new AdminModel();