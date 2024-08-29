// src/components/Home.js
import React from 'react';
import '../App.css'; // Assuming the CSS is moved to Home.css
import HeroSection from '../Components/HeroSection'; // Import the HeroSection component
import CategorySection from '../Components/CategorySection'; // Import the CategorySection component
import FeaturesSection from '../Components/FeaturesSection'; // Import the FeaturesSection component
import BrandsSection from '../Components/BrandsSection'; // Import the BrandsSection component

const Home = () => {
  return (
    <main>
      <HeroSection />
      <CategorySection />
      <FeaturesSection />
      <BrandsSection />
      <footer/>
    </main>
  );
};

export default Home;
