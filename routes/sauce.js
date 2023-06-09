// import express
const express = require('express');
// create route
const router = express.Router();

// import middlewares
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

// import controller
sauceCtrl = require('../controllers/sauce')

// routes 
router.post('/:id/like', auth, sauceCtrl.likeOrDislike)
router.delete('/:id', auth, multer, sauceCtrl.deleteSauce)
router.put('/:id', auth, multer, sauceCtrl.modifySauce)
router.post('/', auth, multer, sauceCtrl.createSauce)
router.get('/:id', auth, sauceCtrl.getOneSauce)
router.get('/', auth, sauceCtrl.getSauces)

module.exports = router;