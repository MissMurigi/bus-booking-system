import React, { useState, useEffect } from 'react';

const formStyles = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '400px',
  margin: '0 auto',
  padding: '20px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  backgroundColor: '#ffffff',
};

const inputStyles = {
  marginBottom: '15px',
  padding: '10px',
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

const buttonStyles = {
  padding: '10px 15px',
  fontSize: '16px',
  backgroundColor: '#007bff',
  color: '#ffffff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const disabledButtonStyles = {
  ...buttonStyles,
  backgroundColor: '#cccccc',
  cursor: 'not-allowed',
};

const BusForm = ({ onSubmit, busData,  }) => {
  const [formData, setFormData] = useState(
    busData || {
      driver_id: 1,
      number_of_seats: '',
      cost_per_seat: '',
      route: '',
      status: 'available',
    }
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (busData) {
      setFormData(busData);
    }
  }, [busData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: name === 'number_of_seats' ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.driver_id || !formData.number_of_seats || !formData.cost_per_seat || !formData.route || !formData.status) {
      alert("All fields are required");
      return;
    }

    const submissionData = {
      ...formData,
      number_of_seats: parseInt(formData.number_of_seats, 10),
      cost_per_seat: parseFloat(formData.cost_per_seat),
    };

    setIsSubmitting(true);
    try {
      await onSubmit(submissionData);
      alert(busData ? "Bus updated successfully" : "Bus added successfully");
      if (!busData) {
        setFormData({
          driver_id: 1,
          number_of_seats: '',
          cost_per_seat: '',
          route: '',
          status: 'available',
        });
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyles}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>{busData ? 'Edit Bus' : 'Add Bus'}</h2>
      <input
        type="number"
        name="number_of_seats"
        placeholder="Number of Seats"
        value={formData.number_of_seats}
        onChange={handleChange}
        required
        style={inputStyles}
      />
      <input
        type="number"
        step="0.01"
        name="cost_per_seat"
        placeholder="Cost per Seat"
        value={formData.cost_per_seat}
        onChange={handleChange}
        required
        style={inputStyles}
      />
      <input
        type="text"
        name="route"
        placeholder="Route"
        value={formData.route}
        onChange={handleChange}
        required
        style={inputStyles}
      />
      <select 
        name="status" 
        value={formData.status} 
        onChange={handleChange}
        style={inputStyles}
        required
      >
        <option value="available">Available</option>
        <option value="not_available">Not Available</option>
      </select>
      <button 
        type="submit" 
        disabled={isSubmitting}
        style={isSubmitting ? disabledButtonStyles : buttonStyles}
      >
        {isSubmitting ? 'Submitting...' : (busData ? 'Update Bus' : 'Add Bus')}
      </button>
    </form>
  );
};

export default BusForm;