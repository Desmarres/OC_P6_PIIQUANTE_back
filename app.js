/* importation des frameworks et modules*/
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const mongooseUser = require('./resources/security/mongoose.user');

/* connection à la base de donnée MongoDB*/
mongoose.connect('mongodb+srv://' + mongooseUser.id + ':' + mongooseUser.key + '@cluster0.wy5mq.mongodb.net/piiquante?retryWrites=true&w=majority',
{ useNewUrlParser: true,
  useUnifiedTopology: true })
.then(() => console.log(' Connection to MongoDB successful ! '))
.catch(() => console.log(' Connection to MongoDB failed ! '));

/* fichiers routes des requêtes*/ 
const userRoutes = require('./routes/user.routes');
const sauceRoutes = require('./routes/sauces.routes');

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