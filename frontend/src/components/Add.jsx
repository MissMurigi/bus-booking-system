import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddBus = () => {
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [capacity, setCapacity] = useState('');
  const [isAvailable, setIsAvailable] = useState(true); // Boolean for availability
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAddBus = async (e) => {
    e.preventDefault();
    setError('');
    
    const busData = { name, details, capacity, isAvailable };

    try {
      const response = await fetch('http://127.0.0.1:5000/buses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(busData),
      });

      if (response.ok) {
        navigate('/driverdashboard'); // Redirect to driver dashboard
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to add bus');
      }
    } catch (err) {
      setError('Error while adding the bus');
    }
  };

  return (
    <div>
      <h2>Add New Bus</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleAddBus}>
        <div>
          <label>Bus Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Details</label>
          <input
            type="text"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Capacity</label>
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Available</label>
          <input
            type="checkbox"
            checked={isAvailable}
            onChange={(e) => setIsAvailable(e.target.checked)}
          />
        </div>
        <button type="submit">Add Bus</button>
      </form>
    </div>
  );
};

export default AddBus;
