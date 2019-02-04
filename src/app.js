'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();


//connecta ao banco de dados
mongoose.connect('mongodb://sharingan:sha123@ds033750.mlab.com:33750/str');

//carrega as Rotas
const index = require('./routes/index');
const product = require('./routes/router-product')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
	extended: false 
}));

app.use('/', index);
app.use('/products', product);

module.exports = app;