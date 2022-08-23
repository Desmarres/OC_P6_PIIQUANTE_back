/* importation des ressources*/
const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {    
    /* vérification des érreurs dans la requête*/
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}