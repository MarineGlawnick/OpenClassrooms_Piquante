// Import express
const express = require('express');
// Create route
const router = express.Router();
//Import controller
const userCtrl = require('../controllers/user');
//Import middleware
const limiter = require("../middleware/rate-limiter")

//routes
router.post('/signup', limiter, userCtrl.signup);
router.post('/login', limiter, userCtrl.login);

module.exports = router;