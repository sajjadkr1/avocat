const express = require('express');

const {
    verifierToken,
    verifierAdmin
} = require('../middlewares/auth.middleware');

const {
    getAllAvocats,
    deleteAvocat,
    updateAvocat,
    addAvocat,
    getAllRendezVous,
    updateStatutRendezVous
} = require('../controllers/admin.controller');


const router = express.Router();


// Récupérer tous les avocats
router.get(
    '/avocats',
    verifierToken,
    verifierAdmin,
    getAllAvocats
);


// Supprimer un avocat
router.delete(
    '/avocats/:id',
    verifierToken,
    verifierAdmin,
    deleteAvocat
);


// Modifier un avocat
router.put(
    '/avocats/:id',
    verifierToken,
    verifierAdmin,
    updateAvocat
);


// Ajouter un avocat
router.post(
    '/avocats',
    verifierToken,
    verifierAdmin,
    addAvocat
);


// Récupérer tous les rendez-vous
router.get(
    '/rendez-vous',
    verifierToken,
    verifierAdmin,
    getAllRendezVous
);


// Modifier le statut d'un rendez-vous
router.put(
    '/rendez-vous/:id/statut',
    verifierToken,
    verifierAdmin,
    updateStatutRendezVous
);


module.exports = router;