import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BusCard from './BusCard';

const BusList = () => {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await axios.get('https://bus-booking-phi.vercel.app/buses');
        setBuses(response.data);
      } catch (error) {
        console.error('Error fetching buses:', error);
      }
    };

    fetchBuses();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-8">Available Buses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {buses.map(bus => (
          <BusCard key={bus.bus_id} bus={bus} />
        ))}
      </div>
    </div>
  );
};

export default BusList;

