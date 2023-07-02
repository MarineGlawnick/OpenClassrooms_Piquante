// imports 
const jwt = require('jsonwebtoken');

// compare userId with the token
module.exports = (req, res, next) => {
    try {
        // get the token and compare
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
        const userId = decodedToken.userId;

        // if id is not correct
        if (req.body.userId && req.body.userId != userId) {
            throw "User ID non valable"
            // if id is correct    
        } else {
            next();
        }
        // catch an error if the request is not authenticated
    } catch (error) {
        res.status(401).json({ error: error | "Requète non authentifiée!" });
    }
};