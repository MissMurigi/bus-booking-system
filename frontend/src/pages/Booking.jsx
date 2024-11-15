import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Booking.css';

const Booking = () => {
  const [seats, setSeats] = useState(Array(15).fill(false));
  const navigate = useNavigate(); 

  const toggleSeat = (index) => {
    const updatedSeats = [...seats];
    updatedSeats[index] = !updatedSeats[index];
    setSeats(updatedSeats);
  };

  const handleConfirm = () => {
    navigate('/payment-method'); 
  };

  return (
    <div className="booking-container">
      <h2>Vehicle Seating Chart</h2>
      <div className="seats-grid">
        {seats.map((isReserved, index) => (
          <div
            key={index}
            className={`seat ${isReserved ? 'reserved' : 'available'}`}
            onClick={() => toggleSeat(index)}
          >
            {index === 0 ? 'Driver' : `Passenger ${index}`}
          </div>
        ))}
      </div>
      <button className="confirm-button" onClick={handleConfirm}>
        Confirm
      </button>
    </div>
  );
};

export default Booking;
