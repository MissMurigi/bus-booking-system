import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Footer from '../components/Footer';
import Header from '../components/Navbar';

// Bus images
import bus1 from '../assets/bus1.png';
import bus2 from '../assets/bus2.png';
import bus3 from '../assets/bus3.png';
import bus4 from '../assets/bus4.png';
import bus5 from '../assets/bus5.png';
import bus6 from '../assets/bus6.png';
import bus7 from '../assets/bus7.png';
import bus8 from '../assets/bus8.png';
import bus9 from '../assets/bus9.png';
import bus10 from '../assets/bus10.png';

const busData = [
  { name: 'Safari Explorer', image: bus1, description: 'Comfortable and spacious for long journeys.' },
  { name: 'Mountain Climber', image: bus2, description: 'Perfect for high altitude travel.' },
  { name: 'City Hopper', image: bus3, description: 'Ideal for quick city trips.' },
  { name: 'Desert Cruiser', image: bus4, description: 'Best for desert expeditions.' },
  { name: 'Coastal Voyager', image: bus5, description: 'Enjoy the coastal breeze on this bus.' },
  { name: 'Forest Ranger', image: bus6, description: 'Great for forest adventures.' },
  { name: 'Urban Explorer', image: bus7, description: 'Navigate the city with ease.' },
  { name: 'Island Hopper', image: bus8, description: 'Perfect for island tours.' },
  { name: 'Beach Cruiser', image: bus9, description: 'Comfortable rides along the coast.' },
  { name: 'Countryside Traveller', image: bus10, description: 'Explore the countryside in comfort.' },
];

function Home() {
  const [currentBusIndex, setCurrentBusIndex] = useState(0);

  const nextBus = () => {
    setCurrentBusIndex((prevIndex) => (prevIndex + 1) % busData.length);
  };

  const prevBus = () => {
    setCurrentBusIndex((prevIndex) => (prevIndex - 1 + busData.length) % busData.length);
  };

  return (
    <div className="home">
      <Header />
      <div className="home-header">
        <div className="text-content">
          <h1>Welcome to our Bus Booking App</h1>
          <p>Your convenient way to book bus tickets online!</p>
          <Link to="/booking" className="book-button">Book Now!</Link>
        </div>
      </div>

      <div className="category">
        <h2>Our Bus Fleet</h2>
        <div className="bus-slider" style={{ transform: `translateX(-${currentBusIndex * 350}px)` }}>
          {busData.map((bus, index) => (
            <div key={index} className="bus-card">
              <img src={bus.image} alt={bus.name} />
              <div className="bus-description">
                <h3>{bus.name}</h3>
                <p>{bus.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Arrow buttons to change bus */}
        <button className="arrow-btn arrow-btn-left" onClick={prevBus}>❮</button>
        <button className="arrow-btn arrow-btn-right" onClick={nextBus}>❯</button>
      </div>

      <div className="features">
        <h2>Why Choose Us?</h2>
        <ul>
          <li>Easy booking process</li>
          <li>Best prices guaranteed</li>
          <li>Secure payment options</li>
          <li>24/7 customer support</li>
        </ul>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
