const adminModel = require('../models/admin.model');
// =========================
// RÉCUPÉRER TOUS LES AVOCATS
// =========================
const getAllAvocats = (req, res) => {

    adminModel.getAllAvocats((err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                error: 'Erreur lors de la récupération des avocats'
            });

        }

        return res.status(200).json(result);

    });

};

// =========================
// SUPPRIMER UN AVOCAT
// =========================

const deleteAvocat = (req, res) => {

    const id = req.params.id;

    adminModel.deleteAvocat(id, (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                error: 'Erreur lors de la suppression de l’avocat'
            });

        }

       if (!result.avocatExiste) {
    return res.status(404).json({
        error: 'Avocat non trouvé'
    });
}

        return res.status(200).json({
            message: 'Avocat supprimé avec succès'
        });

    });

};

// =========================
// MODIFIER UN AVOCAT
// =========================


const updateAvocat = (req, res) => {

    const id = req.params.id;

    const nom = req.body.nom?.trim();
    const prenom = req.body.prenom?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const ville = req.body.ville?.trim();
    const portable = req.body.portable?.trim();

    // Vérifier les champs obligatoires
    if (!nom || !prenom || !email || !ville || !portable) {

        return res.status(400).json({
            error: 'Tous les champs doivent être remplis'
        });

    }

    // Vérifier l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {

        return res.status(400).json({
            error: 'Adresse email invalide'
        });

    }

    // Modifier l'avocat
    adminModel.updateAvocat(
        id,
        {
            nom,
            prenom,
            email,
            ville,
            portable
        },
        (err, result) => {

            if (err) {

                console.log(err);

                if (err.code === 'ER_DUP_ENTRY') {

                    return res.status(409).json({
                        error: 'Cet email est déjà utilisé'
                    });

                }

                return res.status(500).json({
                    error: 'Erreur lors de la modification de l’avocat'
                });

            }

            if (result.affectedRows === 0) {

                return res.status(404).json({
                    error: 'Avocat non trouvé'
                });

            }

            return res.status(200).json({
                message: 'Avocat modifié avec succès'
            });

        }
    );

};

// =========================
// RÉCUPÉRER LES SPÉCIALISATIONS
// =========================

const getAllSpecialisations = (req, res) => {

    adminModel.getAllSpecialisations((err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                error: 'Erreur lors de la récupération des spécialisations'
            });

        }

        return res.status(200).json(result);

    });

};


// =========================
// RÉCUPÉRER TOUTES LES LANGUES
// =========================


const getAllLangues = (req, res) => {

    adminModel.getAllLangues((err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                error: 'Erreur lors de la récupération des langues'
            });

        }

        return res.status(200).json(result);

    });

};




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
    if (!nom || !prenom || !email || !ville || !portable) {
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

    // Appeler le Model
    adminModel.addAvocat(
        {
            nom,
            prenom,
            email,
            ville,
            portable,
            img
        },
        id_specialisations,
        id_langues,
        (err, result) => {

            if (err) {
                console.log(err);

                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({
                        error: 'Cet email est déjà utilisé'
                    });
                }

                return res.status(500).json({
                    error: 'Erreur lors de l’ajout de l’avocat'
                });
            }

            return res.status(201).json({
                message: 'Avocat ajouté avec succès',
                id_avocat: result.insertId
            });

        }
    );

};



// =========================
// RÉCUPÉRER TOUS LES RENDEZ-VOUS
// =========================


const getAllRendezVous = (req, res) => {

    adminModel.getAllRendezVous((err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                error: 'Erreur lors de la récupération des rendez-vous'
            });

        }

        return res.status(200).json(result);

    });

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

    adminModel.updateStatutRendezVous(
        id,
        statut,
        (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    error: 'Erreur lors de la modification du statut'
                });

            }

            if (result.affectedRows === 0) {

                return res.status(404).json({
                    error: 'Rendez-vous non trouvé'
                });

            }

            return res.status(200).json({
                message: 'Statut du rendez-vous modifié avec succès'
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
