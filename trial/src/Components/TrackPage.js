import React from 'react';
import './TrackPage.css';
const TrackPage=()=>{
return(
    <main>
        <div className='main-container'></div>
        <div className='TrackPage-container'>
            <div className='trackPage-div'>
                <div className='trackdiv-1'>
                    <img src='babies.png'></img>
                    <h2>Track Your Order</h2>
                </div>

                <div className='trackdiv-2'>
                <div  className='tract-input-cont'>
                <label for="ORDER ID">ORDER ID</label>
                <input placeholder='Enter Order ID' id='ORDER ID' ></input>
                </div>
                <div className='tract-input-cont'>
                <label for="Mobile">MOBILE NUMBER</label>
                <input placeholder='Enter Mobile Number' id='Mobile' ></input>
                </div>
                <button>TRACK ORDER</button>
                </div>
            </div>
        </div>
    </main>
);
};

export default TrackPage;