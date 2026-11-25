
const BaseModel = require('./base.model');

class UtilisateurModel extends BaseModel {

    constructor() {
        super();
    }

    // Ajouter un nouvel utilisateur
    creerUtilisateur(nom, prenom, email, mot_de_passe, telephone, callback) {

        this.db.query(
            `INSERT INTO utilisateurs
            (nom, prenom, email, mot_de_passe, telephone)
            VALUES (?, ?, ?, ?, ?)`,
            [nom, prenom, email, mot_de_passe, telephone],
            callback
        );

    }

    // Chercher un utilisateur par email
    trouverUtilisateurParEmail(email, callback) {

        this.db.query(
            `SELECT * FROM utilisateurs
            WHERE email = ?`,
            [email],
            callback
        );

    }
    trouverUtilisateurParId(id_utilisateur, callback) {
        this.db.query(
             `SELECT
            id_utilisateur,
            nom,
            prenom,
            email,
            telephone,
            role,
            date_creation
         FROM utilisateurs
         WHERE id_utilisateur = ?`,
        [id_utilisateur],
        callback
        );
    }
    // Modifier les informations d'un utilisateur
    modifierUtilisateur(id_utilisateur, nom, prenom, email, telephone, callback) {
        
        this.db.query(

        `UPDATE utilisateurs
         SET nom = ?, prenom = ?, email = ?, telephone = ?
         WHERE id_utilisateur = ?`,
         
        [nom, prenom, email, telephone, id_utilisateur],
        callback
    );
    }

}

module.exports = new UtilisateurModel();
