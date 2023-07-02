// imports
const Sauce = require('../models/sauce')
const fs = require('fs');

// get all sauces
exports.getSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
}

// get one sauce
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

// create a sauce 
exports.createSauce = (req, res, next) => {
    const sauceObj = JSON.parse(req.body.sauce);
    // create new instance of sauce
    const sauce = new Sauce({
        ...sauceObj,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    });
    // save the new sauce 
    sauce.save()
        .then(() => {
            res.status(201).json({ message: "Sauce créée avec succès" })
        })
        .catch(error => res.status(400).json({ error }));
};

// modifify a sauce
exports.modifySauce = (req, res, next) => {
    // create object to mdofify
    const sauceObj = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    } : { ...req.body };
    // update the sauce from paramater id
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            Sauce.updateOne({ _id: req.params.id }, { ...sauceObj, _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Objet modifié!' }))
                .catch(error => res.status(401).json({ error }));
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

// delete a sauce 
exports.deleteSauce = (req, res, next) => {
    // search file name
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            // delete from mangodb and the image folder
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => { res.status(200).json({ message: 'Objet supprimé !' }) })
                    .catch(error => res.status(401).json({ error }));
            });
        })
        .catch(error => {
            res.status(500).json({ error })
        })
};

// like or dislike a sauce 
exports.likeOrDislike = (req, res, next) => {
    // retrieve sauce id
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            // if user likes the sauce
            if (req.body.like === 1) {
                Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: +1 }, $push: { usersLiked: req.body.userId } },)
                    .then(() => res.status(200).json({ message: 'Like ajouté !' }))
                    .catch(error => res.status(400).json({ error }))
                // if user dislikes the sauce
            } else if (req.body.like === -1) {
                Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: +1 }, $push: { usersDisliked: req.body.userId } })
                    .then(() => res.status(200).json({ message: 'Dislike ajouté !' }))
                    .catch(error => res.status(400).json({ error }))
                // if user wants to cancel like or dislike
            } else if (req.body.like === 0) {
                // cancel  like
                if (sauce.usersLiked.includes(req.body.userId)) {
                    Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } })
                        .then(() => res.status(200).json({ message: 'Like supprimé' }))
                        .catch(error => res.status(400).json({ error }))
                    // cancel dislike
                } else if (sauce.usersDisliked.includes(req.body.userId)) {
                    Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId } })
                        .then((sauce) => res.status(200).json({ message: 'Dislike supprimé' }))
                        .catch(error => res.status(400).json({ error }))
                }
            }
        })
        .catch(error => res.status(400).json({ error }));
}