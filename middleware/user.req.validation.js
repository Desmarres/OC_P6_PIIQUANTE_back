/* importation des ressources*/
const { body } = require('express-validator');
const userModel = require('../models/users.models');

/* vérification de la conformité des éléments envoyés*/
exports.signup = [
    body('email')
    .exists({ checkFalsy: true})
    .withMessage(' Missing email address ! ')
    .isEmail()
    .withMessage(" Wrong format of email address ! ")
    .custom(value => {
        return userModel.find({
            email: value
        }).then(user => {
            if (user.length > 0) {
                return Promise.reject(' Email already used ');
            }
        });
    }),
    body('password')
    .exists({ checkFalsy: true})
    .withMessage(' The password is missing ! ')
    .isString()
    .withMessage(' Wrong format of password ! ')
    .isStrongPassword({
        minLength: 8,
        minNumbers: 1,
        minUppercase: 1,
        minLowercase: 1,
        minSymbols: 1
    })
    .withMessage('Password must be longer than 8 characters and contain at least one uppercase letter, one lowercase letter, one symbol and one number')
];

/* vérification de la conformité des éléments envoyés*/
exports.login = [
    body('email')
    .exists({ checkFalsy: true})
    .withMessage(' Missing email address ! ')
    .isEmail()
    .withMessage(" Wrong format of email address ! "),
    body('password')
    .exists({ checkFalsy: true})
    .withMessage(' The password is missing ! ')
    .isString()
    .withMessage(' Bad password ! ')
];
