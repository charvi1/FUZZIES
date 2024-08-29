// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/home';
import About from './Pages/about'; // Assume you have an About component
import Login from './Pages/login'; // Your Login component
//import Cart from './Pages/cart'; // Your Cart component
//import Track from './Pages/Track'; // Your Track component
import Header from './Components/header';
import Footer from './Components/footer';
import './App.css'; // Global styles

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/cart" element={<Cart />} /> */}
          {/* <Route path="/track" element={<Track />} /> */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
