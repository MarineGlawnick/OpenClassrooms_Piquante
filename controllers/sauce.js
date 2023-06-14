const Sauce = require('../models/sauce')

exports.getSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
}

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

exports.createSauce = (req, res, next) => {
    const sauceObj = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
        ...sauceObj,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    });
    sauce.save()
        .then(() => {
            res.status(201).json({ message: "Sauce créée avec succès" })
        })
        .catch(error => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
    const sauceObj = req.file ? {
        //if an image already exists
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    } : { ...req.body };

    Sauce.updateOne({ _id: req.params.id}, { ...sauceObj, _id: req.params.id})
    .then(() => res.status(200).json({message : 'Objet modifié!'}))
    .catch(error => res.status(401).json({ error }));
};