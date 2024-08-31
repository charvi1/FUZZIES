import React, { useState } from 'react';
import './Signup.css'; // Import the CSS file for styles
import axios from 'axios';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:2151/api/auth/signup', formData);
      console.log('Signup successful:', response.data);
      // Redirect or show a success message
    } catch (err) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width:'210vh',
        background: "url('av.png') no-repeat center center fixed", // Change '/fuzzy.png' to your actual image path
        backgroundSize: 'cover',
      }}
    >
    <div className="container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          placeholder="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          placeholder="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input className="sub" type="submit" value="Sign Up" />
        {error && <p>{error}</p>}
      </form>
      <a href="/">Go back to login page</a>
    </div>
    </div>
  );
};

export default SignUp;
