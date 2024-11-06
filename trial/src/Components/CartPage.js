import React, { useEffect, useState } from 'react';
import './cart.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CartCard from './CartCard';

const CartPage = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Retrieve user email from local storage
    const user = JSON.parse(localStorage.getItem('user'));
    const email = user ? user.email : null;

    // Fetch user cart data
    const fetchUserCart = async (email) => {
        try {
            const response = await axios.post('http://localhost:2151/api/cart', { email });
            if (response.data.success) {
                console.log(response.data);
                setCart(response.data.cart);
            } else {
                setError("Failed to fetch cart data.");
            }
        } catch (error) {
            setError("Error fetching cart data.");
            console.error("Error fetching cart:", error);
        } finally {
            setLoading(false);
        }
    };
    
    // Trigger fetchUserCart on component mount
    useEffect(() => {
        if (email) {
            fetchUserCart(email);
        } else {
            setError("No user email found.");
            setLoading(false);
        }
    }, [email]);

    if (loading) return <div>Loading cart...</div>;
    if (error) return <div>{error}</div>;

    return (
        <main>
            <div className='main-color'></div>
            <div className='cartPage-container'>
                {cart.length > 0 ? (
                    <div className="checkout cart-items">
                        <h2 className="shopping-cart">Your Shopping Cart</h2>
                        {cart.map((item) => (
                            // Pass the item prop properly
                            <CartCard key={item._id} item={item} />
                        ))}
                    </div>
                ) : (
                    <div className="checkout empty-cart">
                        <h2 className="shopping-cart">Your Shopping Cart is Empty</h2>
                        <img src="cart-img.svg" alt="empty-cart" />
                        <button className="button-cart-click" onClick={() => navigate("/")}>
                            Continue Shopping
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
};

export default CartPage;
