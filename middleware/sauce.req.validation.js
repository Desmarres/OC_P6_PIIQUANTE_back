/* importation des ressources*/
const { body, param } = require('express-validator');
const fs = require('fs');
const sauceModel = require('../models/sauces.models');


/* vérification de la conformité de l'Id sauce */
idSauce = [
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
sauce = (req, res, next) => {
    try{
        let sauceObject = {};
        if (req.file){
            if (req.body.sauce){
                /* mise en format JSON si la requête arrive sous la forme 'form-data'*/
                sauceObject = {...JSON.parse( req.body.sauce )};
            }
            else {
                /* suppression de l'image dans le dossier*/
                fs.unlink(`resources/images/${req.file.filename}`, ( error ) => {
                    if (error) throw error;
                });           
                throw ' Missing arguments ! ';
            }

        }
        else if (req.body) {
            sauceObject = { ...req.body};
        }
        else {
            throw ' Missing arguments ! ';
        }

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
managementSauceLike = [
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


module.exports = { idSauce, sauce, managementSauceLike };