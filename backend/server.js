require('dotenv').config();

const http = require('http');
const app = require('./app');

// Création du serveur HTTP
const server = http.createServer((req, res) => {
     
    // Route d'accueil avec le module HTTP natif
    if (req.method === 'GET' && req.url === '/') {

        res.writeHead(200, {
            'Content-Type': 'text/plain; charset=utf-8'
        });
        res.end('Bienvenue sur LegalBridge API');

    } else {
    
        // Les autres routes sont traitées par Express
        app(req, res);
    }
});

// Démarrage du serveur
server.listen(5000, () => {
    console.log('server is running on port 5000');
});