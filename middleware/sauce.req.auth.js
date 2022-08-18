/* importation du package jsonwebtoken*/
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        /* récupération du token*/
        const token = req.headers.authorization.split(' ')[1];

        /*extraction de l'userId*/
        const decodedToken = jwt.verify(token, process.env.TOKEN || '' );
        const userId = decodedToken.userId;
        
        /* MAJ de l'attribut userId*/
        req.auth = {
            userId: userId
        };
    next();
    }
    catch(error) {
        res.status(401).json({ error });
    }
}