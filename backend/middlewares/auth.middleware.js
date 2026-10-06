//Le middleware d'authentification vérifie 
// le token avant de laisser la requête accéder à une route protégée
const jwt = require('jsonwebtoken');
// Vérifier le token de l'utilisateur
const verifierToken = (req, res, next) => {

    // Récupérer le token envoyé dans le header Authorization//

   // Je récupère le header Authorization de
    // la requête pour pouvoir vérifier le token de l'utilisateur
const authHeader = req.headers.authorization;
// Vérifier si le token existe
if (!authHeader) {
    return res.status(401).json({
        error: 'Token manquant'
    });
}
 // Récupérer seulement le token après "Bearer"
const token = authHeader.split(' ')[1];

try {

    // Vérifier si le token est valide
    const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
    );
// Ajouter les informations de l'utilisateur à la requête
    req.utilisateur = decoded;
 // Continuer vers la prochaine étape
    next();
} catch (err) {

    return res.status(401).json({
        error: 'Token invalide ou expiré'
    });
}

};
module.exports = {
    verifierToken
};