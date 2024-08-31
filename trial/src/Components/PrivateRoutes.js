import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('token');

  // If token doesn't exist, redirect to the login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If token exists, render the requested page
  return <Outlet />;
};

export default PrivateRoute;
