// src/components/CategorySection.js
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is installed
import '../App.css'; // Create a separate CSS file if needed

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch categories from the backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:2151/api/category'); // Update the URL as needed
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to load categories. Please try again later.');
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="category-section">
      {error && <p className="error-message">{error}</p>}
      <div className="category">
        <div className="items">
          {categories.length > 0 ? (
            categories.map(category => (
              <div key={category._id} className="category-items">
                <a href={`#${category.name}`}>
                <img src={`/${category.name}.png`} alt={category.name} />

                  <p>{category.name}</p>
                </a>
              </div>
            ))
          ) : (
            <p>Loading categories...</p>
          )}
        </div>
        <img className="rabbit" src="paws2.png" alt="Rabbit" />
      </div>
    </section>
  );
};

export default CategorySection;
