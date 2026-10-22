const dt = require('../config/db');
const getAllAvocats = (req, res) => {
    dt.query(`
    SELECT
        id_avocat,
        nom,
        prenom,
        email,
        ville,
        portable
    FROM avocats
`, (err, result) => {
    if (err) {
        console.log(err);

        return res.status(500).json({
            error: 'Erreur lors de la récupération des avocats'
            
        });
    }
    res.status(200).json(result);


});
}
const deleteAvocat = (req, res) => {
    const id = req.params.id;
    dt.query(
    `
    DELETE FROM avocats
    WHERE id_avocat = ?
    `,
    [id],
    (err, result) => {
if (err) {
    console.log(err);

    return res.status(500).json({
        error: 'Erreur lors de la suppression de l’avocat'
    });
    
}
if (result.affectedRows === 0) {
    return res.status(404).json({
        error: 'Avocat non trouvé'
    });
   
}
 return res.status(200).json({
         message: 'Avocat supprimé avec succès'
    });
    }
);
};
const updateAvocat = (req, res) => {
    const id = req.params.id;
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const email = req.body.email;
    const ville = req.body.ville;
    const portable = req.body.portable;
    dt.query(
         `
    UPDATE avocats
    SET
        nom = ?,
        prenom = ?,
        email = ?,
        ville = ?,
        portable = ?
    WHERE id_avocat = ?
    `,
    [nom, prenom, email, ville, portable, id],
    (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                error: 'Erreur lors de la modification de l’avocat'
            });
        }
            if (result.affectedRows === 0) {
            return res.status(404).json({
                 error: 'Avocat non trouvé'
            });
        }
        return res.status(200).json({
            message: 'Avocat modifié avec succès'
        });
        }
        
    )
};
    const addAvocat = (req, res) => {
const nom = req.body.nom;
const prenom = req.body.prenom;
const email = req.body.email;
const ville = req.body.ville;
const portable = req.body.portable;
dt.query(
    `
    INSERT INTO avocats
    (nom, prenom, email, ville, portable)
    VALUES (?, ?, ?, ?, ?)
    `,
    [nom, prenom, email, ville, portable],
    (err, result) => {
if (err) {
    console.log(err);

    return res.status(500).json({
        error: 'Erreur lors de l’ajout de l’avocat'
    });
}
    return res.status(201).json({
    message: 'Avocat ajouté avec succès',
    id_avocat: result.insertId
});
}
);
    };
    const getAllRendezVous = (req, res) => {

         dt.query(
        `
        SELECT
            rendez_vous.id_rendez_vous,
            rendez_vous.id_utilisateur,
            utilisateurs.nom AS nom_utilisateur,
            utilisateurs.prenom AS prenom_utilisateur,
            rendez_vous.id_avocat,
            avocats.nom AS nom_avocat,
            avocats.prenom AS prenom_avocat,
            rendez_vous.date_rendez_vous,
            rendez_vous.heure_rendez_vous,
            rendez_vous.statut,
            rendez_vous.motif,
            rendez_vous.date_creation
        FROM rendez_vous
        JOIN utilisateurs
         ON rendez_vous.id_utilisateur = utilisateurs.id_utilisateur
        JOIN avocats
        ON rendez_vous.id_avocat = avocats.id_avocat
       
        ORDER BY rendez_vous.date_rendez_vous DESC
        `,
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    error: 'Erreur lors de la récupération des rendez-vous'
                });
            }
                return res.status(200).json(result);
            }
         );
    };
    const updateStatutRendezVous = (req, res) => {
        const id = req.params.id;
        const statut = req.body.statut;
        const statusAutorises = [
            'en_attente',
            'confirme',
            'annule'
        ];
        if (!statusAutorises.includes(statut)) {
            return res.status(400).json({
                error: 'Statut invalide'
            });
        }
        dt.query(
            `
            UPDATE rendez_vous
            Set statut = ?
            where id_rendez_vous = ?
            `
            ,
            [statut, id],
            (err, result) => {
                if (err) {
                    console.log(err);
                
                return res.status(500).json({
                    error: 'Erreur lors de la modification du statut'
                });
            }
                if (result.affectedRows === 0) {
                    return res.status(404).json({
                        error: 'Rendez-vous non trouvé'
                    });
                }
                    return res.status(200).json({
                        message: 'Statut du rendez-vous modifié avec succès'
                    });
                }
            );
        };
            
        
        
    

    
module.exports = {
    getAllAvocats,
    deleteAvocat,
    updateAvocat,
    addAvocat,
    getAllRendezVous,
    updateStatutRendezVous
};
