/* importation des ressources*/
const multer = require('multer');

/* tableau des correspondances entre les MIME_TYPES et extensions*/
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp'
};

/* téléchargement de l'image*/
const storage = multer.diskStorage({
  /* paramètrage du chemin d'accès */
  destination: (req, file, callback) => {
    callback(null, 'resources/images');
  },
  /* initialisation du nom du fichier*/
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

/* mise en place d'un filtre*/
const fileFilter = (req, file, callback) => {
  if (( MIME_TYPES[file.mimetype] === "jpg") ||
      ( MIME_TYPES[file.mimetype] === "png") || 
      ( MIME_TYPES[file.mimetype] === "webp")) {
    return callback(null, true);
  }
  callback(new Error( ' Only image jpg,jpeg,png,webp'));
};

module.exports = multer({storage: storage, fileFilter: fileFilter}).single('image');