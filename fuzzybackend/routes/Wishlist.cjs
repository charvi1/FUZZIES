const express = require('express');
const router = express.Router();
const wishlistController = require('../Controllers/Wishlist.cjs');
//const authMiddleware = require('../middleware/authMiddleware.cjs');
// Apply authentication middleware to all wishlist routes
//router.use(authMiddleware);

// Route to add a product to the wishlist
router.patch('/', wishlistController.addToWishlist);

// Route to remove a product from the wishlist
router.delete('/', wishlistController.removeFromWishlist);

// Route to get all wishlist items for the authenticated user
router.get('/', wishlistController.getWishlist);

module.exports = router;