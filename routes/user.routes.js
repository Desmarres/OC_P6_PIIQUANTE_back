/* importation des frameworks, middleware, controllers et modules*/
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userCtrl = require('../controllers/user.controllers');
const { userReqControl } = require('../middleware/user.req.control');

/* routage des requêtes */
router.post('/signup', userReqControl, userCtrl.signup);
router.post('/login', userReqControl, userCtrl.login);

module.exports = router;