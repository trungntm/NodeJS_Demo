var express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../order/order');
const Product = require('../product/product');
const serverConfig = require('../../../config/serverConfig');
const productService = require('./product-service')

router.get('/', (req, res, next) => {
    Product.find()
        .select(`name price _id`)
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        price: doc.price,
                        request: {
                            type: 'GET',
                            url: `http://${serverConfig.serverHost}:${serverConfig.serverPort}/products/${doc._id}`
                        }
                    }
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err
            });
        });
})

router.post('/', (req, res, next) => {
  
    let product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    productService.saveProduct(product).then(result => {
        const response = {
            success: true,
            message: 'Insert product successfully!',
            productCreate : {
                name: product.name,
                price: product.price
            },
            request: {
                type: 'POST',
                url: `http://${serverConfig.serverHost}:${serverConfig.serverPort}/products/${product._id}`
            }
        }
        res.status(201).json(response);
    }).catch(err => {
        console.log("ERROR INSERT : " + err);
        res.status(500).json({
            error: err
        })
    });
})

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;

    productService.findProductByid(id)
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    message: "No valid entry found for provided ID"
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
})

router.patch("/:productId", (req, res, next) => {
    const id = req.params.productId;

    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Product.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
})

router.delete("/:productId", (req, res, next) => {
    const id = req.params.productId;
    productService.removeProduct(id)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
})

module.exports = router;