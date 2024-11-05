import React from "react";

const CartCard = ({ productData }) => {
    const { productId, quantity } = productData;
    const { name, description, price, rating, images } = productId;

    return (
        <div className="horizontal-card">
            <img src={images[0]} alt={name} className="card-image" />
            <div className="card-content">
                <h2 className="card-title">{name}</h2>
                <p className="card-description">{description}</p>
                <p className="card-price">Price: ${price.toFixed(2)}</p>
                <p className="card-quantity">Quantity: {quantity}</p>
                <p className="card-rating">Rating: {rating} / 5</p>
            </div>
        </div>
    );
};

export default CartCard;
