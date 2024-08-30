import React, { useState } from 'react';
import './Login.css'; // Import the CSS file for styles
import axios from 'axios'; // Import Axios
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Clear previous errors

    try {
      const response = await axios.post('http://localhost:2151/api/auth/login', {
        email,
        password
      });

      // Store token or handle successful login
      console.log('Login successful', response.data);

      // Redirect to home page
      navigate('/'); // Redirect to the home page or any other route
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input className="sub" type="submit" value="Login" />
        {error && <div className="error">{error}</div>}
        <h3>Don’t have an account?</h3>
        <a href="/signup">Create a new account</a>
      </form>
    </div>
  );
};

export default Login;
