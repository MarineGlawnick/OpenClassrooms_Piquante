// imports
const mongoose = require('mongoose');
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors")

// creating dot env
require('dotenv').config({ path: process.cwd() + '/.env' });

// import routes
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce')

// connect to the data base
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(cors());
app.use(bodyParser.json())

// register routes
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/api/auth', userRoutes)
app.use('/api/sauces', sauceRoutes)

module.exports = app;