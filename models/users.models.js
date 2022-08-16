/* importation des frameworks et modules*/
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

/* définition du schéma utilisateur*/
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
})

module.exports = mongoose.model('user', userSchema);