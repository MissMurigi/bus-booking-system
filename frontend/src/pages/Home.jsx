import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css';
import Footer from '../components/Footer';

function Home() {
  return (
    <div className='home'>
      <div className='home-header'>
        <h1>Welcome to our Bus Booking App</h1>
        <p>Your convenient way to book bus tickets online!</p>
      </div>

      <div className='features'>
        <h2>Why Choose Us?</h2>
        <ul>
          <li>Easy booking process</li>
          <li>Best prices guaranteed</li>
          <li>Secure payment options</li>
          <li>24/7 customer support</li>

        </ul>
      </div>
      <div className='Routes'>
        <h2>Popular Routes</h2>
        <ul>
          <li>New York to Los Angeles</li>
          <li>Los Angeles to New York</li>
          <li>Chicago to Miami</li>
          <li>Miami to Chicago</li>

        </ul>
      </div>
      <div className='start'>
        <h2>Get Started </h2>
        <p> Book yout next journey with us today!</p>
        <Link to="/login" className="login-button">Book Now!</Link>
      </div>

      <Footer />
    </div>
  )
}

export default Home
