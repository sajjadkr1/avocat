const dt = require('../config/db');


// Recherche des avocats
const rechercherAvocats = (req, res) => {

    const ville = req.query.ville;
    const specialisation = req.query.specialisation;

    console.log("ville :", ville);
    console.log("specialisation :", specialisation);


    // Vérifier les paramètres de recherche
    if (!ville || !specialisation) {

        return res.status(400).json({
            error: 'manque des parametres ville ou specialisation'
        });

    }


    dt.query(`
        SELECT
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
            specialisations.nom

    `, [ville, specialisation], (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                error: 'Database query failed'
            });

        }


        if (result.length === 0) {

            return res.status(404).json({
                error: 'Aucun avocat trouvé pour les critères spécifiés'
            });

        }


        // Transformer les langues en tableau
        result.forEach(avocat => {

            avocat.langues = avocat.langues
                ? avocat.langues.split(',')
                : [];

        });


        res.json(result);

    });

};


// Récupérer un avocat par son ID
const getAvocatById = (req, res) => {

    const id = req.params.id;


    dt.query(`
        SELECT
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
            avocats.traducteur_disponible

    `, [id], (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                error: 'Database query failed'
            });

        }


        if (result.length === 0) {

            return res.status(404).json({
                error: 'Avocat non trouvé'
            });

        }


        const avocat = result[0];

        // Transformer les langues en tableau
        avocat.langues = avocat.langues
            ? avocat.langues.split(',')
            : [];


        res.json(avocat);

    });

};


module.exports = {
    rechercherAvocats,
    getAvocatById
};