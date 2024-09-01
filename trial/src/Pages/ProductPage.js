import React, { useState, useEffect } from "react";
import axios from "axios";
import "./products.css";
import { LuBone } from "react-icons/lu";
import { useParams } from "react-router-dom";
import { TiArrowSortedDown } from "react-icons/ti";
const ProductsPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Category Name:", categoryName);
    const fetchProducts = async () => {
      try {
        // Make sure to use the correct query parameter name
        const response = await axios.get(`http://localhost:2151/api/products`, {
          params: { categoryNames: categoryName },
        });
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="products-page">
      <div className="product-aside">
        <div className="aside-content">
          <div className="aside-category">
            <p>Category</p><TiArrowSortedDown />
          </div>
          <div className="aside-category">
            <p>Food Type</p><TiArrowSortedDown />
          </div>
          <div className="aside-category">
            <p>Price</p><TiArrowSortedDown />
          </div>
          <div className="aside-category brand-border">
            <p>Brand</p><TiArrowSortedDown />
          </div>
        </div>
      </div>
      {/* <h1>Products</h1> */}
      <div className="products">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <img src={product.images[0]} alt={product.name} />
              <div className="product-info">
                <h2>{product.name}</h2>
                <div className="paragraphs-product">
                  <p>{product.description}</p>
                  <p>Price: ${product.price.toFixed(2)}</p>
                  <p>Rating: {product.rating}</p>
                </div>
                <button className="product-cart-button">
                  ADD TO CART
                  <LuBone className="bone-icon" size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No products found for this category.</p>
        )}
      </div>
    </section>
  );
};

export default ProductsPage;
