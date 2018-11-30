var express = require('express');

var app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/v1.0/product');
const orderRoutes = require('./api/v1.0/order');
const userRoutes = require('./api/v1.0/user');

const dbConfig = require('./config/dbConfig');
// const uri = 'mongodb://trungntm:250303022602asd@ds111258.mlab.com:11258/mongo_node_demo';
const uri = `mongodb://${dbConfig.dbHost}/${dbConfig.dbName}`;
// const mongoClient = require('mongodb').MongoClient;
if(mongoose.connection.readyState == 0) {
    mongoose.connect(uri, { useNewUrlParser: true })
    .then(() => {
        console.log("FIRST : connect db success ...");
    })
    .catch(err => {
        console.log(err);
    })
}


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/** TODO : Define routes */
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);

//TODO : Handling CORS, but it is not work
// app.use((req, res, next) => {
//     req.header(`Access-Control-Allow-Origin`, `*`);
//     req.header(`Access-Control-Allow-Headers`, `Origin`, `X-Requested-With`, `Content-Type`, `Accept`, `Authorization`);
    
//     if (req.method === 'OPTIONS') {
//         req.header(`Access-Control-Allow-Methods`, `PUT, POST, PATCH, DELETE, GET`);
//         return req.status(200).json({});
//     }
// })

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