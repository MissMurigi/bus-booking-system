import React, { useState, useEffect } from 'react';
import './DriverDashboard.css';
import Navbra from '../components/Navbar';

export default function DriverDashboard() {
  const [buses, setBuses] = useState([]);
  const [newBus, setNewBus] = useState({
    image: '',
    name: '',
    number_plate: '',
    rating: 0,
    description: '',
    total_seats: 0,
    cost_per_seat: 0,
    route: '',
    time_of_travel: '',
  });

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5001/buses');
      if (!response.ok) throw new Error('Failed to fetch buses');
      const data = await response.json();
      setBuses(data.buses);
    } catch (error) {
      console.error('Error fetching buses:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewBus({ ...newBus, [e.target.name]: e.target.value });
  };

  const handleAddBus = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5001/buses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBus),
      });
      if (response.ok) {
        fetchBuses();
        setNewBus({
          image: '',
          name: '',
          number_plate: '',
          rating: 0,
          description: '',
          total_seats: 0,
          cost_per_seat: 0,
          route: '',
          time_of_travel: '',
        });
        alert('Bus added successfully!');
      } else {
        alert('Failed to add bus');
      }
    } catch (error) {
      console.error('Error adding bus:', error);
    }
  };

  const handleDeleteBus = async (busId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5001/buses/${busId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchBuses();
        alert('Bus deleted successfully!');
      } else {
        alert('Failed to delete bus');
      }
    } catch (error) {
      console.error('Error deleting bus:', error);
    }
  };

  return (
    <div className="driver-dashboard">
      <h2>Driver Dashboard</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleAddBus(); }}>
        <input 
          type="text" 
          name="image" 
          placeholder="Image URL" 
          value={newBus.image} 
          onChange={handleInputChange} 
          required 
        />
        <input 
          type="text" 
          name="name" 
          placeholder="Name" 
          value={newBus.name} 
          onChange={handleInputChange} 
          required 
        />
        <input 
          type="text" 
          name="number_plate" 
          placeholder="Number Plate" 
          value={newBus.number_plate} 
          onChange={handleInputChange} 
          required 
        />
        <input 
          type="number" 
          name="rating" 
          placeholder="Rating" 
          value={newBus.rating} 
          onChange={handleInputChange} 
          required 
        />
        <textarea 
          name="description" 
          placeholder="Description" 
          value={newBus.description} 
          onChange={handleInputChange} 
          required 
        />
        <input 
          type="number" 
          name="total_seats" 
          placeholder="Total Seats" 
          value={newBus.total_seats} 
          onChange={handleInputChange} 
          required 
        />
        <input 
          type="number" 
          name="cost_per_seat" 
          placeholder="Cost per Seat" 
          value={newBus.cost_per_seat} 
          onChange={handleInputChange} 
          required 
        />
        <input 
          type="text" 
          name="route" 
          placeholder="Route" 
          value={newBus.route} 
          onChange={handleInputChange} 
          required 
        />
        <input 
          type="text" 
          name="time_of_travel" 
          placeholder="Time of Travel" 
          value={newBus.time_of_travel} 
          onChange={handleInputChange} 
          required 
        />
        <button type="submit">Add Bus</button>
      </form>
      <h2> Your Bus Fleet</h2>
      <div className="bus-list">
        {buses.map((bus) => (
          <div key={bus.id} className="bus-card">
            <h3>{bus.name}</h3>
            <p>Seats: {bus.available_seats}/{bus.total_seats}</p>
            <p>Route: {bus.route}</p>
            <p>Time: {bus.time_of_travel}</p>
            <button onClick={() => handleDeleteBus(bus.id)}>Delete</button>
          </div>
        ))}
      </div>

    </div>
  );
}
