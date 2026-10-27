const dt = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Création d'un nouvel utilisateur
const registerUtilisateur = async (req, res) => {

    const nom = req.body.nom?.trim();
    const prenom = req.body.prenom?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const mot_de_passe = req.body.mot_de_passe;

    const telephone =
        req.body.telephone?.trim() || null;


    // Vérifier les champs obligatoires
    if (
        !nom ||
        !prenom ||
        !email ||
        !mot_de_passe
    ) {
        return res.status(400).json({
            error: 'Tous les champs obligatoires doivent être remplis'
        });
    }


    // Vérifier le format de l'adresse email
    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailRegex.test(email)) {

        return res.status(400).json({
            error: 'Adresse email invalide'
        });

    }


    // Vérifier la longueur du mot de passe
    if (mot_de_passe.length < 8) {

        return res.status(400).json({
            error: 'Le mot de passe doit contenir au moins 8 caractères'
        });

    }


    // Hacher le mot de passe
    const mot_de_passe_hash =
        await bcrypt.hash(
            mot_de_passe,
            10
        );


    // Ajouter l'utilisateur dans la base de données
    dt.query(`
        INSERT INTO utilisateurs
        (nom, prenom, email, mot_de_passe, telephone)
        VALUES (?, ?, ?, ?, ?)
    `,
        [
            nom,
            prenom,
            email,
            mot_de_passe_hash,
            telephone
        ],
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
            return res.status(201).json({
                message: 'Utilisateur créé avec succès'
            });

        });

};


// Connexion d'un utilisateur
const loginUtilisateur = async (req, res) => {

    const email =
        req.body.email?.trim().toLowerCase();

    const mot_de_passe =
        req.body.mot_de_passe;


    // Vérifier les champs obligatoires
    if (!email || !mot_de_passe) {

        return res.status(400).json({
            error: 'Email et mot de passe obligatoires'
        });

    }


    // Chercher l'utilisateur avec son email
    dt.query(`
        SELECT * FROM utilisateurs
        WHERE email = ?
    `,
        [email],

        async (err, result) => {

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


            const utilisateur =
                result[0];


            // Comparer le mot de passe
            const motDePasseCorrect =
                await bcrypt.compare(
                    mot_de_passe,
                    utilisateur.mot_de_passe
                );


            if (!motDePasseCorrect) {

                return res.status(401).json({
                    error: 'Email ou mot de passe incorrect'
                });

            }


            // Créer le JWT
            const token = jwt.sign(

                {
                    id_utilisateur:
                        utilisateur.id_utilisateur,

                    role:
                        utilisateur.role
                },

                process.env.JWT_SECRET,

                {
                    expiresIn: '1h'
                }

            );


            // Connexion réussie
            return res.status(200).json({

                message:
                    'Connexion réussie',

                token,

                utilisateur: {

                    id_utilisateur:
                        utilisateur.id_utilisateur,

                    nom:
                        utilisateur.nom,

                    prenom:
                        utilisateur.prenom,

                    email:
                        utilisateur.email,

                    role:
                        utilisateur.role

                }

            });

        });

};


module.exports = {
    registerUtilisateur,
    loginUtilisateur
};