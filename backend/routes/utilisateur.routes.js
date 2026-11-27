const express = require('express');

const {
    registerUtilisateur,
    loginUtilisateur,
    getProfilUtilisateur,
    modifierProfilUtilisateur,
    supprimerProfilUtilisateur
} = require('../controllers/utilisateur.controller');

const {
    verifierToken
} = require('../middlewares/auth.middleware');

const router = express.Router();


// Inscription
router.post('/register', registerUtilisateur);


// Connexion
router.post('/login', loginUtilisateur);

// Profil protégé par JWT
router.get('/me', verifierToken, getProfilUtilisateur);

// Modifier le profil
router.put('/me', verifierToken, modifierProfilUtilisateur);

// Supprimer le compte
router.delete('/me', verifierToken, supprimerProfilUtilisateur);


// Profil protégé par JWT
router.get('/profil', verifierToken, (req, res) => {

    res.status(200).json({
        message: 'Accès autorisé',
        utilisateur: req.utilisateur
    });

});


module.exports = router;