// Le middleware d'authentification vérifie
// le token avant de laisser la requête accéder
// à une route protégée

const jwt = require('jsonwebtoken');


// Vérifier le token de l'utilisateur
const verifierToken = (req, res, next) => {

    // Récupérer le header Authorization
    const authHeader = req.headers.authorization;


    // Vérifier si le header existe
    if (!authHeader) {

        return res.status(401).json({
            error: 'Token manquant'
        });

    }


    // Séparer "Bearer" et le token
    const [type, token] =
        authHeader.split(' ');


    // Vérifier le format du header
    if (type !== 'Bearer' || !token) {

        return res.status(401).json({
            error: 'Format du token invalide'
        });

    }


    try {

        // Vérifier si le token est valide
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );


        // Ajouter les informations
        // de l'utilisateur à la requête
        req.utilisateur = decoded;


        // Continuer vers la route protégée
        next();

    } catch (err) {

        return res.status(401).json({
            error: 'Token invalide ou expiré'
        });

    }

};


// Vérifier si l'utilisateur est administrateur
const verifierAdmin = (req, res, next) => {

    // Vérification supplémentaire
    // au cas où verifierToken n'aurait pas été exécuté
    if (!req.utilisateur) {

        return res.status(401).json({
            error: 'Utilisateur non authentifié'
        });

    }


    // Vérifier le rôle
    if (req.utilisateur.role !== 'admin') {

        return res.status(403).json({
            error: 'Accès interdit'
        });

    }


    // L'utilisateur est administrateur
    next();

};


module.exports = {
    verifierToken,
    verifierAdmin
};