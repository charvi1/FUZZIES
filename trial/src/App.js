
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './Components/header'; // Ensure correct path
import Home from './Pages/home';
import About from './Pages/about';
import SignupLogin from './Pages/SignupLogin';
import Track from './Pages/Track';
import CategoryList from './Pages/CategoryList';
import Cart from './Pages/Cart';
import Product from './Pages/Product';
import AdminDashboard from './Pages/AdminDashboard';
import './App.css'; // Global styles
function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user')); // Check local storage for user
        if (storedUser) {
            setIsAuthenticated(true);
            setIsAdmin(
                storedUser.email === 'xoxo@gmail.com' && storedUser.password === '12345678'
            );
        }
    }, []);

    const handleLogin = (user) => {
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(user));

        // Check if user is admin
        if (user.email === 'xoxo@gmail.com' && user.password === '12345678') {
            setIsAdmin(true);
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setIsAdmin(false);
        localStorage.removeItem('user'); // Remove user details from local storage
    };

    return (
        <Router>
            {isAuthenticated && (
                <Header
                    isAuthenticated={isAuthenticated}
                    onLogout={handleLogout}
                    isAdmin={isAdmin} // Pass isAdmin prop
                />
            )}
            <main>
                <Routes>
                    <Route
                        path="/"
                        element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/about"
                        element={isAuthenticated ? <About /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/products/:categoryName"
                        element={isAuthenticated ? <Product /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/categories"
                        element={isAuthenticated ? <CategoryList /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/login"
                        element={
                            !isAuthenticated ? (
                                <SignupLogin onLogin={handleLogin} />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            !isAuthenticated ? (
                                <SignupLogin onLogin={handleLogin} />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                    <Route
                        path="/cart"
                        element={isAuthenticated ? <Cart /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/track"
                        element={isAuthenticated ? <Track /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/admin"
                        element={isAuthenticated && isAdmin ? <AdminDashboard /> : <Navigate to="/" />}
                    />
                    {/* Catch-all route to redirect unknown paths to home */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;