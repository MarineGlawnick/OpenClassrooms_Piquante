const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')
sauceCtrl = require('../controllers/sauce')

//routes 
router.post('/:id/like', auth, sauceCtrl.likeOrDislike)
router.delete('/:id', auth, multer, sauceCtrl.deleteSauce)
router.put('/:id', auth, multer, sauceCtrl.modifySauce)
router.post('/', auth, multer, sauceCtrl.createSauce)
router.get('/:id', auth, sauceCtrl.getOneSauce)
router.get('/', auth, sauceCtrl.getSauces)

module.exports = router;