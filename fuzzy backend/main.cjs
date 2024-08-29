require('dotenv').config();

const express = require('express');
const app= express();
 const bodyParser = require('body-parser');
 const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 2323; // Fallback to 2323 if PORT is not defined in .env

// Middleware
app.use( cors());
app.use(bodyParser.json());

// Routes
const categoryRoutes = require('./routes/category.cjs');
const productsRoutes=require('./routes/products.cjs');

app.use('/api/category', categoryRoutes);
app.use('/api/products',productsRoutes);

// Database
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((error) => console.log('Failed to connect to MongoDB Atlas', error));

// Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
