const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

sauceCtrl = require('../controllers/sauce')

router.get('/', auth, sauceCtrl.getSauces)
router.get('/:id', auth, sauceCtrl.getOneSauce)

module.exports = router;