import React from 'react'
import Login from '../Components/Login'
import SignUp from '../Components/Signup'
import { useLocation } from 'react-router-dom';
import styles from './Signup_login.module.css';
const Signup_login = () => {
    const location = useLocation();
  return (
    <div className={styles.container}>
        {(location.pathname === '/' || location.pathname === '/login') && <Login />}
        {location.pathname === '/signup' && <SignUp />}
    </div>
  )
}

export default Signup_login