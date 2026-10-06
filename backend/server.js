require('dotenv').config();
const app = require('./app');

// Démarrage du serveur Express
app.listen(5000, () => {
    console.log('server is running on port 5000');
});