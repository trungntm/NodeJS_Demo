// const mongoose = require('mongoose')
// const order = require('../../api/v1.0/order/order')
// const product = require('../../api/v1.0/product/product')
// const user = require('../../api/v1.0/user/user')

// const dbConfig = require('../dbConfig');
// // const uri = 'mongodb://trungntm:250303022602asd@ds111258.mlab.com:11258/mongo_node_demo';
// const uri = `mongodb://${dbConfig.dbHost}/${dbConfig.dbName}`;

// describe('Test app.js', () => {
//     beforeAll(() => {
//         if(mongoose.connection.readyState === 0) {
//             mongoose.connect(uri, { useNewUrlParser: true })
//             .then(() => {
//                 console.log("connect db success ...");
//             })
//             .catch(err => {
//                 console.log(err);
//             })
//         }
//     })
    
//     afterAll(() => {
//         return mongoose.disconnect();
//     })
// }) 