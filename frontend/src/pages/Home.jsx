import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

import Footer from '../components/Footer';
import Header from '../components/Navbar';
import Theme from '../components/theme/Theme'; // Corrected path
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
  { name: 'Safari Explorer', image: bus1, category: 'Adventure', seats: 40 },
  { name: 'Mountain Climber', image: bus2, category: 'Mountain Travel', seats: 30 },
  { name: 'City Hopper', image: bus3, category: 'City Trips', seats: 50 },
  { name: 'Desert Cruiser', image: bus4, category: 'Desert Tours', seats: 35 },
  { name: 'Coastal Voyager', image: bus5, category: 'Coastal Travel', seats: 45 },
  { name: 'Forest Ranger', image: bus6, category: 'Forest Exploration', seats: 40 },
  { name: 'Urban Explorer', image: bus7, category: 'City Tours', seats: 55 },
  { name: 'Island Hopper', image: bus8, category: 'Island Trips', seats: 30 },
  { name: 'Beach Cruiser', image: bus9, category: 'Beach Tours', seats: 50 },
  { name: 'Countryside Traveller', image: bus10, category: 'Countryside', seats: 40 },
];

function Home() {
  const [searchCategory, setSearchCategory] = useState('');
  const [showAll, setShowAll] = useState(false);

  const filteredBuses = busData.filter(bus => 
    bus.name.toLowerCase().includes(searchCategory.toLowerCase())
  );

  return (
    <div className="home">
      <Theme /> {/* Theme toggle button */}
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
