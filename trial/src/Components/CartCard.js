// CartCard.jsx
import React from 'react';

const CartCard = ({ item }) => {
    if (!item || !item.productId) {
        return <p>Product details are not available.</p>;
    }

    const { productId, quantity } = item;
    const { name, description, price, rating, images } = productId;

    return (
        <div className="cart-card">
            <img src={images[0]} alt={name} />
            <h3>{name}</h3>
            <p>{description}</p>
            <p>Quantity: {quantity}</p>
            <p>Price: ${price}</p>
            <p>Rating: {rating}</p>
        </div>
    );
};

export default CartCard;
