const express = require('express');

const { creerRendezVous, getMesRendezVous } = require('../controllers/rendez-vous.controller');

const { verifierToken } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', verifierToken, creerRendezVous);
router.get('/mes-rendez-vous', verifierToken, getMesRendezVous);
module.exports = router;