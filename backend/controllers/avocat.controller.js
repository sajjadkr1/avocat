const avocatModel = require('../models/avocat.model');

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


    
    avocatModel.rechercherAvocats(ville, specialisation, (err, result) => {

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
    avocatModel.getAvocatById(id, (err, result) => {
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