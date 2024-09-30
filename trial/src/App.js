import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/home';
import AboutPage from './Pages/about';
import Signup_login from './Pages/Signup_login';
import Track from './Pages/Track';
import CategoryList from './Pages/CategoryList';
import Cart from './Pages/Cart';
import './App.css'; // Global styles
import Product from './Pages/Product';

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
          <Route path="/cart" element={<Cart />} />
          <Route path="/track" element={<Track />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
