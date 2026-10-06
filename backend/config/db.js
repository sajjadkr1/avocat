const path = require('node:path');
const mysql = require('mysql2');

require('dotenv').config({
    path: path.resolve(__dirname, '../.env')
});

const dt = mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dateStrings: true
});

dt.connect((err) => {
    if (err) {
        console.error('Connexion à MySQL échouée :', err.code);
        return;
    }

    console.log('Connexion à MySQL réussie.');
});

module.exports = dt;