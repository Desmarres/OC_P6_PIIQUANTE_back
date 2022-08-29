/* importation des ressources*/
const express = require('express');
const router = express.Router();
const auth = require('../middleware/sauce.req.auth');
const multer = require('../middleware/multer.config');
const validation = require('../middleware/sauce.req.validation');
const validationResult = require('../middleware/validationResult');
const sauceCtrl = require('../controllers/sauces.controllers');

/* routage des requêtes */
router.get('/',auth, // vérification de l'autentification
                sauceCtrl.getAllSauce); // accès au controleur de la requête

router.post('/',auth, // vérification de l'autentification
                multer, // vérification de la conformité du fichier et stockage
                validation.sauce, // vérification des éléments descriptifs de la sauce
                validationResult, // vérification de la présence d'erreur dans les entrées
                sauceCtrl.createSauce); // accès au controleur de la requête

router.get('/:id',auth, // vérification de l'autentification
                validation.idSauce, // vérification de la validité de l'id sauce de l'URL
                validationResult, // vérification de la présence d'erreur dans les entrées
                sauceCtrl.getOneSauce); // accès au controleur de la requête

router.put('/:id',auth, // vérification de l'autentification
                validation.idSauce, // vérification de la validité de l'id sauce de l'URL
                multer, // vérification de la conformité du fichier et stockage
                validation.sauce, // vérification des éléments descriptifs de la sauce
                validationResult, // vérification de la présence d'erreur dans les entrées
                sauceCtrl.modifySauce); // accès au controleur de la requête

router.delete('/:id',auth, // vérification de l'autentification
                validation.idSauce, // vérification de la validité de l'id sauce de l'URL
                validationResult, // vérification de la présence d'erreur dans les entrées
                sauceCtrl.deleteSauce); // accès au controleur de la requête

router.post('/:id/like',auth, // vérification de l'autentification
                validation.idSauce, // vérification de la validité de l'id sauce de l'URL
                validation.managementSauceLike, // vérification des éléments descriptifs de la sauce
                validationResult, // vérification de la présence d'erreur dans les entrées
                sauceCtrl.managementSauceLike); // accès au controleur de la requête

module.exports = router;