var express = require('express');

var app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const productRoutes = require('./api/v1.0/product');
const orderRoutes = require('./api/v1.0/order');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    req.header(`Access-Control-Allow-Origin`, `*`);
    req.header(`Access-Control-Allow-Headers`, `Origin`, `X-Requested-With`, `Content-Type`, `Accept`, `Authorization`);
    if (req.method === 'OPTIONS') {
        req.header(`Access-Control-Allow-Methods`, `PUT, POST, PATCH, DELETE, GET`);
        return req.status(200).json({});
    }
})

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
    const err = new Error(`Not found`);
    err.status = 404;
    next(err);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;