var express = require('express');

var app = express();
const productRoutes = require('./api/v1.0/product');

app.use('/products', productRoutes);

module.exports = app;