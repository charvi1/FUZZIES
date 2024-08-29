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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [{
        type: String // Note: Should be 'images' instead of 'image' to match your array.
    }]
});

module.exports = mongoose.model('Product', productsSchema);
