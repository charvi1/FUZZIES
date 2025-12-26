const express = require('express');
const router = express.Router();
const Order = require('../models/order.cjs');
const User = require('../models/User.cjs');

router.post('/orders', async (req, res) => {
    const { email, shippingAddress, totalAmount } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        const newOrder = new Order({
            userId: user._id,
            items: user.cart,
            totalAmount,
            shippingAddress,
        });

        await newOrder.save();

        // Clear the cart after order placement
        user.cart = [];
        await user.save();

        res.status(201).json({ success: true, order: newOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error placing order' });
    }
});

// Get logged-in user's orders
router.get('/orders/my-orders', async (req, res) => {
    const { email } = req.query;
    if (!email) return res.status(400).json({ success: false, message: 'Email required' });

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        const orders = await Order.find({ userId: user._id }).sort({ date: -1 });
        res.json({ success: true, orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error fetching orders' });
    }
});

// Get all orders (Admin only - ideally would need admin middleware)
router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find().populate('userId', 'name email').sort({ date: -1 });
        res.json({ success: true, orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// Update order status (Admin only)
router.put('/orders/:id/status', async (req, res) => {
    const { status } = req.body;
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

        order.paymentStatus = status; // Assuming paymentStatus tracks delivery status too, or add a new field
        await order.save();
        res.json({ success: true, order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

module.exports = router;
