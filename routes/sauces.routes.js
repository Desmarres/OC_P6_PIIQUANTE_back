/* importation des frameworks, middleware, controllers et modules*/
const express = require('express');
const router = express.Router();
const auth = require('../middleware/sauce.req.auth');
const multer = require('../middleware/multer.config');
const sauceCtrl = require('../controllers/sauces.controllers');

/* routage des requêtes */
router.get('/', auth, sauceCtrl.getAllSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.post('/:id/like', auth, sauceCtrl.managementSauceLike);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);

module.exports = router;