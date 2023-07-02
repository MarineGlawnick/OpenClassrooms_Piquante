// import express
const express = require('express');
// create route
const router = express.Router();
// import controller
const userCtrl = require('../controllers/user');
// import middleware
const limiter = require("../middleware/rate-limiter")

// routes
router.post('/signup', limiter, userCtrl.signup);
router.post('/login', limiter, userCtrl.login);

module.exports = router;