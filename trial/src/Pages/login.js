import React, { useState } from 'react';
import '../signin.css';
import { Link } from 'react-router-dom';



function LeftSide() {
  return (
    <div className="left-side">
      <p>The best way to study<br />Sign up for Free</p>
      <ul>
        <a>✔️LIVE Classes</a><br />
        <a>✔️Best Teachers</a><br />
        <a>✔️Free Quiz</a>
        <p style={{ color: 'white', marginTop: '250px', fontWeight: '550', marginLeft:'-50px',fontSize:'25px' }}>Learnera</p>
      </ul>
    </div>
  );
}

function RightSide() {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="right-side">
      <div className="form-container">
        <h2 style={{ color: '#3d4457' }}>Login with Username</h2>
        <form action="#" style={{ fontWeight: '700' }}>
          Email<input type="text" id="email" name="email" placeholder="Enter your email address" required />
          Password<input type="password" id="password" name="password" placeholder="Enter your password" required />
          <a href="#popup1" onClick={togglePopup} style={{ color: '#C8BFE9', fontSize: '15px', paddingLeft: '190px', marginBottom: '5px', textDecoration: 'none', fontWeight: '600' }}>Forgot Password?</a>
          <button type="submit" style={{ backgroundColor: '#C8BFE7', fontWeight: '600', padding: '5px 45px', fontSize: '20px', fontFamily: 'mukta' }}>Login</button>
        </form>
        <Link to="./signup" style={{ textDecoration: 'none' }}>
          <button type="submit" style={{ color: '#3d4457', backgroundColor: '#F6F7FB', fontFamily: 'mukta', fontWeight: '600', padding: '10px 66px', fontSize: '17px', border: 'solid 1px #C8BFE7', marginLeft: '10px' }}>New to Learnera? Create an account</button>
        </Link>
      </div>
      
      {showPopup && (
        <div id="popup1" className="overlay">
          <div className="popup">
            <h2 style={{ fontSize: '19px' }}>Forgot Your Password?</h2>
            <a className="close" href="#" onClick={togglePopup}>&times;</a>
            <div className="form-container">
              <div className="form-container2">
                <form action="#">
                  <input className="ak" type="text" id="username" name="username" placeholder="Email address" required />
                  <input className="ak" type="text" id="new" name="new" placeholder="New Password" required />
                  <input className="ak" type="text" id="reenter" name="reenter" placeholder="Re-enter new Password" required />
                  <button type="submit" style={{ backgroundColor: '#C8BFE7', fontWeight: '700' }}>Reset</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



function Signin() {
  return (
    <div>
     
      <div className="containersign">
        <LeftSide />
        <RightSide />
      </div>
    </div>
  );
}

export default Signin;
