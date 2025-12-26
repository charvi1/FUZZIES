import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserAlt, FaShoppingCart } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { FaFileInvoiceDollar } from "react-icons/fa"; // Import the Billing icon
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
            <div className="header-container">
                <div className="logo">
                     <Link to="/">
                        <img src="logo2.png" alt="Logo" />
                    </Link>
                </div>
                <nav>
                    <ul className="nav-list">
                        <div className='nav-links'>
                            <li><Link to="/">Home</Link></li>
                            {!isAdmin && (
                                <>
                                    <li><Link to="/products">Shop</Link></li>
                                    <li><Link to="/about">About Us</Link></li>
                                </>
                            )}
                            {isAuthenticated && !isAdmin && <li><Link to="/orders">My Orders</Link></li>}

                            {/* Show admin dashboard link only if isAdmin is true */}
                            {isAdmin && (
                                <li>
                                    <Link to="/admin" className="admin-link">
                                        ADMIN DASHBOARD
                                    </Link>
                                </li>
                            )}
                        </div>

                        <div className='nav-icons'>
                            {/* Show CART tab only if isAdmin is false */}
                            {!isAdmin && (
                                <li>
                                    <Link to="/cart">
                                        <FaShoppingCart size={19} className='header-icons' aria-hidden="true" />
                                    </Link>
                                </li>
                            )}

                            {/* Show BILLING tab with icon only if authenticated and NOT admin */}
                            {isAuthenticated && !isAdmin && (
                                <li>
                                    <Link to="/billing" className="billing-link">
                                        <FaFileInvoiceDollar size={19} className='header-icons' aria-hidden="true" />
                                    </Link>
                                </li>
                            )}

                            {isAuthenticated && (
                                <li>
                                    <Link to="/profile">
                                        <FaUserAlt size={17} className='header-icons' aria-hidden="true" />
                                    </Link>
                                </li>
                            )}

                            <li>
                                {isAuthenticated ? (
                                    <button onClick={handleLogoutClick} className="logout-button">
                                        <AiOutlineLogout size={23} className='header-icons' aria-hidden="true" />
                                    </button>
                                ) : (
                                    <Link to="/login" className="login-link">
                                        <FaUserAlt size={16} className='header-icons' aria-hidden="true" />LOGIN
                                    </Link>
                                )}
                            </li>
                        </div>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Header;
