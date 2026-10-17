const express = require('express');

const {
    verifierToken,
    verifierAdmin
} = require('../middlewares/auth.middleware');

const {
    getAllAvocats,
    deleteAvocat,
    updateAvocat,
    addAvocat
} = require('../controllers/admin.controller');

const router = express.Router();


// Route de test admin
router.get(
    '/test',
    verifierToken,
    verifierAdmin,
    (req, res) => {

        res.status(200).json({
            message: 'Accès admin autorisé'
        });
    }
);


// Récupérer tous les avocats
router.get(
    '/avocats',
    verifierToken,
    verifierAdmin,
    getAllAvocats
    
);

router.delete(
    '/avocats/:id',
    verifierToken,
    verifierAdmin,
    deleteAvocat
);

router.put(
    '/avocats/:id',
    verifierToken,
    verifierAdmin,
    updateAvocat
);
router.post(
    '/avocats',
    verifierToken,
    verifierAdmin,
    addAvocat
);


module.exports = router;