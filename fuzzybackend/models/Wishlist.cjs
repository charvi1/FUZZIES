const mongoose = require('mongoose');

const WishlistItemSchema = new mongoose.Schema({
    // productId: { type: String, required: true },  // productId is now a string
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    rating: { type: Number, required: true },
    images: [{ type: String }],  // Assuming you are storing image URLs
});

const WishlistSchema = new mongoose.Schema({
    uuid: { type: String, required: true },  // Unique user identifier
    items: [WishlistItemSchema],  // Array of WishlistItem
});

module.exports = mongoose.model('Wishlist', WishlistSchema);
