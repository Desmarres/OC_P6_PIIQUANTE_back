/* importation des ressources*/
const sauceModel = require('../models/sauces.models');
const fs = require('fs');

/* récupère l'ensemble des sauces de la BDD*/
exports.getAllSauce = (req, res, next) => {
    sauceModel.find()
        .then((sauces) => res.status(200).json(sauces))
        .catch( error => res.status(500).json({ error }));    
};

/* récupère une sauce de la BDD correspondant à l'Id reçu*/
exports.getOneSauce = (req, res, next) => {
    sauceModel.findOne( { _id: req.params.id } )
        .then( sauce => res.status(200).json(sauce))
        .catch( error => res.status(500).json({ error }));
    
};

/* ajoute une sauce à la BDD avec l'objet et l'image reçu*/
exports.createSauce = (req, res, next) => {
    /* mise en format JSON*/
    const sauceObject = JSON.parse(req.body.sauce);

    /* suppression des éléments non-fiable reçus*/
    delete sauceObject._id;
    delete sauceObject._userId;

    /* création du model sauce*/
    const sauce = new sauceModel({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${ req.protocol }://${ req.get('host') }/resources/images/${ req.file.filename }`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });

    /* enregistrement de la sauce dans la BDD*/
    sauce.save()
        .then(() => { res.status(201).json({ message : 'The sauce is created !'}) })
        .catch( error => { res.status(500).json({ error })})
};

/* modification d'une sauce dans la BDD avec l'objet et/ou l'image reçu*/
exports.modifySauce = (req, res, next) => {
    /* mise en format JSON si la requête arrive sous la forme 'form-data'*/
    const sauceObject = req.file ? {
        ...JSON.parse( req.body.sauce ),
        imageUrl: `${ req.protocol }://${ req.get('host') }/resources/images/${ req.file.filename }`
    } : { ...req.body };

    /* suppression de l'élément non-fiable reçu*/
    delete sauceObject._userId;

    /* récupération de l'élément dans la BDD*/
    sauceModel.findOne({ _id: req.params.id })
        .then((sauce) => {
            /* vérification si l'Id utilisateur est le même que dans la BDD*/
            if (sauce.userId != req.auth.userId) {
                res.status(403).json({ message : " 403: unauthorized request " });
            }
            else {
                if ( req.file && sauceObject.imageUrl != sauce.imageUrl) {
                    /* récupération de l'URL de l'image*/
                    const filename = sauce.imageUrl.split('/images/')[1];

                    /* suppression de l'image dans le dossier*/
                    fs.unlink(`resources/images/${filename}`, ( error ) => {
                        if (error) throw error;
                        console.log( ' Old image removed from folder ! ');
                    });
                }
                /* mise à jour du produit dans la BDD*/
                sauceModel.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: " Modification of the sauce successful ! " }))
                    .catch( error => res.status(500).json({ error }));
            }
        })
        .catch( error => res.status(500).json({ error }));
};

/* suppression d'une sauce dans la BDD */
exports.deleteSauce = (req, res, next) => {
    /* récupération de l'élément dans la BDD*/
    sauceModel.findOne({ _id: req.params.id })
        .then( sauce => {
            /* vérification si l'Id utilisateur est le même que dans la BDD*/
            if ( sauce.userId != req.auth.userId ) {
                res.status(403).json({ message : " 403: unauthorized request " });
            }
            else {
                /* récupération de l'URL de l'image*/
                const filename = sauce.imageUrl.split('/images/')[1];

                /* suppression de l'image dans le dossier*/
                fs.unlink(`resources/images/${filename}`, () => {
                    /* suprression de l'image dans la BDD*/
                    sauceModel.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message : ' The sauce has been removed ! ' }))
                        .catch( error => res.status(500).json({ error }));
                });
            }
        })
        .catch( error => res.status(500).json({ error }));
};

/* management des likes ou dislikes des sauces*/
exports.managementSauceLike = (req, res, next) => {
    /* récupération de l'élément dans la BDD*/
    sauceModel.findOne({ _id: req.params.id })
        .then( sauce => {
            /* recherche des utilisatuers dans les tableaux usersLiked et usersDislike*/
            const usersLikedIndex = sauce.usersLiked.findIndex(userId => userId === req.auth.userId);
            const usersDislikedIndex = sauce.usersDisliked.findIndex(userId => userId === req.auth.userId);

            let message = " not modified ! ";
            
            const like =req.body.like;

            if (like === 1 && usersLikedIndex === -1){
                if ( usersDislikedIndex !== -1 ){
                    /* dislikes : suppression de l'uilisateur et MAJ du nombres*/
                    sauce.usersDisliked.splice(usersDislikedIndex,1);
                    sauce.dislikes -= 1;
                }
                /* likes : ajout de l'utilisateur et MAJ du nombres*/
                sauce.usersLiked.push(req.auth.userId);
                sauce.likes += 1;
                
                message = " successful 'like' of this sauce ! ";
            }

            if (like === 0){
                if ( usersLikedIndex !== -1 ) {
                    /* dislikes : suppression de l'uilisateur et MAJ du nombres*/
                    sauce.usersLiked.splice(usersLikedIndex,1);
                    sauce.likes -= 1;
                }                
                if ( usersDislikedIndex !== -1 ){
                    /* dislikes : suppression de l'uilisateur et MAJ du nombres*/
                    sauce.usersDisliked.splice(usersDislikedIndex,1);
                    sauce.dislikes -= 1;
                }
                message = (usersLikedIndex === -1 && usersDislikedIndex === -1) ? message : " Cancellation of the 'like' or 'dislike' successful ! ";
            }

            if (like === -1 && usersDislikedIndex === -1){
                /* si l'utilisateur est présent dans le tableau usersLiked*/
                if ( usersLikedIndex !== -1 ){
                    /* likes : suppression de l'uilisateur et MAJ du nombres*/
                    sauce.usersLiked.splice(usersLikedIndex,1);
                    sauce.likes -= 1;
                }
                /* dislikes : ajout de l'utilisateur et MAJ du nombres*/
                sauce.usersDisliked.push(req.auth.userId);
                sauce.dislikes += 1;

                message = " successful 'dislike' of this sauce ! ";
            }
            
            /* mise à jour du produit dans la BDD*/
            sauceModel.updateOne({ _id: req.params.id}, { 
                $set : {
                    likes: sauce.likes,
                    dislikes: sauce.dislikes,
                    usersLiked: sauce.usersLiked,
                    usersDisliked: sauce.usersDisliked
                }})
                .then(() => res.status(200).json({ message: message }))
                .catch( error => res.status(500).json({ error }));
        })
        .catch( error => res.status(500).json({ error }));
};
