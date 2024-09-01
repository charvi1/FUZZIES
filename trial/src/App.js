import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/home';
import AboutPage from './Pages/about';
import Signup_login from './Pages/Signup_login';
import ProductsPage from './Pages/ProductPage';
import CategoryList from './Pages/CategoryList';
import PrivateRoute from './Components/PrivateRoutes';
import './App.css'; // Global styles

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Signup_login />} />
          <Route path="/login" element={<Signup_login />} />
          <Route path="/signup" element={<Signup_login />} />

          
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/products/:categoryName" element={<ProductsPage />} />
            <Route path="/categories" element={<CategoryList />} />
          </Route>
        </Routes>
      </main>
    </Router>
  );
}

export default App;
