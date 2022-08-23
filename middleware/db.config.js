/* importation des ressources*/
const mongoose = require('mongoose');

/* initialisation des constantes de connexions*/
const userName = process.env.DB_USERNAME || '';
const password = process.env.DB_PASSWORD || '';
const serverName = process.env.DB_SERVER_NAME || '';
const database = process.env.DATABASE || '';

const uri=`mongodb+srv://${userName}:${password}@${serverName}/${database}?retryWrites=true&w=majority`;

/* connection à la base de donnée MongoDB*/
const connect = () => {
    mongoose.connect(uri,
    { useNewUrlParser: true,
      useUnifiedTopology: true })
    .then(() => console.log(' Connection to MongoDB successful ! '))
    .catch(() => console.log(' Connection to MongoDB failed ! '));
};

module.exports = { connect };
    