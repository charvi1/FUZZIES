import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./products.css";
import { LuBone } from "react-icons/lu";
import { useParams, useNavigate } from "react-router-dom";
import { TiArrowSortedDown } from "react-icons/ti";
import { IoMdArrowDropup } from "react-icons/io";

const ProductsPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(null); // For toggling the filter sections
  const [cart, setCart] = useState([]);

  const toggle = (index) => {
    setOpen(open === index ? null : index);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:2151/api/products`, {
          params: { categoryNames: categoryName },
        });
        setProducts(response.data);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  const handleAddToCart = async (product) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        toast.warn("Please log in to add items to your cart.");
        navigate("/login");
        return;
      }
      const response = await axios.post("http://localhost:2151/api/cart/addToCart", {
        email: user.email,
        productId: product._id,
      });

      if (response.data.success) {
        setCart(response.data.cart);
        toast.success(`${product.name} has been added to your cart!`);
      } else {
        toast.error("Failed to add the item to the cart. Please try again.");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error("An error occurred while adding the product. Please try again.");
    }
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="products-page">
      {/* Toast Notifications */}
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="product-aside">
        <div className="aside-content">
          <div className="aside-category" onClick={() => toggle(1)}>
            <p>Category</p> {open === 1 ? <IoMdArrowDropup /> : <TiArrowSortedDown />}
          </div>
          {open === 1 && (
            <div className="aside-category-hidden product-show">
              <div className="hidden-radio-container">
                <input type="radio" name="category" />
                <label>Food</label>
              </div>
              <div className="hidden-radio-container">
                <input type="radio" name="category" />
                <label>Accessories</label>
              </div>
              <div className="hidden-radio-container">
                <input type="radio" name="category" />
                <label>Toys</label>
              </div>
            </div>
          )}

          <div className="aside-category" onClick={() => toggle(2)}>
            <p>Food Type</p> {open === 2 ? <IoMdArrowDropup /> : <TiArrowSortedDown />}
          </div>
          {open === 2 && (
            <div className="aside-category-hidden product-show">
              <div className="hidden-radio-container">
                <input type="radio" name="food-type" />
                <label>Dry</label>
              </div>
              <div className="hidden-radio-container">
                <input type="radio" name="food-type" />
                <label>Wet</label>
              </div>
            </div>
          )}

          <div className="aside-category" onClick={() => toggle(3)}>
            <p>Price</p> {open === 3 ? <IoMdArrowDropup /> : <TiArrowSortedDown />}
          </div>
          {open === 3 && (
            <div className="aside-category-hidden product-show">
              <div className="hidden-radio-container">
                <input type="radio" name="price" />
                <label className="label">Under $50</label>
              </div>
              <div className="hidden-radio-container">
                <input type="radio" name="price" />
                <label className="label">$50 - $100</label>
              </div>
              <div className="hidden-radio-container">
                <input type="radio" name="price" />
                <label className="label">Over $100</label>
              </div>
            </div>
          )}

          <div className="aside-category" onClick={() => toggle(4)}>
            <p>Brand</p> {open === 4 ? <IoMdArrowDropup /> : <TiArrowSortedDown />}
          </div>
          {open === 4 && (
            <div className="aside-category-hidden product-show">
              <div className="hidden-radio-container">
                <input type="radio" name="brand" />
                <label>Brand A</label>
              </div>
              <div className="hidden-radio-container">
                <input type="radio" name="brand" />
                <label>Brand B</label>
              </div>
              <div className="hidden-radio-container">
                <input type="radio" name="brand" />
                <label>Brand C</label>
              </div>
            </div>
          )}
        </div>
      </div>

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
                <button className="product-cart-button" onClick={() => handleAddToCart(product)}>
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
