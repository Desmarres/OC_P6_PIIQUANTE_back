/* importation middleware*/
const multer = require('multer');

/* tableau des correspondances entre les MIME_TYPES et extensions*/
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

/* création du chemin d'accès et modification du nom du fichier*/
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'resources/images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');