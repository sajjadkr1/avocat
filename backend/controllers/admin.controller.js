const dt = require('../config/db');



// =========================
// RÉCUPÉRER TOUS LES AVOCATS
// =========================

const getAllAvocats = (req, res) => {

    dt.query(
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
        (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    error:
                        'Erreur lors de la récupération des avocats'
                });

            }


            return res.status(200).json(
                result
            );

        }
    );

};


// =========================
// SUPPRIMER UN AVOCAT
// =========================


const deleteAvocat = (req, res) => {

    const id = req.params.id;

    dt.beginTransaction((err) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                error: 'Erreur lors de la transaction'
            });

        }

        // Supprimer les spécialisations
        dt.query(
            `
            DELETE FROM exercer
            WHERE id_avocat = ?
            `,
            [id],
            (err) => {

                if (err) {

                    return dt.rollback(() => {

                        console.log(err);

                        return res.status(500).json({
                            error: 'Erreur lors de la suppression des spécialisations'
                        });

                    });

                }

                // Supprimer les langues
                dt.query(
                    `
                    DELETE FROM parler
                    WHERE id_avocat = ?
                    `,
                    [id],
                    (err) => {

                        if (err) {

                            return dt.rollback(() => {

                                console.log(err);

                                return res.status(500).json({
                                    error: 'Erreur lors de la suppression des langues'
                                });

                            });

                        }

                        // Supprimer l'avocat
                        dt.query(
                            `
                            DELETE FROM avocats
                            WHERE id_avocat = ?
                            `,
                            [id],
                            (err, result) => {

                                if (err) {

                                    return dt.rollback(() => {

                                        console.log(err);

                                        return res.status(500).json({
                                            error: 'Erreur lors de la suppression de l’avocat'
                                        });

                                    });

                                }

                                if (result.affectedRows === 0) {

                                    return dt.rollback(() => {

                                        return res.status(404).json({
                                            error: 'Avocat non trouvé'
                                        });

                                    });

                                }

                                // Confirmer la transaction
                                dt.commit((err) => {

                                    if (err) {

                                        return dt.rollback(() => {

                                            console.log(err);

                                            return res.status(500).json({
                                                error: 'Erreur lors de la validation'
                                            });

                                        });

                                    }

                                    return res.status(200).json({
                                        message: 'Avocat supprimé avec succès'
                                    });

                                });

                            }
                        );

                    }
                );

            }
        );

    });

};


// =========================
// MODIFIER UN AVOCAT
// =========================

const updateAvocat = (req, res) => {

    const id =
        req.params.id;


    const nom =
        req.body.nom?.trim();

    const prenom =
        req.body.prenom?.trim();

    const email =
        req.body.email?.trim().toLowerCase();

    const ville =
        req.body.ville?.trim();

    const portable =
        req.body.portable?.trim();


    // Vérifier les champs obligatoires
    if (
        !nom ||
        !prenom ||
        !email ||
        !ville ||
        !portable
    ) {

        return res.status(400).json({
            error:
                'Tous les champs doivent être remplis'
        });

    }


    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (
        !emailRegex.test(email)
    ) {

        return res.status(400).json({
            error:
                'Adresse email invalide'
        });

    }


    dt.query(
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
            nom,
            prenom,
            email,
            ville,
            portable,
            id
        ],

        (err, result) => {

            if (err) {

                console.log(err);


                if (
                    err.code ===
                    'ER_DUP_ENTRY'
                ) {

                    return res.status(409).json({
                        error:
                            'Cet email est déjà utilisé'
                    });

                }


                return res.status(500).json({
                    error:
                        'Erreur lors de la modification de l’avocat'
                });

            }


            if (
                result.affectedRows === 0
            ) {

                return res.status(404).json({
                    error:
                        'Avocat non trouvé'
                });

            }


            return res.status(200).json({
                message:
                    'Avocat modifié avec succès'
            });

        }
    );

};

// =========================
// RÉCUPÉRER LES SPÉCIALISATIONS
// =========================
const getAllSpecialisations = (req, res) => {

    dt.query(
        `
        SELECT * FROM specialisations
        `,
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    error:
                    'Erreur lors de la récupération des spécialisations'
                });
            }
            return res.status(200).json(result);
        }
    );
};

// =========================
// RÉCUPÉRER TOUTES LES LANGUES
// =========================

const getAllLangues = (req, res) => {
    dt.query(
        `
        SELECT * FROM langues
        `,
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    error:
                    'Erreur lors de la récupération des langues'
                });
            }
            return res.status(200).json(result);
        }
    );
};

// =========================
// AJOUTER UN AVOCAT
// =========================

// =========================
// AJOUTER UN AVOCAT
// =========================

