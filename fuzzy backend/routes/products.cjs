const express = require('express');
const { Product } = require('../models/products.cjs');
const { Category } = require('../models/category.cjs');
const { v2: cloudinary } = require('cloudinary'); // Ensure Cloudinary is imported
const router = express.Router();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get all products or filter by category names
router.get('/', async (req, res) => {
    try {
        let filter = {};
        
        // Check if category filter is provided in the query
        if (req.query.categoryNames) {
            const categoryNames = req.query.categoryNames.split(','); // Split comma-separated category names

            const categories = await Category.find({ name: { $in: categoryNames } });
            const categoryIds = categories.map(category => category._id);

            if (categoryIds.length === 0) {
                return res.status(404).json({ success: false, message: 'No categories found' });
            }

            filter = { category: { $in: categoryIds } }; // Filter products by the found category IDs
        }

        // Fetch products with optional filtering by category
        const productList = await Product.find(filter).populate('category');

        if (!productList || productList.length === 0) {
            return res.status(404).json({ success: false, message: 'No products found' });
        }

        res.send(productList);
    } catch (err) {
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

        // Validate category
        const category = await Category.findById(req.body.category);
        if (!category) {
            return res.status(404).json({ success: false, message: 'Invalid category' });
        }

        // Create and save the product
        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            rating: req.body.rating,
            images: imageUrls // Ensure you pass the image URLs if needed
        });

        const savedProduct = await product.save();
        if (!savedProduct) {
            return res.status(500).json({ success: false, message: 'Product could not be created' });
        }

        res.status(201).json({ success: true, data: savedProduct });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Delete a Product
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndRemove(req.params.id);
        
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, message: 'Product deleted successfully', data: deletedProduct });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
