const dt = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Création d'un nouvel utilisateur
const registerUtilisateur = async (req, res) => {

    // Récupérer les informations envoyées par l'utilisateur
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const email = req.body.email;
    const mot_de_passe = req.body.mot_de_passe;
    const telephone = req.body.telephone;

    // Hasher le mot de passe avant de l'enregistrer
    const mot_de_passe_hash = await bcrypt.hash(mot_de_passe, 10);

    // Ajouter l'utilisateur dans la base de données
    dt.query(`
        INSERT INTO utilisateurs
        (nom, prenom, email, mot_de_passe, telephone)
        VALUES (?, ?, ?, ?, ?)
    `,
        [nom, prenom, email, mot_de_passe_hash, telephone],
        (err, result) => {

            // Vérifier s'il y a une erreur
            if (err) {
                console.log(err);

                // Vérifier si l'email existe déjà
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({
                        error: 'Cet email est déjà utilisé'
                    });
                }

                return res.status(500).json({
                    error: 'Erreur lors de la création de l’utilisateur'
                });
            }

            // L'utilisateur a été créé avec succès
            res.status(201).json({
                message: 'Utilisateur créé avec succès'
            });

        });

};


// Connexion d'un utilisateur
const loginUtilisateur = async (req, res) => {

    // Récupérer l'email et le mot de passe
    const email = req.body.email;
    const mot_de_passe = req.body.mot_de_passe;

    // Chercher l'utilisateur avec son email
    dt.query(`
        SELECT * FROM utilisateurs
        WHERE email = ?
    `,
        [email],
        async (err, result) => {

            // Vérifier s'il y a une erreur
            if (err) {
                console.log(err);

                return res.status(500).json({
                    error: 'Erreur lors de la connexion'
                });
            }

            // Vérifier si l'utilisateur existe
            if (result.length === 0) {
                return res.status(401).json({
                    error: 'Email ou mot de passe incorrect'
                });
            }

            // Récupérer l'utilisateur trouvé
            const utilisateur = result[0];
            const motDePasseCorrect = await bcrypt.compare(
                mot_de_passe,
                utilisateur.mot_de_passe
            );
            // Vérifier si le mot de passe est correct
            if (!motDePasseCorrect) {
                return res.status(401).json({
                    error: 'Email ou mot de passe incorrect'
                });
            }
            // Créer un token pour l'utilisateur connecté
            const token = jwt.sign(
                {
                    id_utilisateur: utilisateur.id_utilisateur,
                    role: utilisateur.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1h'
                }
            );
            // Connexion réussie
            return res.status(200).json({
                message: 'Connexion réussie',
                 token,
                utilisateur: {
                     id_utilisateur: utilisateur.id_utilisateur,
        nom: utilisateur.nom,
        prenom: utilisateur.prenom,
        email: utilisateur.email,
        role: utilisateur.role
                }
            });
        });

};


module.exports = {
    registerUtilisateur,
    loginUtilisateur
};