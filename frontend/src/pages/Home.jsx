import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

import Footer from '../components/Footer';
import Header from '../components/Navbar';
import Theme from '../components/theme/Theme';
import bus3 from '../assets/bus3.png';
import bg1 from '../assets/bg1.jpg';

const busData = [
  { name: 'Safari Explorer', image: require('../assets/bus1.png'), category: 'Adventure', seats: 40 },
  { name: 'Mountain Climber', image: require('../assets/bus2.png'), category: 'Mountain Travel', seats: 30 },
  { name: 'City Hopper', image: bus3, category: 'City Trips', seats: 50 },
  // other bus objects...
];

function Home() {
  const [searchCategory, setSearchCategory] = useState('');
  const [showAll, setShowAll] = useState(false);

  const filteredBuses = busData.filter(bus => 
    bus.name.toLowerCase().includes(searchCategory.toLowerCase())
  );

  return (
    <div className="home">
      <Theme />
      <Header />

      {/* Home Header Section */}
      <div className="home-header">
        <div className="text-content">
          <h1>Reserve Your Bus <span>Tickets</span> Now</h1>
          <p>Find and book your bus tickets with just a few clicks. We offer a wide range of bus routes and schedules to suit your needs.</p>
          <Link to="/booking" className="book-button">Reserve Seat Now</Link>
        </div>
        <img src={bus3} alt="Bus" className="bus-image" />
      </div>

      {/* Rest of the page content */}
      <div className="category">
        <h2>Our Bus Fleet</h2>
        <div className="category-filter">
          <input 
            type="text" 
            placeholder="Search by category..." 
            value={searchCategory} 
            onChange={(e) => setSearchCategory(e.target.value)} 
          />
        </div>
        
        <div className="bus-list">
          {filteredBuses.slice(0, showAll ? filteredBuses.length : 3).map((bus, index) => (
            <div key={index} className="bus-card">
              <img src={bus.image} alt={bus.name} />
              <div className="bus-overlay">
                <div className="bus-info">
                  <h3>{bus.category}</h3>
                  <p>{bus.seats} Seats</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => setShowAll(!showAll)} className="view-all">
          {showAll ? 'Show Less' : 'View All'}
        </button>
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
