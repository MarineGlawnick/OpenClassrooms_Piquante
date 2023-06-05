const mongoose = require('mongoose');
const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors")
require('dotenv').config({ path: process.cwd() + '/.env' });

const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce')

// Connect to the data base
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(cors());

app.use(bodyParser.json())

// Register routers
app.use('/api/auth', userRoutes)
app.use('/api/sauces', sauceRoutes)

module.exports = app;