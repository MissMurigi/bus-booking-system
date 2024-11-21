import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar.jsx";
import "./home.css";
import bus1 from "../../assets/bus0.png.jpeg"; 
import bus2 from "../../assets/bus2.png.jpeg";
import bus3 from "../../assets/bus6.png.jpeg";
import bus4 from "../../assets/bus7.png.jpeg";
import bus5 from "../../assets/bus8.png.jpeg";
import bus6 from "../../assets/bus9.png.jpeg";
import bus7 from "../../assets/bus10.png.jpeg";


const busImages = {
  1: bus1,
  2: bus2,
  3: bus3,
  4: bus4,
  5: bus5,
  6: bus6,
  7: bus7,
};

const Home = () => {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/buses");
        const data = await response.json();
        setBuses(data);
      } catch (error) {
        console.error("Error fetching buses:", error);
      }
    };

    fetchBuses();
  }, []);

  return (
    <>
      <Navbar />
      <section className="hero-section">
        <div className="hero-overlay">
          <h1>Welcome to Our Bus Booking System</h1>
          <p>Your ultimate solution for seamless bus booking experiences.</p>
        </div>
      </section>

      <section className="bus-fleet-section">
        <h2>Our Bus Fleet</h2>
        <div className="bus-cards-container">
          {buses.map((bus) => {
            const busImage = busImages[bus.bus_id % 10 || 10] || bus1; 
            return (
              <div key={bus.bus_id} className="bus-card">
                <img
                  src={busImage}
                  alt={`Bus ${bus.bus_id}`}
                  className="bus-image"
                />
                <div className="bus-details">
                  <h3>Bus ID: {bus.bus_id}</h3>
                  <p>Route: {bus.route}</p>
                  <p>Seats: {bus.number_of_seats}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="why-choose-us-section">
        <h2>Why Choose Us</h2>
        <div className="features-container">
          <div className="feature">
            <h3>Convenience</h3>
            <p>Book your seat anytime, anywhere, with just a few clicks.</p>
          </div>
          <div className="feature">
            <h3>Reliability</h3>
            <p>Trustworthy services ensuring a hassle-free travel experience.</p>
          </div>
          <div className="feature">
            <h3>Variety</h3>
            <p>Choose from a wide range of buses and routes to suit your needs.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
