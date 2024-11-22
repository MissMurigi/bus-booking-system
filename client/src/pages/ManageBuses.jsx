import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

const DriverDashboard = () => {
  const [buses, setBuses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBus, setCurrentBus] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchBuses();
  }, []);
  
  console.log(buses);

  const fetchBuses = async () => {
    try {
      const response = await axios.get('/buses');
      setBuses(response.data);
    } catch (error) {
      toast.error('Failed to fetch buses');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const busData = Object.fromEntries(formData.entries());

    try {
      if (currentBus) {
        await axios.put(`/buses/${currentBus.bus_id}`, busData);
        toast.success('Bus updated successfully');
      } else {
          await axios.post('/buses', { ...busData, driver_id: 8 });
        toast.success('Bus added successfully');
      }
      setIsModalOpen(false);
      fetchBuses();
    } catch (error) {
      toast.error('Failed to save bus');
    }
  };

  const handleDelete = async (busId) => {
    if (window.confirm('Are you sure you want to delete this bus?')) {
      try {
        await axios.delete(`/buses/${busId}`);
        toast.success('Bus deleted successfully');
        fetchBuses();
      } catch (error) {
        toast.error('Failed to delete bus');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Driver Dashboard</h1>
      <button
        onClick={() => {
          setCurrentBus(null);
          setIsModalOpen(true);
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 flex items-center"
      >
        <FiPlus className="mr-2" /> Add New Bus
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {buses.map((bus) => (
          <div key={bus.bus_id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">Bus {bus.bus_id}</h2>
            <p>Seats: {bus.number_of_seats}</p>
            <p>Price per seat: Ksh. {bus.cost_per_seat}</p>
            <p>Route: {bus.route}</p>
            <p className={`font-semibold ${bus.status === 'available' ? 'text-green-600' : 'text-red-600'}`}>
              {bus.status}
            </p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => {
                  setCurrentBus(bus);
                  setIsModalOpen(true);
                }}
                className="text-blue-500 hover:text-blue-700"
              >
                <FiEdit2 size={20} />
              </button>
              <button onClick={() => handleDelete(bus.bus_id)} className="text-red-500 hover:text-red-700">
                <FiTrash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">{currentBus ? 'Edit Bus' : 'Add New Bus'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="number_of_seats" className="block text-sm font-medium text-gray-700">
                  Number of Seats
                </label>
                <input
                  type="number"
                  id="number_of_seats"
                  name="number_of_seats"
                  defaultValue={currentBus?.number_of_seats}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="cost_per_seat" className="block text-sm font-medium text-gray-700">
                  Cost per Seat
                </label>
                <input
                  type="number"
                  id="cost_per_seat"
                  name="cost_per_seat"
                  defaultValue={currentBus?.cost_per_seat}
                  step="0.01"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="route" className="block text-sm font-medium text-gray-700">
                  Route
                </label>
                <input
                  type="text"
                  id="route"
                  name="route"
                  defaultValue={currentBus?.route}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  defaultValue={currentBus?.status || 'available'}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                >
                  <option value="available">Available</option>
                  <option value="not_available">Not Available</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {currentBus ? 'Update' : 'Add'} Bus
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverDashboard;

