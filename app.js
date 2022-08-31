/* importation des ressources*/
require('dotenv').config();
const express = require('express');
const path = require('path');
const auth = require('./middleware/sauce.req.auth');
const { connect } = require('./middleware/db.config');
const cors = require('cors');

/* fichiers routes des requêtes*/ 
const userRoutes = require('./routes/users.routes');
const sauceRoutes = require('./routes/sauces.routes');

/*connexion BDD*/
connect();

/* appel de la méthode express*/
const app = express();

/* middleware d'extraction du corps JSON*/
app.use(express.json());

/* gestion des erreurs de CORS*/
const corsOptions = {
    origin: '*',
    allowedHeaders: 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization',
    methods:'GET, POST, PUT, DELETE'
}

app.use(cors(corsOptions));


/* routage des requêtes */
app.use('/api/auth/',userRoutes);
app.use('/api/sauces/', auth, sauceRoutes); // contrôle de l'authentification avant le routage
app.use('/resources/images', express.static(path.join(__dirname, 'resources/images')));

/* export de la constante d'application express*/
module.exports = app;