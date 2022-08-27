/* importation des ressources*/
const { body, param, header } = require('express-validator');
const sauceModel = require('../models/sauces.models');


/* vérification de la conformité de l'Id sauce */
exports.idSauce = [
    param('id')
    .isString()
    .withMessage(' Bad id ! ')
    .custom(value => {
        /* vérification que la sauce éxiste */
        return sauceModel.find({ _id: value })
        .catch( error => {return Promise.reject(' Unknown sauce ')});
    })    
];

/* vérification de la conformité des éléments de sauce*/
exports.sauce = (req, res, next) => {
    try{
        /* mise en format JSON si la requête arrive sous la forme 'form-data'*/
        const sauceObject = req.file ? {
            ...JSON.parse( req.body.sauce )
        } : { ...req.body };

        if (!sauceObject.name || 
            !sauceObject.manufacturer || 
            !sauceObject.description || 
            !sauceObject.mainPepper || 
            !sauceObject.heat || 
            !sauceObject.userId) 
            {
                throw ' Missing arguments ! ';
            }else {
                if ((typeof(sauceObject.name) !== 'string' ) || 
                    (typeof(sauceObject.manufacturer) !== 'string' ) || 
                    (typeof(sauceObject.description) !== 'string' ) || 
                    (typeof(sauceObject.mainPepper) !== 'string' ) || 
                    (typeof(sauceObject.heat) !== 'number' ) || 
                    (typeof(sauceObject.userId) !== 'string' )) {
                        throw ' Bad arguments';
                    }
        };
        
        next();
    }
    catch(error) {
        res.status(400).json({ message : error });
    }
};

/* vérification de la conformité des éléments envoyés*/
exports.managementSauceLike = [
    body('userId')
    .exists({ checkFalsy: true})
    .withMessage(' You are not identified ! ')
    .custom((value, { req }) => {
        /* vérification que l'Id envoyé est le même que l'utilisateur authentifié*/
        if (value != req.auth.userId){
            throw new Error(' You are not identified ! ');
        }
        return true;
    }),
    body('like')
    .exists({ checkNull: true})
    .withMessage(' An argument is missing ! ')
    .isInt({ min: -1, max: 1})
    .withMessage(' Incorrect argument ! ')

];
