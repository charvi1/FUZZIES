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
    if (token) {
      // Redirect to home or another page if already logged in
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className={styles.container}>
      {(location.pathname === '/' || location.pathname === '/login') && <Login />}
      {location.pathname === '/signup' && <SignUp />}
    </div>
  );
};

export default Signup_login;
