const User = require('../models/user')

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

// create new users
exports.signup = (req, res, next) => {
    //break the password into different part
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            // save user into the data base
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

//create the connexion for registered users
exports.login = (req, res, next) => {
    // look for a user into the data base
    User.findOne({ email: req.body.email })
        .then(user => {
            // error if a user is not found
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            //comparison of password the one in the form and the one registered into the data base
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    // create a token
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.SECRET_TOKEN,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};