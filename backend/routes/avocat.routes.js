const express = require('express');

const {
    rechercherAvocats,
    getAvocatById
} = require('../controllers/avocat.controller');

const router = express.Router();

// Recherche des avocats
router.get('/', rechercherAvocats);

// Récupérer un avocat par son ID
router.get('/:id', getAvocatById);

module.exports = router;