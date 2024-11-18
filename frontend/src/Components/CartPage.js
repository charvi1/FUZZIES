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
    const [totalAmount, setTotalAmount] = useState(0); // State to store total amount

    // Retrieve user email from local storage
    const user = JSON.parse(localStorage.getItem('user'));
    const email = user ? user.email : null;

    // Fetch user cart data
    const fetchUserCart = async () => {
        try {
            const response = await axios.post('http://localhost:2151/api/cart', { email });
            if (response.data.success) {
                setCart(response.data.cart); // Update cart state with fetched data
                calculateTotal(response.data.cart); // Calculate total amount
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

    // Function to calculate total bill
    const calculateTotal = (cartItems) => {
        let total = 0;
        cartItems.forEach(item => {
            total += item.productId.price * item.quantity; // Multiply price by quantity for each item
        });
        setTotalAmount(total); // Set total amount in state
    };

    // Remove item from cart
    const removeFromCart = async (productId) => {
        try {
            const response = await axios.delete('http://localhost:2151/api/cart/removeFromCart', {
                data: { email, productId },
            });
            if (response.data.success) {
                setCart(cart.filter((item) => item.productId._id !== productId));
                calculateTotal(cart.filter((item) => item.productId._id !== productId)); // Recalculate total
            } else {
                console.error('Failed to remove item from cart:', response.data.message);
            }
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    // Update cart item quantity
    const updateCartQuantity = (productId, quantity) => {
        const updatedCart = cart.map(item => {
            if (item.productId._id === productId) {
                item.quantity = quantity;
            }
            return item;
        });
        setCart(updatedCart);
        calculateTotal(updatedCart); // Recalculate total with updated quantities
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

    if (loading) return <div className="loading">Loading cart...</div>;
    if (error) return <div className="error-message">{error}</div>;

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
                                removeFromCart={removeFromCart}
                                updateCartQuantity={updateCartQuantity} // Pass the update function as a prop
                            />
                        ))}
                        <div className="total-amount">
                            <h3>Total Bill: ${totalAmount.toFixed(2)}</h3>
                        </div>
                        <button onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
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
