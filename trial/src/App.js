// import Product from './Pages/Product';
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Home from './Pages/home';
// import AboutPage from './Pages/about';
// import Signup_login from './Pages/Signup_login';
// import Track from './Pages/Track';
// import CategoryList from './Pages/CategoryList';
// import Cart from './Pages/Cart';
// import AdminDashboard from './Pages/AdminDashboard';

// import './App.css';

// function App() {
//     // State to manage authentication
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
    
//     // Simulated user state (replace this with your actual authentication logic)
//     const user = { email: 'xoxo@gmail.com', password: '12345678' };
//     const isAdmin = user && user.email === 'xoxo@gmail.com' && user.password === '12345678';

//     // Function to handle login (for demonstration)
//     const handleLogin = () => {
//         setIsAuthenticated(true); // Set authenticated state to true
//     };

//     return (
//         <Router>
//             <main>
//                 <Routes>
//                     <Route path="/" element={<Home />} />
//                     <Route path="/about" element={isAuthenticated ? <AboutPage /> : <Navigate to="/login" />} />
//                     <Route path="/products/:categoryName" element={isAuthenticated ? <Product /> : <Navigate to="/login" />} />
//                     <Route path="/categories" element={isAuthenticated ? <CategoryList /> : <Navigate to="/login" />} />
//                     <Route path="/login" element={<Signup_login onLogin={handleLogin} />} />
//                     <Route path="/signup" element={<Signup_login onLogin={handleLogin} />} />
//                     <Route path="/cart" element={isAuthenticated ? <Cart /> : <Navigate to="/login" />} />
//                     <Route path="/track" element={isAuthenticated ? <Track /> : <Navigate to="/login" />} />
//                     <Route path="/admin" element={isAdmin && isAuthenticated ? <AdminDashboard /> : <Navigate to="/" />} />
//                 </Routes>
//             </main>
//         </Router>
//     );
// }

// export default App;

// src/App.js
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
    const [username, setUsername] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user')); // Check local storage for user
        if (storedUser) {
            setIsAuthenticated(true);
            setUsername(storedUser.name); // Use 'name' instead of 'email'
            setIsAdmin(
                storedUser.email === 'xoxo@gmail.com' && storedUser.password === '12345678'
            );
        }
    }, []);

    const handleLogin = (user) => {
        setIsAuthenticated(true);
        setUsername(user.name); // Use 'name' instead of 'email'
        localStorage.setItem('user', JSON.stringify(user));

        // Check if user is admin
        if (user.email === 'xoxo@gmail.com' && user.password === '12345678') {
            setIsAdmin(true);
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUsername('');
        setIsAdmin(false);
        localStorage.removeItem('user'); // Remove user details from local storage
        // Note: The logout message and navigation will be handled in Header.js
    };

    return (
        <Router>
            {isAuthenticated && (
                <Header
                    isAuthenticated={isAuthenticated}
                    username={username}
                    onLogout={handleLogout}
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
                        element={
                            isAuthenticated && isAdmin ? (
                                <AdminDashboard />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                    {/* Catch-all route to redirect unknown paths to home */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;

                      