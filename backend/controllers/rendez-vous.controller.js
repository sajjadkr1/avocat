const dt = require('../config/db');


// =========================
// CRÉER UN RENDEZ-VOUS
// =========================

const creerRendezVous = (req, res) => {

    // Récupérer l'utilisateur connecté
    // directement depuis le JWT
    const id_utilisateur =
        req.utilisateur.id_utilisateur;


    // Récupérer les données envoyées
    const id_avocat =
        req.body.id_avocat;

    const date_rendez_vous =
        req.body.date_rendez_vous;

    const heure_rendez_vous =
        req.body.heure_rendez_vous;

    const motif =
        req.body.motif?.trim();


    // Vérifier les champs obligatoires
    if (
        !id_avocat ||
        !date_rendez_vous ||
        !heure_rendez_vous ||
        !motif
    ) {

        return res.status(400).json({
            error:
                'Les informations du rendez-vous sont incomplètes'
        });

    }


    // Vérifier que la date
    // et l'heure sont dans le futur
    const dateRendezVous =
        new Date(
            `${date_rendez_vous}T${heure_rendez_vous}`
        );


    const maintenant =
        new Date();


    if (
        isNaN(dateRendezVous.getTime()) ||
        dateRendezVous <= maintenant
    ) {

        return res.status(400).json({
            error:
                'La date et l’heure du rendez-vous doivent être dans le futur'
        });

    }


    // Vérifier que l'avocat existe
    dt.query(
        `
        SELECT id_avocat
        FROM avocats
        WHERE id_avocat = ?
        `,
        [id_avocat],

        (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    error:
                        'Erreur lors de la vérification de l’avocat'
                });

            }


            if (result.length === 0) {

                return res.status(404).json({
                    error:
                        'Avocat introuvable'
                });

            }


            // Créer le rendez-vous
            dt.query(
                `
                INSERT INTO rendez_vous
                (
                    id_utilisateur,
                    id_avocat,
                    date_rendez_vous,
                    heure_rendez_vous,
                    motif
                )
                VALUES (?, ?, ?, ?, ?)
                `,
                [
                    id_utilisateur,
                    id_avocat,
                    date_rendez_vous,
                    heure_rendez_vous,
                    motif
                ],

                (err, result) => {

                    if (err) {

                        console.log(err);

                        return res.status(500).json({
                            error:
                                'Erreur lors de la création du rendez-vous'
                        });

                    }


                    return res.status(201).json({

                        message:
                            'Rendez-vous créé avec succès',

                        id_rendez_vous:
                            result.insertId

                    });

                }
            );

        }
    );

};


// =========================
// MES RENDEZ-VOUS
// =========================

const getMesRendezVous = (req, res) => {

    // Récupérer l'utilisateur connecté
    const id_utilisateur =
        req.utilisateur.id_utilisateur;


    dt.query(
        `
        SELECT
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
        ON rendez_vous.id_avocat =
           avocats.id_avocat

        WHERE rendez_vous.id_utilisateur = ?

        ORDER BY
            rendez_vous.date_rendez_vous ASC,
            rendez_vous.heure_rendez_vous ASC
        `,
        [id_utilisateur],

        (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    error:
                        'Erreur lors de la récupération des rendez-vous'
                });

            }


            return res.status(200).json(
                result
            );

        }
    );

};


module.exports = {
    creerRendezVous,
    getMesRendezVous
};