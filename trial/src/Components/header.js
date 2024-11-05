import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaLocationArrow, FaUserAlt, FaShoppingCart } from "react-icons/fa";
import '../App.css'; // Ensure the path is correct

const Header = ({ isAuthenticated, onLogout, isAdmin }) => {
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        onLogout(); // Handle logout in App.js
        alert('Logout successful'); // Display logout message
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className="header">
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
                        <div className="search-icon"><FaSearch /></div>
                    </div>
                    <li><Link to="/track"><FaLocationArrow size={16} className='header-icons'/>TRACK</Link></li>
                    <li>
                        <button onClick={handleLogoutClick} className="logout-button">
                            <FaUserAlt size={16} className='header-icons'/>LOGOUT
                        </button>
                    </li>
                    <li><Link to="/cart"><FaShoppingCart size={17} className='header-icons'/>CART</Link></li>
            
                    {/* Conditionally render Admin tab if the user is an admin */}
                    {isAdmin && (
                        <li><Link to="/admin">ADMIN DASHBOARD</Link></li>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default Header;
