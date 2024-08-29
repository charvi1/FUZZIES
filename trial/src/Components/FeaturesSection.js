// src/components/FeaturesSection.js
import React from 'react';
import '../App.css'; // Create a separate CSS file if needed

const FeaturesSection = () => {
  return (
    <section className="section2">
      <h1 className="section-h1">Why us?</h1>
      <div className="features">
        <img className="features-img" src="/feature3.png" alt="Feature 3" />
        <div className="center features-img"><img src="feature1.png" alt="Feature 1" /></div>
        <img className="features-img" src="feature2.png" alt="Feature 2" />
      </div>
      <img className="whyus" src="whyus.png" alt="Why Us" />
    </section>
  );
};

export default FeaturesSection;
