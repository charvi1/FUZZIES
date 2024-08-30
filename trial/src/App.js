import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/home';
import AboutPage from './Pages/about'; 
import Login from './Pages/login'; // Your Login component
//import ProductsPage from './Pages/ProductPage';
import ProductsPage from './Pages/ProductPage'; // Correct if ProductsPage.js is in the same directory

import CategoryList from './Pages/CategoryList'; // Import the ProductsPage component
//import Cart from './Pages/cart'; // Your Cart component
//import Track from './Pages/track'; // Your Track component

import './App.css'; // Global styles

function App() {
  return (
    <Router>
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products/:categoryName" element={<ProductsPage />} />
          <Route path="/" element={<CategoryList />} />
          {/* <Route path="/cart" element={<Cart />} /> */}
          {/* <Route path="/track" element={<Track />} /> */}
        </Routes>
      </main>
     
    </Router>
  );
}

export default App;
