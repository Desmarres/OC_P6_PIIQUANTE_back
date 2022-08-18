/* importation models, middleware et package*/
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userModel = require('../models/users.models');

/* enregistrement nouvel utilisateur*/
exports.signup = (req, res, next) => {
    /* vérification des érreurs dans la requête*/
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    /* hachage du password*/
    bcrypt.hash(req.body.password,10)
        .then(passwordHash => {
            /* crétaion de l'objet utilisateur*/
            const user = new userModel({
                email : req.body.email,
                password: passwordHash
            });
            /* enregistrement dans la BDD*/
            user.save()
                .then(() => res.status(201).json({ message: ' User create ! ' }))
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};

/* vérification de la connection*/
exports.login = (req, res, next) => {
    /* vérification des érreurs dans la requête*/
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    /* récupération de l'utilisateur dans la BDD*/
    userModel.findOne({ email: req.body.email })
        .then(user => {
            /* vérification si le password envoyé correspond à celui de la BDD*/
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: ' Incorrect login/password pair ! ' });
                    }
                    /* renvoi du token d'authentification pour 24h*/
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                                { userId: user._id },
                                process.env.TOKEN || 'token',
                                { expiresIn: process.env.TOKEN_EXPIRATION || '1h' }
                            )
                    });
                })
                .catch( error => res.status(500).json({ error }));
        })
        .catch( error => res.status(401).json({ message: ' Incorrect login/password pair ! ' }));
 };