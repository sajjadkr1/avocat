const dt = require('../config/db');
// Créer un nouveau rendez-vous

const creerRendezVous = (req, res) => {

    // Récupérer l'id de l'utilisateur connecté
    const id_utilisateur = req.utilisateur.id_utilisateur;
    // Récupérer les informations du rendez-vous
    const id_avocat = req.body.id_avocat;
    const date_rendez_vous = req.body.date_rendez_vous;
    const heure_rendez_vous = req.body.heure_rendez_vous;
    const motif = req.body.motif;
    if (!id_avocat || !date_rendez_vous || !heure_rendez_vous) {
        return res.status(400).json({
            "error": "Les informations du rendez-vous sont incomplètes"
        });

    }
    dt.query(`
       INSERT INTO rendez_vous
       (id_utilisateur, id_avocat, date_rendez_vous, heure_rendez_vous, motif)
       VALUES(?, ?, ?, ?, ?) 
       `,
        [
            id_utilisateur,
            id_avocat,
            date_rendez_vous,
            heure_rendez_vous,
            motif,
        ],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    "error": "Erreur lors de la création du rendez-vous"

                });


            }


            return res.status(201).json({
                "message": "Rendez-vous créé avec succès",
                "id_rendez_vous": result.insertId
            });
        });
};
const getMesRendezVous = (req, res) => {
    const id_utilisateur = req.utilisateur.id_utilisateur;
    dt.query(`
  SELECT rendez_vous.id_rendez_vous,
       avocats.nom,
       avocats.prenom,
       avocats.email,
       avocats.portable,
       rendez_vous.date_rendez_vous,
       rendez_vous.heure_rendez_vous,
       rendez_vous.statut,
       rendez_vous.motif
FROM rendez_vous
JOIN avocats
ON rendez_vous.id_avocat = avocats.id_avocat
WHERE rendez_vous.id_utilisateur = ?;
            
            `,
            [
                id_utilisateur
            ],
            (err, result) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                         "error": "Erreur lors de la récupération des rendez-vous"
                         
                    });
                }
                return res.status(200).json(result);
            }
    );
}

module.exports = {
    creerRendezVous,
    getMesRendezVous
};