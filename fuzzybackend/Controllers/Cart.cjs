const User = require('../models/User.cjs');

const getCart = async (req,res) => {
    const {email} = req.body;
    try{
        const user = await User.findOne({ email }); 
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        await user.populate('cart.productId');
        res.status(200).json({success:false,cart:user.cart});
    } catch(err){
        return res.status(500).json({
            success: false,
            message: "Failed to get items"
        });
    }
}

const addToCart = async (req, res) => {
    const { email, prodID } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const currCart = user.cart;
        const idx = currCart.findIndex(item => item.productId.equals(prodID));

        if (idx === -1) {
            const newItem = { productId: prodID, quantity: 1 };
            user.cart.push(newItem);
        } else {
            currCart[idx].quantity += 1;
        }

        await user.save();
        await user.populate('cart.productId');
        return res.status(200).json({
            success: true,
            message: "Item added successfully",
            cart: user.cart
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Failed to add item"
        });
    }
};

module.exports = {addToCart,getCart};