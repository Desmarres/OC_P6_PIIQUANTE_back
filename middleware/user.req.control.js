/* importation de module*/
const { body } = require('express-validator');

/* vérification de la conformité des éléments envoyés*/
userReqControl = [
    body('email')
    .exists({ checkFalsy: true})
    .withMessage(' There is no email address provided ! ')
    .isEmail()
    .withMessage(" Wrong format of email address ! "),
    body('password')
    .exists({ checkFalsy: true})
    .withMessage(' There is no password entered ! ')
];

module.exports = { userReqControl };