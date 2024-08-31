const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: String, // Store the category name directly
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [{
        type: String
    }]
});

module.exports = mongoose.model('Product', productsSchema);
