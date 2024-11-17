import React from 'react';
import './cartcard.css';

const CartCard = ({ item, removeFromCart }) => {
    if (!item || !item.productId) {
        return <p>Product details are not available.</p>;
    }

    const { productId, quantity } = item;
    const { name, description, price, rating, images } = productId;

    const handleRemove = () => {
        removeFromCart(productId._id); // Trigger the remove function passed as a prop
    };

    return (
        <div className="cart-card">
            <img src={images[0]} alt={name} className="cart-card-img" />
            <div className="cart-card-details">
                <h3>{name}</h3>
                <p>{description}</p>
                <p><strong>Quantity:</strong> {quantity}</p>
                <p><strong>Price:</strong> ${price.toFixed(2)}</p>
                <p><strong>Rating:</strong> {rating}</p>
            </div>
            <button className="remove-button" onClick={handleRemove}>
                Remove
            </button>
        </div>
    );
};

export default CartCard;
