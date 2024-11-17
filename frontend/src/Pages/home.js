// src/Pages/home.js
import React from 'react';
// import Header from '../Components/header'; 
import Footer from '../Components/footer';
import HeroSection from '../Components/HeroSection'; 
import CategorySection from '../Components/CategorySection'; 
import FeaturesSection from '../Components/FeaturesSection'; 
import BrandsSection from '../Components/BrandsSection';

const Home = () => {
  return (
    <main>
      {/* <Header /> */}
      <HeroSection />
      <CategorySection />
      <FeaturesSection />
      <BrandsSection />
      <Footer />
    </main>
  );
};

export default Home;
