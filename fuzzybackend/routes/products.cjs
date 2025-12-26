const express = require('express');
const Product = require('../models/products.cjs'); // Import Product model
const Category = require('../models/category.cjs'); // Import Category model
const { v2: cloudinary } = require('cloudinary');
const router = express.Router();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get a single product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category');
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.json({ success: true, product });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ success: false, message: 'Error fetching product' });
    }
});

// Get all products or filter by category names
router.get('/', async (req, res) => {
    try {
        let filter = {};

        // Check if category filter is provided in the query
        if (req.query.categoryNames) {
            const categoryNames = req.query.categoryNames.split(',').map(name => name.trim());

            // Case-insensitive regex match for each category name
            const regexQueries = categoryNames.map(name => new RegExp(`^${name}$`, 'i'));

            const categories = await Category.find({ name: { $in: regexQueries } });

            if (!categories || categories.length === 0) {
                // Return empty array instead of 404 to avoid frontend error state
                return res.json([]);
            }

            const categoryIds = categories.map(category => category._id);
            filter = { category: { $in: categoryIds } };
        }

        // Fetch products with optional filtering by category
        const productList = await Product.find(filter).populate('category');

        if (!productList) {
            return res.json([]);
        }

        res.send(productList);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Create a new product
router.post('/create', async (req, res) => {
    try {
        const pLimit = (await import('p-limit')).default;
        const limit = pLimit(2);

        // Upload images to Cloudinary
        const imageUploads = req.body.images.map((image) => {
            return limit(() => cloudinary.uploader.upload(image));
        });

        const uploadResults = await Promise.all(imageUploads);
        const imageUrls = uploadResults.map(result => result.secure_url);

        // Validate category by name
        const category = await Category.findOne({ name: req.body.category });

        if (!category) {
            return res.status(404).json({ success: false, message: 'Invalid category' });
        }

        // Create and save the product
        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: category._id, // Store the category ID
            rating: req.body.rating,
            images: imageUrls
        });

        const savedProduct = await product.save();
        if (!savedProduct) {
            return res.status(500).json({ success: false, message: 'Product could not be created' });
        }

        res.status(201).json({ success: true, data: savedProduct });
    } catch (err) {
        console.error('Error:', err);  // Log errors for debugging
        res.status(500).json({ success: false, error: err.message });
    }
});

// Delete a Product
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findOneAndDelete({ _id: req.params.id });

        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, message: 'Product deleted successfully', data: deletedProduct });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Update a Product
router.put('/:id', async (req, res) => {
    try {
        // Upload images to Cloudinary if they are provided
        let imageUrls = [];
        if (req.body.images && req.body.images.length > 0) {
            const pLimit = (await import('p-limit')).default;
            const limit = pLimit(2);
            const imageUploads = req.body.images.map((image) => limit(() => cloudinary.uploader.upload(image)));
            const uploadResults = await Promise.all(imageUploads);
            imageUrls = uploadResults.map(result => result.secure_url);
        }

        // Validate category by name
        const category = await Category.findOne({ name: req.body.category });
        if (!category) {
            return res.status(404).json({ success: false, message: 'Invalid category' });
        }

        // Update the product
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                category: category._id, // Update with the category ID
                rating: req.body.rating,
                images: imageUrls.length > 0 ? imageUrls : req.body.images // Use the new image URLs if provided
            },
            { new: true } // Return the updated product
        );

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, data: updatedProduct });
    } catch (err) {
        console.error('Error:', err);  // Log errors for debugging
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
