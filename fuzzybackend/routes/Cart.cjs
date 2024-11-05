const express = require('express');
const router = express.Router();
const {addToCart,getCart} = require('../Controllers/Cart.cjs');

// Attach the addToCart function to the route
router.get('/',getCart);
router.post('/addToCart', addToCart);

// Export the router
module.exports = router;
