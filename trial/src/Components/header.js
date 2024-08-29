// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Assuming the CSS is moved to Header.css

const Header = () => {
  return (
    <header className="about-header">
      <div className="logo">
        <img src="logo2.png" alt="Logo" />
      </div>
      <hr />
      <nav>
        <ul>
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/about">WHO WE ARE</Link></li>
          <div className="search-bar">
            <input placeholder="What are you looking for?" className="search-input" />
            <div className="search-icon"><i className="fa-solid fa-magnifying-glass"></i></div>
          </div>
          <li><Link to="/track"><i className="fa-solid fa-location-dot"></i>TRACK</Link></li>
          <li><Link to="/login"><i className="fa-solid fa-user"></i>LOGIN</Link></li>
          <li><Link to="/cart"><i className="fa-solid fa-cart-shopping"></i>CART</Link></li>
        </ul>
      </nav>
      
        
        
    </header>
  );
};

export default Header;
