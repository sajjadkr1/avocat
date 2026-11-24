const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Définir le dossier de stockage
const uploadDir = path.join(__dirname, '../uploads');

// Créer le dossier s'il n'existe pas
if(!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true});
}
// Définir le mode de stockage
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
    cb(null, uploadDir);
   },
   filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const nomFichier =  `avocat-${Date.now()}${extension}`;
    cb(null, nomFichier);
   }
});
// Vérifier le type de fichier
const fileFilter = (req, file, cb) => {
    const typesAutorises = [
        'image/jpeg',
        'image/png',
        'image/webp'
    ];
    if (typesAutorises.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Format d’image non autorisé'));
    }

};
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});
module.exports = upload;