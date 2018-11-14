var express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Order = require('../../../model/order');
const Product = require('../../../model/product');

router.get("/", (req, res, next) => {
    Order.find()
    .select(`_id product quantity`)
    .exec()
    .then(docs => {
       let response = {
           count: docs.length,
           orders: docs.map(doc => {
              return {
                _id: doc._id,
                product: doc.product,
                quantity: doc.quantity,
                request: {
                    type: `GET`,
                    url: `http://localhost:3000/orders`
                }
              }
           })
       };
       res.status(200).json(response);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
})

router.post("/", (req, res, next) => {
    let order = new Order({
        _id: new mongoose.Types.ObjectId(),
        product: req.body.productId,
        quantity: req.body.quantity
    });
    order.save()
    .then(result => {
        console.log(result);
        let response = {
            order: result._id,
            product: result.product,
            quantity: result.quantity,
            request: {
                type: `POST`,
                url: `http://localhost:3000/orders`
            }
        }
        res.status(201).json(response);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
})

router.get("/:orderId", (req, res, next) => {
    res.status(200).json({
        message: "Order details",
        orderId: req.params.orderId
    });
})

router.delete("/:orderId", (req, res, next) => {
    res.status(200).json({
        message: "Order delete",
        orderId: req.params.orderId
    });
})

module.exports = router;