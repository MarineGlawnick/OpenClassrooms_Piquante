const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')
sauceCtrl = require('../controllers/sauce')

//routes 
router.put('/:id', auth, multer, sauceCtrl.modifySauce)
router.post('/', auth, multer, sauceCtrl.createSauce)
router.get('/:id', auth, sauceCtrl.getOneSauce)
router.get('/', auth, sauceCtrl.getSauces)

module.exports = router;