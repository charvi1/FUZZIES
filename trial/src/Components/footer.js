// src/components/Footer.js
import React from 'react';
import '../App.css'; // Assuming you create a specific CSS file for the footer

const Footer = () => {
  return (
    <footer>
      <img className="footer-top" src="footer.png" alt="Footer" />
      <div className="footer-content">
        <div className="footer">
          <h2>FUZZIES</h2>
          <div className="socials">
            <span><a href="#"><i className="fa-brands fa-instagram"></i></a></span>
            <span><a href="#"><i className="fa-brands fa-facebook"></i></a></span>
            <span><a href="#"><i className="fa-brands fa-twitter"></i></a></span>
            <span><a href="#"><i className="fa-brands fa-linkedin"></i></a></span>
          </div>
          <p className="info">
            Discover premium pet food and accessories that nurture your pet's well-being and joy.
          </p>
          <div className="footer-nav">
            <a href="/">HOME</a>
            <a href="/about">WHO WE ARE</a>
            <a href="/products">PRODUCTS</a>
          </div>
          <div className="footer-bar">
            Copyright © 2024 Fuzzies. All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
