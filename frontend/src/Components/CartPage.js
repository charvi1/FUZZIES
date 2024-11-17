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
    const fetchUserCart = async () => {
        try {
            const response = await axios.post('http://localhost:2151/api/cart', { email });
            if (response.data.success) {
                setCart(response.data.cart); // Update cart state with fetched data
            } else {
                setError('Failed to fetch cart data.');
            }
        } catch (error) {
            setError('Error fetching cart data.');
            console.error('Error fetching cart:', error);
        } finally {
            setLoading(false);
        }
    };

    // Remove item from cart
    const removeFromCart = async (productId) => {
        try {
            const response = await axios.delete('http://localhost:2151/api/cart/removeFromCart', {
                data: { email, productId }, // Pass email and productId in the request body
            });
            if (response.data.success) {
                // Update the cart state by filtering out the removed item
                setCart(cart.filter((item) => item.productId._id !== productId));
            } else {
                console.error('Failed to remove item from cart:', response.data.message);
            }
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    // Fetch user cart on component mount
    useEffect(() => {
        if (email) {
            fetchUserCart();
        } else {
            setError('No user email found.');
            setLoading(false);
        }
    }, [email]);

    if (loading) return <div>Loading cart...</div>;
    if (error) return <div>{error}</div>;

    return (
        <main>
            <div className="main-color"></div>
            <div className="cartPage-container">
                {cart.length > 0 ? (
                    <div className="checkout cart-items">
                        <h2 className="shopping-cart">Your Shopping Cart</h2>
                        {cart.map((item) => (
                            <CartCard
                                key={item._id}
                                item={item}
                                removeFromCart={removeFromCart} // Pass the remove function as a prop
                            />
                        ))}
                    </div>
                ) : (
                    <div className="checkout empty-cart">
                        <h2 className="shopping-cart">Your Shopping Cart is Empty</h2>
                        <img src="cart-img.svg" alt="empty-cart" />
                        <button className="button-cart-click" onClick={() => navigate('/')}>
                            Continue Shopping
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
};

export default CartPage;
