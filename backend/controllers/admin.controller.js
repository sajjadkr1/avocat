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
    
module.exports = {
    getAllAvocats,
    deleteAvocat,
    updateAvocat,
    addAvocat
};
