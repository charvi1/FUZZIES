import React from 'react';
import { Link } from 'react-router-dom';

const CategoryList = () => {
  const categories = ['Dogs', 'cats', 'Birds', 'Others', 'Small Pets'];

  return (
    <div>
      <h1>Select a Category</h1>
      <ul>
        {categories.map(category => (
          <li key={category}>
            {/* Link to the ProductsPage using the category name */}
            <Link to={`/products/${category}`}>
              <button>{category}</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
