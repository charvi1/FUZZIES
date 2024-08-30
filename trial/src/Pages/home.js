
import React from 'react';
import '../App.css'; 
import HeroSection from '../Components/HeroSection'; 
import CategorySection from '../Components/CategorySection'; 
import FeaturesSection from '../Components/FeaturesSection'; 
import BrandsSection from '../Components/BrandsSection';
import Header from '../Components/header'; // Adjust the path as needed
import Footer from '../Components/footer';

const Home = () => {
  return (
    <main>
      <Header/>
      <HeroSection />
      <CategorySection />
      <FeaturesSection />
      <BrandsSection />
      <Footer/>
    </main>
  );
};

export default Home;
