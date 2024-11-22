import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserAlt, FaShoppingCart } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { AiOutlineLogout } from "react-icons/ai";
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
                    <div className='navdivwologo'>
                    <li><Link to="/">HOME</Link></li>

                    {/* Show WHO WE ARE link only if isAdmin is false */}
                    {!isAdmin && (
                        <li><Link to="/about">WHO WE ARE</Link></li>
                    )}

                     {/* Show admin dashboard link only if isAdmin is true */}
                     {isAdmin && (
                        <li>
                            <Link to="/admin" className="admin-link">
                            {/* <RiAdminFill size={20} className='header-icons' aria-hidden="true" /> */}
                                ADMIN DASHBOARD
                            </Link>
                        </li>
                    )}
                    </div>

                    {/* <div className="search-bar">
                        <input 
                            placeholder="What are you looking for?" 
                            className="search-input" 
                            aria-label="Search" 
                        />
                        <div className="search-icon"><FaSearch aria-hidden="true" /></div>
                    </div> */}
                    
                   

                   <div className='navdivwlogo'>

                    {/* Show CART tab only if isAdmin is false */}
                    {!isAdmin && (
                        <li>
                            <Link to="/cart">
                                <FaShoppingCart size={19} className='header-icons' aria-hidden="true" />
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
                            <Link to="/login">
                                <FaUserAlt size={16} className='header-icons' aria-hidden="true" />LOGIN
                            </Link>
                        )}
                    </li>
                    </div>
                </ul>
            </nav>
        </div>
    );
};

export default Header;
