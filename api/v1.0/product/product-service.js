const Product = require('../product/product');
const mongoose = require('mongoose');

const findProductByid =  (id) => {
    return  Product.findById(id)
                    .exec()
}

const saveProduct = (product) => {
    return product.save()
}

const removeProduct = (id) => {
    return Product.remove({_id: id})
                    .exec()
}
module.exports = { findProductByid, saveProduct, removeProduct }