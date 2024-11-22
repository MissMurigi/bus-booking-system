import React, { useState } from 'react';
import axios from 'axios';

const RouteSearch = ({ onRouteSelect }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [routes, setRoutes] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('/schedule', { params: { from, to, date } });
      setRoutes(response.data);
    } catch (error) {
      console.error('Error fetching routes:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Search Routes</h2>
      <form onSubmit={handleSearch} className="space-y-4">
        <div>
          <label htmlFor="from" className="block text-sm font-medium text-gray-700">From</label>
          <input
            type="text"
            id="from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label htmlFor="to" className="block text-sm font-medium text-gray-700">To</label>
          <input
            type="text"
            id="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Search
        </button>
      </form>
      {routes.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Available Routes:</h3>
          <ul className="space-y-2">
            {routes.map((route) => (
              <li key={route.schedule_id} className="bg-gray-100 p-3 rounded-md">
                <p>Departure: {new Date(route.departure_time).toLocaleString()}</p>
                <p>Arrival: {new Date(route.arrival_time).toLocaleString()}</p>
                <button
                  onClick={() => onRouteSelect(route)}
                  className="mt-2 bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                >
                  Select
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RouteSearch;


