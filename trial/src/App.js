// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/home';
import AboutPage from './Pages/about';
import Signup_login from './Pages/Signup_login';
import CategoryList from './Pages/CategoryList';
import Product from './Pages/Product';

import './App.css'; // Global styles

function App() {
  return (
   
      <Router>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/products/:categoryName" element={<Product />} />
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/login" element={<Signup_login />} />
            <Route path="/signup" element={<Signup_login />} />
            
          </Routes>
        </main>
      </Router>
   
  );
}

export default App;
