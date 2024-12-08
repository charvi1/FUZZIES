const express = require('express');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User.cjs'); 
const router = express.Router();
const upload = require('../multerConfig.cjs');

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
// Update User Profile (multiple fields)
router.patch('/me', verifyToken, async (req, res) => {
    const { name, phoneNumber, gender, dob, location, alternatePhone, hintName } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update fields if they are provided
        if (name) user.name = name;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (gender) user.gender = gender;
        if (dob) user.dob = dob;
        if (location) user.location = location;
        if (alternatePhone) user.alternatePhone = alternatePhone;

        await user.save();

        res.json({ message: 'Profile updated successfully', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});


router.post('/setPhoto' , upload.single('image'), async function setProfilePhoto(req,res) {
    try{
        const {email} = req.body;
        const file = req.file;

        if (!email) {
            return res.status(400).json({ success: false, message: 'incorrect email' });
        }
        if (!file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        const user = await User.findOne({ email });

        const imageUrl = file.path;
        user.URL = imageUrl

        await user.save();

        return res.status(200).json({
            success: true,
            updatedUser: user
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
} )

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
module.exports = verifyToken;
module.exports = router;