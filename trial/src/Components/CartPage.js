import React from 'react';
import './cart.css';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    // Call useNavigate at the top level of the component
    const navigate = useNavigate();

    return (
        <main>
            <div className='main-color'></div>
            <div className='cartPage-container'>
                <div className="checkout empty-cart">
                    <h2 className="shopping-cart">Your Shopping Cart is Empty</h2>
                    <img src="cart-img.svg" alt="empty-cart" />
                    <button className="button-cart-click" onClick={() => navigate("/")}>
                        Continue Shopping
                    </button>
                </div>
            </div>
        </main>
    );
};

export default CartPage;
