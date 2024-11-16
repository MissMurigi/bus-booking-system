// Booking.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import busImage from '../assets/bus3.png'; // Ensure this path matches your folder structure
import './Booking.css';
import { FaCheckCircle, FaTimesCircle, FaCircle } from 'react-icons/fa'; // For seat icons

const Booking = () => {
  const [seats, setSeats] = useState(Array(40).fill('available')); // Initial states: 'available'
  const [selectedSeats, setSelectedSeats] = useState([]);
  const seatPrice = 750;
  const navigate = useNavigate();

  // Dummy data for booked seats
  const bookedSeats = [2, 5, 10, 15, 20];

  useEffect(() => {
    const updatedSeats = [...seats];
    bookedSeats.forEach((seatIndex) => {
      updatedSeats[seatIndex] = 'booked';
    });
    updatedSeats[0] = 'reserved'; // Driver seat
    setSeats(updatedSeats);
  }, []);

  const toggleSeat = (index) => {
    if (seats[index] === 'booked' || index === 0) return; // Ignore clicks on booked or driver seat
    const updatedSeats = [...seats];
    if (updatedSeats[index] === 'selected') {
      updatedSeats[index] = 'available';
      setSelectedSeats(selectedSeats.filter(seat => seat !== index));
    } else {
      updatedSeats[index] = 'selected';
      setSelectedSeats([...selectedSeats, index]);
    }
    setSeats(updatedSeats);
  };

  const handleConfirm = () => {
    navigate('/payment-method');
  };

  const totalFare = selectedSeats.length * seatPrice;

  return (
    <div className="booking-container">
      {/* Bus Information Section */}
      <div className="bus-info">
        <img src={busImage} alt="Bus" className="bus-image" />
        <div className="bus-details">
          <h3>Luxury Bus</h3>
          <p className="number-plate">(ABC-1234)</p>
          <p className="rating">⭐ 4.5</p>
          <p className="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quaerat, quod.
          </p>
        </div>
      </div>

      {/* Destination Information */}
      <div className="destination-info">
        <p><strong>From:</strong> Location1</p>
        <p><strong>To:</strong> Location5</p>
        <p><strong>Bus Leaving At:</strong> 04:00 AM</p>
      </div>

      <h2>Choose a Seat</h2>

      {/* Seat Selection Grid */}
      <div className="seats-grid">
        {seats.map((status, index) => (
          <div
            key={index}
            className={`seat ${status}`}
            onClick={() => toggleSeat(index)}
          >
            {/* Display icon based on seat status */}
            {status === 'reserved' ? '🚩' :
              status === 'booked' ? <FaTimesCircle /> :
              status === 'selected' ? <FaCheckCircle /> :
              <FaCircle />
            }
          </div>
        ))}
      </div>

      {/* Selected Seats and Fare Info */}
      <div className="selected-info">
        <p><strong>Selected Seats:</strong> {selectedSeats.join(', ') || 'None'}</p>
        <p><strong>Total Fare Price:</strong> Rs. {totalFare} (Including all taxes)</p>
      </div>

      <button className="confirm-button" onClick={handleConfirm}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Booking;
