import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaUserAlt, FaShoppingCart } from "react-icons/fa";
import '../App.css'; 

const Header = ({ isAuthenticated, isAdmin, onLogout }) => {
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        onLogout();
        alert('Logout successful');
        navigate('/login');
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

                    {/* Show WHO WE ARE link only if isAdmin is false */}
                    {!isAdmin && (
                        <li><Link to="/about">WHO WE ARE</Link></li>
                    )}

                    <div className="search-bar">
                        <input 
                            placeholder="What are you looking for?" 
                            className="search-input" 
                            aria-label="Search" 
                        />
                        <div className="search-icon"><FaSearch aria-hidden="true" /></div>
                    </div>
                    
                    {isAuthenticated && (
                        <li>
                            <Link to="/profile">
                                <FaUserAlt size={16} className='header-icons' aria-hidden="true" />PROFILE
                            </Link>
                        </li>
                    )}

                    <li>
                        {isAuthenticated ? (
                            <button onClick={handleLogoutClick} className="logout-button">
                                <FaUserAlt size={16} className='header-icons' aria-hidden="true" />LOGOUT
                            </button>
                        ) : (
                            <Link to="/login">
                                <FaUserAlt size={16} className='header-icons' aria-hidden="true" />LOGIN
                            </Link>
                        )}
                    </li>

                    {/* Show CART tab only if isAdmin is false */}
                    {!isAdmin && (
                        <li>
                            <Link to="/cart">
                                <FaShoppingCart size={17} className='header-icons' aria-hidden="true" />CART
                            </Link>
                        </li>
                    )}

                    {/* Show admin dashboard link only if isAdmin is true */}
                    {isAdmin && (
                        <li>
                            <Link to="/admin" className="admin-link">
                                ADMIN DASHBOARD
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default Header;
