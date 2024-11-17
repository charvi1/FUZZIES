const express = require('express');
const router = express.Router();
const {addToCart,getCart,removeFromCart} = require('../Controllers/Cart.cjs');

// Attach the addToCart function to the route
router.post('/',getCart);
router.post('/addToCart', addToCart);
router.delete('/removeFromCart',removeFromCart);

// Export the router
module.exports = router;
