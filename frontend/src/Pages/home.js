import React from 'react';
import Footer from '../Components/footer';
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
      <Footer />
    </main>
  );
};

export default Home;
