const User = require('../models/User.cjs');
const mongoose = require('mongoose');
const getCart = async (req,res) => {
    const {email} = req.body;
    try{
        const user = await User.findOne({ email }); 
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        await user.populate('cart.productId');

        const filteredCart = user.cart.filter(item => item.productId);
        console.log("User's cart after population:", filteredCart);
        res.status(200).json({success:true,cart:filteredCart});
    } catch(err){
        return res.status(500).json({
            success: false,
            message: "Failed to get items"
        });
    }
}



const addToCart = async (req, res) => {
    const { email, productId } = req.body; // Ensure the request contains a valid productId
    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Filter out invalid cart items (optional cleanup step)
        user.cart = user.cart.filter(item => item.productId);

        // Check if the product is already in the cart
        const existingItemIndex = user.cart.findIndex(item => 
            item.productId && item.productId.toString() === productId
        );

        if (existingItemIndex === -1) {
            // Add new product to the cart
            const newCartItem = {
                productId: new mongoose.Types.ObjectId(productId), // Ensure it's an ObjectId
                quantity: 1,
            };
            user.cart.push(newCartItem);
        } else {
            // Increment quantity if the product already exists in the cart
            user.cart[existingItemIndex].quantity += 1;
        }

        // Save the updated user document
        await user.save();

        // Populate the product details for response
        await user.populate("cart.productId");

        return res.status(200).json({
            success: true,
            message: "Item added successfully",
            cart: user.cart,
        });
    } catch (err) {
        console.error("Error in addToCart:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to add item to cart",
        });
    }
};
const removeFromCart = async (req, res) => {
    const { email, productId } = req.body; // Ensure the request contains a valid productId
    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Filter the cart to exclude the item with the specified productId
        const initialCartLength = user.cart.length;
        user.cart = user.cart.filter(item => 
            item.productId && item.productId.toString() !== productId
        );

        // Check if the item was removed
        if (user.cart.length === initialCartLength) {
            return res.status(404).json({
                success: false,
                message: "Product not found in cart",
            });
        }

        // Save the updated user document
        await user.save();

        // Populate the product details for response
        await user.populate("cart.productId");

        return res.status(200).json({
            success: true,
            message: "Item removed successfully",
            cart: user.cart,
        });
    } catch (err) {
        console.error("Error in removeFromCart:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to remove item from cart",
        });
    }
};

module.exports = { addToCart, getCart, removeFromCart };


