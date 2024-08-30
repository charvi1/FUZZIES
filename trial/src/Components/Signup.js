import React from 'react';
import './Signup.css'; // Import the CSS file for styles

const SignUp = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
  };

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" name="name" type="text" required />
        <input placeholder="Password" name="password" type="password" required />
        <input className="sub" type="submit" value="Sign Up" />
      </form>
      <a href="/">Go back to login page</a>
    </div>
  );
};

export default SignUp;
