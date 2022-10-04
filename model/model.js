const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    brand: {
        required: true,
        type: String
    },
    rating: {
        required: true,
        type: Number
    },
    categories: {
        required: true,
        type: Array
    },
    itemsInStock: {
        required: true,
        type: Number
    },
    receiptDate: {
        required: true,
        type: String
    },
    expirationDate: {
        required: true,
        type: String
    },
    featured: {
        required: true,
        type: Boolean
    },
    

})

module.exports = mongoose.model('Product', dataSchema) 