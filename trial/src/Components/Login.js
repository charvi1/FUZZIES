import React from 'react';
import './Login.css'; // Import the CSS file for styles

const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" name="name" type="text" required />
        <input placeholder="Password" name="password" type="password" required />
        <input className="sub" type="submit" value="Login" />
        <h3>Don’t have an account?</h3>
        <a href="/signup">Create a new account</a>
      </form>
    </div>
  );
};

export default Login;