const addAvocat = (req, res) => {

    const nom = req.body.nom?.trim();
    const prenom = req.body.prenom?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const ville = req.body.ville?.trim();
    const portable = req.body.portable?.trim();

    // Récupérer l'image
    const img = req.file
        ? `/uploads/${req.file.filename}`
        : null;

    // Récupérer les spécialisations et les langues
    let id_specialisations;
    let id_langues;

    try {

        id_specialisations = JSON.parse(
            req.body.id_specialisations || '[]'
        );

        id_langues = JSON.parse(
            req.body.id_langues || '[]'
        );

    } catch (error) {

        return res.status(400).json({
            error: 'Format des spécialisations ou langues invalide'
        });

    }

    // Vérifier les champs obligatoires
    if (
        !nom ||
        !prenom ||
        !email ||
        !ville ||
        !portable
    ) {

        return res.status(400).json({
            error: 'Tous les champs doivent être remplis'
        });

    }

    // Vérifier les spécialisations et les langues
    if (
        !Array.isArray(id_specialisations) ||
        !Array.isArray(id_langues) ||
        !id_specialisations.every(id =>
            Number.isInteger(id) && id > 0
        ) ||
        !id_langues.every(id =>
            Number.isInteger(id) && id > 0
        )
    ) {

        return res.status(400).json({
            error: 'Spécialisations ou langues invalides'
        });

    }

    // Supprimer les doublons
    id_specialisations = [...new Set(id_specialisations)];
    id_langues = [...new Set(id_langues)];

    // Vérifier l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {

        return res.status(400).json({
            error: 'Adresse email invalide'
        });

    }

    // Commencer une transaction
    dt.beginTransaction((err) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                error: 'Erreur lors de la transaction'
            });

        }

        // Ajouter l'avocat
        dt.query(
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
                nom,
                prenom,
                email,
                ville,
                portable,
                img
            ],

            (err, result) => {

                if (err) {

                    return dt.rollback(() => {

                        console.log(err);

                        if (err.code === 'ER_DUP_ENTRY') {

                            return res.status(409).json({
                                error: 'Cet email est déjà utilisé'
                            });

                        }

                        return res.status(500).json({
                            error: 'Erreur lors de l’ajout de l’avocat'
                        });

                    });

                }

                const idAvocat = result.insertId;

                // Ajouter les spécialisations
                const ajouterSpecialisations = (callback) => {

                    if (id_specialisations.length === 0) {
                        return callback(null);
                    }

                    const valeurs = id_specialisations.map(id => [
                        idAvocat,
                        id
                    ]);

                    dt.query(
                        `
                        INSERT INTO exercer
                        (
                            id_avocat,
                            id_specialisation
                        )
                        VALUES ?
                        `,
                        [valeurs],
                        callback
                    );

                };

                // Ajouter les langues
                const ajouterLangues = (callback) => {

                    if (id_langues.length === 0) {
                        return callback(null);
                    }

                    const valeurs = id_langues.map(id => [
                        idAvocat,
                        id
                    ]);

                    dt.query(
                        `
                        INSERT INTO parler
                        (
                            id_avocat,
                            id_langue
                        )
                        VALUES ?
                        `,
                        [valeurs],
                        callback
                    );

                };

                // Enregistrer les spécialisations
                ajouterSpecialisations((err) => {

                    if (err) {

                        return dt.rollback(() => {

                            console.log(err);

                            return res.status(500).json({
                                error: 'Erreur lors de l’ajout des spécialisations'
                            });

                        });

                    }

                    // Enregistrer les langues
                    ajouterLangues((err) => {

                        if (err) {

                            return dt.rollback(() => {

                                console.log(err);

                                return res.status(500).json({
                                    error: 'Erreur lors de l’ajout des langues'
                                });

                            });

                        }

                        // Confirmer la transaction
                        dt.commit((err) => {

                            if (err) {

                                return dt.rollback(() => {

                                    console.log(err);

                                    return res.status(500).json({
                                        error: 'Erreur lors de la validation'
                                    });

                                });

                            }

                            return res.status(201).json({

                                message: 'Avocat ajouté avec succès',

                                id_avocat: idAvocat

                            });

                        });

                    });

                });

            }
        );

    });

};


// =========================
// RÉCUPÉRER TOUS LES RENDEZ-VOUS
// =========================

const getAllRendezVous = (req, res) => {

    dt.query(
        `
        SELECT
            rendez_vous.id_rendez_vous,
            rendez_vous.id_utilisateur,

            utilisateurs.nom
                AS nom_utilisateur,

            utilisateurs.prenom
                AS prenom_utilisateur,

            rendez_vous.id_avocat,

            avocats.nom
                AS nom_avocat,

            avocats.prenom
                AS prenom_avocat,

            rendez_vous.date_rendez_vous,
            rendez_vous.heure_rendez_vous,
            rendez_vous.statut,
            rendez_vous.motif,
            rendez_vous.date_creation

        FROM rendez_vous

        JOIN utilisateurs
        ON rendez_vous.id_utilisateur =
           utilisateurs.id_utilisateur

        JOIN avocats
        ON rendez_vous.id_avocat =
           avocats.id_avocat

        ORDER BY
            rendez_vous.date_rendez_vous DESC
        `,

        (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    error:
                        'Erreur lors de la récupération des rendez-vous'
                });

            }

            return res.status(200).json(result);

        }
    );

};


// =========================
// MODIFIER LE STATUT
// =========================

const updateStatutRendezVous = (req, res) => {

    const id = req.params.id;
    const statut = req.body.statut;

    const statutsAutorises = [
        'en_attente',
        'confirme',
        'annule'
    ];

    if (!statutsAutorises.includes(statut)) {

        return res.status(400).json({
            error: 'Statut invalide'
        });

    }

    dt.query(
        `
        UPDATE rendez_vous
        SET statut = ?
        WHERE id_rendez_vous = ?
        `,
        [
            statut,
            id
        ],

        (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    error:
                        'Erreur lors de la modification du statut'
                });

            }

            if (result.affectedRows === 0) {

                return res.status(404).json({
                    error: 'Rendez-vous non trouvé'
                });

            }

            return res.status(200).json({
                message:
                    'Statut du rendez-vous modifié avec succès'
            });

        }
    );

};


module.exports = {
    getAllAvocats,
    deleteAvocat,
    updateAvocat,
    addAvocat,
    getAllRendezVous,
    updateStatutRendezVous,
    getAllSpecialisations,
    getAllLangues
};
