// src/components/Home.js
import React from 'react';
import '../App.css'; // Assuming the CSS is moved to Home.css

const Home = () => {
  return (
    <main>
       <div className="bg">
          <div className="text-heading">
            <h2>Quality care for</h2>
            <h1>your furry friends</h1>
          </div>
          <img src="image2.png" alt="Furry Friends" />
        </div>
      <section className="section section1">
        <img className="paws" src="paws.png" alt="Paws" />
        <h1 className="section-h1">Hello Hooman</h1>
        <div className="category">
          <div className="items">
            <div className="category-items"><a href=""><img src="icon1.png" alt="Dogs" /><p>Dogs</p></a></div>
            <div className="category-items"><a href=""><img src="icon2.png" alt="Cats" /><p>Cats</p></a></div>
            <div className="category-items"><a href=""><img src="icon3.png" alt="Small Pets" /><p>Small Pets</p></a></div>
            <div className="category-items"><a href=""><img src="icon4.png" alt="Birds" /><p>Birds</p></a></div>
            <div className="category-items"><a href=""><img src="icon5.png" alt="Others" /><p>Others</p></a></div>
          </div>
          <img className="rabbit" src="paws2.png" alt="Rabbit" />
        </div>
      </section>
      <section className="section section2">
        <h1 className="section-h1">Why us?</h1>
        <div className="features">
          <img className="features-img" src="/feature3.png" alt="Feature 3" />
          <div className="center features-img"><img src="feature1.png" alt="Feature 1" /></div>
          <img className="features-img" src="feature2.png" alt="Feature 2" />
        </div>
        <img className="whyus" src="whyus.png" alt="Why Us" />
      </section>
      <section className="section3">
        <div className="brands">
          <div className="brand"><img src="brand1.png" alt="Brand 1" className="branditems" /></div>
          <div className="brand"><img src="brand2.png" alt="Brand 2" className="branditems" /></div>
          <div className="brand"><img src="brand3.png" alt="Brand 3" className="branditems" /></div>
          <div className="brand"><img src="brand4.png" alt="Brand 4" className="branditems" /></div>
          <div className="brand"><img src="brand5.png" alt="Brand 5" className="branditems" /></div>
          <div className="brand"><img src="brand6.png" alt="Brand 6" className="branditems" /></div>
          <div className="brand"><img src="brand7.png" alt="Brand 7" className="branditems" /></div>
        </div>
      </section>
    </main>
  );
};

export default Home;
