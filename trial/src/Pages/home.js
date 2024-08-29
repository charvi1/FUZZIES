
import React from 'react';
import '../App.css'; 
import HeroSection from '../Components/HeroSection'; 
import CategorySection from '../Components/CategorySection'; 
import FeaturesSection from '../Components/FeaturesSection'; 
import BrandsSection from '../Components/BrandsSection'; 

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
