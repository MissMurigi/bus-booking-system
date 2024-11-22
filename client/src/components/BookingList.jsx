import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BusList = ({ onSelectBus }) => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await axios.get('/buses');
        setBuses(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch buses. Please try again later.');
        setLoading(false);
      }
    };

    fetchBuses();
  }, []);

  const handleSelectBus = (bus) => {
    onSelectBus(bus);
    navigate('/booking');
  };

  if (loading) return <div className="text-center py-4">Loading buses...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {buses.map((bus) => (
        <div key={bus.bus_id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-lg font-semibold mb-2">{bus.route}</h3>
          <p className="text-gray-600 mb-2">Available Seats: {bus.number_of_seats}</p>
          <p className="text-gray-600 mb-2">Cost per Seat: ${bus.cost_per_seat}</p>
          <button
            onClick={() => handleSelectBus(bus)}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
          >
            Select Bus
          </button>
        </div>
      ))}
    </div>
  );
};

export default BusList;


