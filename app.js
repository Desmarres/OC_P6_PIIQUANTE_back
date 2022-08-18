/* importation des frameworks et modules*/
require('dotenv').config();
const express = require('express');
const path = require('path');
const { connect } = require('./middleware/db.config');

/* fichiers routes des requêtes*/ 
const userRoutes = require('./routes/user.routes');
const sauceRoutes = require('./routes/sauces.routes');

connect();

/* appel de la méthode express*/
const app = express();

/* middleware d'extraction du corps JSON*/
app.use(express.json());

/* gestion des erreurs de CORS*/
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

/* routage des requêtes */
app.use('/api/auth/',userRoutes);
app.use('/api/sauces/',sauceRoutes);
app.use('/resources/images', express.static(path.join(__dirname, 'resources/images')));

/* export de la constante d'application express*/
module.exports = app;