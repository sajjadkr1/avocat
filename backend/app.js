const express = require('express');
const cors = require('cors');
const rendezVousRoutes = require('./routes/rendez-vous.routes');
const avocatRoutes = require('./routes/avocat.routes');

const utilisateurRoutes = require('./routes/utilisateur.routes')

const app = express();

// Permet à Express de lire les données JSON
app.use(express.json());

// Autorise le frontend Angular à communiquer avec notre API
app.use(cors({
    origin: [
        'http://localhost:4200',
        'http://127.0.0.1:4200'
    ]
}));

// Routes des avocats
app.use('/api/avocats', avocatRoutes);

app.use('/api/utilisateurs', utilisateurRoutes);
app.use('/api/rendez-vous', rendezVousRoutes);

module.exports = app;