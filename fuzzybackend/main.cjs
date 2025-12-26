require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 2323;
// Fallback to 2323 if PORT is not defined in .env
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const nodemailer = require('nodemailer');

app.use(cors({
  origin: ['https://fuzzies-f4ym.vercel.app', 'https://fuzzies-sbun.vercel.app', 'http://localhost:3000', 'http://localhost:5173'], // Added new Vercel domain
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Added PATCH
  credentials: true
}));

app.use(bodyParser.json());

// Routes
const categoryRoutes = require('./routes/category.cjs');
const productsRoutes = require('./routes/products.cjs');
const authRoutes = require('./routes/auth.cjs');
const emailRoutes = require('./routes/email.cjs');
// const WishlistRoutes=require('./routes/Wishlist.cjs');
const cartRouter = require('./routes/Cart.cjs');
const paymentRoutes = require('./routes/payment.cjs');
const billingRoutes = require('./routes/billing.cjs');
const feedbackRoutes = require('./routes/feedback.cjs');
const orderRoutes = require('./routes/order.cjs'); // Added Order Route

app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/products', productsRoutes);
// app.use('/api/Wishlist', WishlistRoutes);
app.use('/api/cart', cartRouter);
app.use('/api/products', feedbackRoutes);
app.use('/api', billingRoutes);
app.use('/api/mail', emailRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api', orderRoutes); // Registered Order Route

// Database
mongoose.connect(process.env.MONGODB_URI)
  .then(() => { })
  .catch((error) => { });

// Server
app.listen(port, () => {

});
