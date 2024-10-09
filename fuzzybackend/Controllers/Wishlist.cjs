const Wishlist = require('../models/Wishlist.cjs'); // Adjust path as needed

// Add to Wishlist
exports.addToWishlist = async (req, res) => {
    try {
        const { uuid, productId, name, description, price, category, rating, images } = req.body;

        if (!uuid  || !name || !description || !price || !category || !rating) {
            return res.status(400).json({ message: 'All product details and UUID are required' });
        }

        let wishlist = await Wishlist.findOne({ uuid });
        if (!wishlist) {
            wishlist = new Wishlist({ uuid, items: [] });
        }

        const itemExists = wishlist.items.find(item => item.productId === productId);
        if (itemExists) {
            return res.status(400).json({ message: 'Item already in wishlist' });
        }

        wishlist.items.push({ productId, name, description, price, category, rating, images });
        await wishlist.save();

        res.status(201).json(wishlist); // Success
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Remove from Wishlist
exports.removeFromWishlist = async (req, res) => {
    try {
        const { uuid, productId } = req.body;

        if (!uuid || !productId) {
            return res.status(400).json({ message: 'UUID and productId are required' });
        }

        const wishlist = await Wishlist.findOne({ uuid });
        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        const itemIndex = wishlist.items.findIndex(item => item.productId === productId);
        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in wishlist' });
        }

        wishlist.items.splice(itemIndex, 1);
        await wishlist.save();

        res.json({ message: 'Item removed from wishlist', wishlist });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get Wishlist
exports.getWishlist = async (req, res) => {
    try {
        const { uuid } = req.query;

        if (!uuid) {
            return res.status(400).json({ message: 'UUID is required' });
        }

        const wishlist = await Wishlist.findOne({ uuid });
        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        res.json(wishlist); // Success
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
