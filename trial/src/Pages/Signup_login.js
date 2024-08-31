import React, { useEffect } from 'react';
import Login from '../Components/Login';
import SignUp from '../Components/Signup';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Signup_login.module.css';

const Signup_login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in by checking the token
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Debugging line

    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT token
        const isExpired = decodedToken.exp * 1000 < Date.now(); // Check if token is expired
        if (isExpired) {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          navigate('/home');
        }
      } catch (e) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  }, [navigate]);
      // Optionally check token validity here (e.g., decode and check expiry)
      // Redirect to home or another page if already logged in
     

  return (
    <div className={styles.container}>
      {(location.pathname === '/' || location.pathname === '/login') && (
        <div>
          <Login />
          <h3>Don’t have an account?</h3>
          <a href="/signup">Create a new account</a>
        </div>
      )}
      {location.pathname === '/signup' && <SignUp />}
    </div>
  );
};

export default Signup_login;
