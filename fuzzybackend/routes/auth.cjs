const express = require('express');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User.cjs'); // Update based on your actual path
const router = express.Router();

// User Signup
router.post(
    '/signup',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            // Check if user already exists
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Create a new user (without hashing password)
            user = new User({
                name,
                email,
                password // Store password as plain text (not recommended for production)
            });

            await user.save();

            // Create JWT token
            const payload = { user: { id: user.id ,uuid:user.uuid,isAdmin: user.isAdmin } };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.status(201).json({ token,uuid:user.uuid , isAdmin: user.isAdmin});
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ message: 'Server error' });
        }
    }
);

// User Login
router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            // Check if user exists
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials (email not found)' });
            }

            // Log for debugging
            console.log('Submitted Password:', password);
            console.log('Stored Password in DB:', user.password);

            // Compare passwords directly (without hashing)
            //const isMatch = password === user.password;
            const isMatch = password.trim() === user.password.trim();
            // Debugging check
            console.log('Password Match:', isMatch);

            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials (password mismatch)' });
            }

            // Create JWT token
            const payload = { user: { id: user.id ,uuid:user.uuid},isAdmin: user.isAdmin  };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.json({ token,uuid:user.uuid,isAdmin: user.isAdmin  });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ message: 'Server error' });
        }
    }
);

// Get User Details (Protected Route)
router.get('/me', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});
// Update User Phone Number
router.patch('/me', verifyToken, async (req, res) => {
    const { phoneNumber } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update phone number
        user.phoneNumber = phoneNumber;
        await user.save();

        res.json({ message: 'Phone number updated successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});


// Middleware to verify token
function verifyToken(req, res, next) {
    const token =  req.headers.authorization?.split(' ')[1]; 
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
}

module.exports = router;
