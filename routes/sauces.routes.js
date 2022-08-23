/* importation des ressources*/
const express = require('express');
const router = express.Router();
const auth = require('../middleware/sauce.req.auth');
const multer = require('../middleware/multer.config');
const validation = require('../middleware/sauce.req.validation');
const validationResult = require('../middleware/validationResult');
const sauceCtrl = require('../controllers/sauces.controllers');

/* routage des requêtes */
router.get('/', validation.token, // vérification de la présence du champ Authorization dans le Header
                validationResult, // vérification de la présence d'erreur dans les entrées
                auth, // contrôle de la validité de l'authentification
                sauceCtrl.getAllSauce); // accès au controleur de la requête

router.get('/:id', validation.token, // vérification de la présence du champ Authorization dans le Header
                validationResult, // vérification de la présence d'erreur dans les entrées
                auth, // contrôle de la validité de l'authentification
                validation.idSauce, // vérification de la validité de l'id sauce de l'URL
                validationResult, // vérification de la présence d'erreur dans les entrées
                sauceCtrl.getOneSauce); // accès au controleur de la requête

router.post('/', validation.token, // vérification de la présence du champ Authorization dans le Header
                validationResult, // vérification de la présence d'erreur dans les entrées
                auth, // contrôle de la validité de l'authentification
                multer, // vérification de la conformité du fichier et stockage
                validation.sauce, // vérification des éléments descriptifs de la sauce
                validationResult, // vérification de la présence d'erreur dans les entrées
                sauceCtrl.createSauce); // accès au controleur de la requête

router.post('/:id/like', validation.token, // vérification de la présence du champ Authorization dans le Header
                validationResult, // vérification de la présence d'erreur dans les entrées
                auth, // contrôle de la validité de l'authentification
                validation.idSauce, // vérification de la validité de l'id sauce de l'URL
                validation.managementSauceLike, // vérification des éléments descriptifs de la sauce
                validationResult, // vérification de la présence d'erreur dans les entrées
                sauceCtrl.managementSauceLike); // accès au controleur de la requête

router.put('/:id', validation.token, // vérification de la présence du champ Authorization dans le Header
                validationResult, // vérification de la présence d'erreur dans les entrées
                auth, // contrôle de la validité de l'authentification
                validation.idSauce, // vérification de la validité de l'id sauce de l'URL
                multer, // vérification de la conformité du fichier et stockage
                validation.sauce, // vérification des éléments descriptifs de la sauce
                validationResult, // vérification de la présence d'erreur dans les entrées
                sauceCtrl.modifySauce); // accès au controleur de la requête

router.delete('/:id',  
                validation.token, // vérification de la présence du champ Authorization dans le Header
                validationResult, // vérification de la présence d'erreur dans les entrées
                auth, // contrôle de la validité de l'authentification
                validation.idSauce, // vérification de la validité de l'id sauce de l'URL
                validationResult, // vérification de la présence d'erreur dans les entrées
                sauceCtrl.deleteSauce); // accès au controleur de la requête

module.exports = router;