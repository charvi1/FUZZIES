require('dotenv').config();

const express = require('express');
const app= express();
 const bodyParser = require('body-parser');
 const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 2323;
 // Fallback to 2323 if PORT is not defined in .env
 const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const nodemailer = require('nodemailer');

// Middleware
app.use( cors());
app.use(bodyParser.json());

// Routes
const categoryRoutes = require('./routes/category.cjs');
const productsRoutes=require('./routes/products.cjs');
const authRoutes = require('./routes/auth.cjs');
const emailRoutes =require('./routes/email.cjs');
// const WishlistRoutes=require('./routes/Wishlist.cjs');
const cartRouter = require('./routes/Cart.cjs');
const paymentRoutes = require('./routes/payment.cjs');
const billingRoutes = require('./routes/billing.cjs'); 
const feedbackRoutes=require('./routes/feedback.cjs');
app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/products',productsRoutes);
// app.use('/api/Wishlist', WishlistRoutes);
app.use('/api/cart', cartRouter);
app.use('/api/products',feedbackRoutes);
app.use('/api',billingRoutes);
app.use('/api/mail',emailRoutes);
app.use('/api/payment',paymentRoutes);

// Database
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((error) => console.log('Failed to connect to MongoDB Atlas', error));

// Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});