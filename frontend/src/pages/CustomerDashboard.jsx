import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Booking.css';
import { FaCheckCircle, FaTimesCircle, FaCircle } from 'react-icons/fa';
import Navbar from '../components/Navbar';

export default function CustomerDashboard() {
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [travelDate, setTravelDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
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

    fetchBuses();
  }, []);

  const handleBusSelect = (bus) => {
    setSelectedBus(bus);
    initializeSeats(bus.total_seats, bus.bookings);
  };

  const initializeSeats = (totalSeats, bookings) => {
    const initialSeats = Array(totalSeats).fill('available');
    bookings?.forEach((booking) => {
      initialSeats[booking.seat_number - 1] = 'booked';
    });
    setSeats(initialSeats);
    setSelectedSeats([]);
  };

  const toggleSeat = (index) => {
    if (seats[index] === 'booked') return;
    const updatedSeats = [...seats];
    if (updatedSeats[index] === 'selected') {
      updatedSeats[index] = 'available';
      setSelectedSeats(selectedSeats.filter((seat) => seat !== index));
    } else {
      updatedSeats[index] = 'selected';
      setSelectedSeats([...selectedSeats, index]);
    }
    setSeats(updatedSeats);
  };

  const handleConfirm = async () => {
    if (!travelDate) {
      alert('Please select a travel date.');
      return;
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Proceed to payments.');
      navigate('/payment-method');
      return;
    }

    try {
      for (const seat of selectedSeats) {
        const response = await fetch('http://127.0.0.1:5001/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            bus_id: selectedBus.id,
            seat_number: seat + 1,
            travel_date: travelDate,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Failed to book seat ${seat + 1}`);
        }
      }

      alert('Booking confirmed!');
      navigate('/payment-method', {
        state: { selectedSeats, travelDate, bus: selectedBus },
      });
    } catch (error) {
      console.error('Error confirming booking:', error);
      alert(error.message || 'Failed to confirm booking. Please try again.');
    }
  };

  const totalFare = selectedSeats.length * (selectedBus ? selectedBus.cost_per_seat : 0);

  return (
    <div className="booking-container">
      <div className="bus-selection">
      

        <h2>Select a Bus</h2>
        <div className="bus-list">
          {buses.map((bus) => (
            <div
              key={bus.id}
              className={`bus-card ${selectedBus?.id === bus.id ? 'selected' : ''}`}
              onClick={() => handleBusSelect(bus)}
            >
              <img src={bus.image} alt={bus.name} className="bus-image" />
              <h3>{bus.name}</h3>
              <p>{bus.description}</p>
              <p>
                <strong>Route:</strong> {bus.route}
              </p>
              <p>
                <strong>Time:</strong> {bus.time_of_travel}
              </p>
              <p>
                <strong>Seats Available:</strong> {bus.available_seats}/{bus.total_seats}
              </p>
              <p>
                <strong>Price per Seat:</strong> {bus.cost_per_seat.toLocaleString()} KES
              </p>
              <p>
                <strong>Rating:</strong> ⭐ {bus.rating}
              </p>
            </div>
          ))}
        </div>
      </div>

      {selectedBus && (
        <>
          <h2>Choose a Seat</h2>
          <div className="seats-grid">
            {seats.map((status, index) => (
              <div
                key={index}
                className={`seat ${status}`}
                onClick={() => toggleSeat(index)}
              >
                {status === 'booked' ? (
                  <FaTimesCircle />
                ) : status === 'selected' ? (
                  <FaCheckCircle />
                ) : (
                  <FaCircle />
                )}
              </div>
            ))}
          </div>

          <div className="booking-details">
            <label htmlFor="travel-date">Travel Date:</label>
            <input
              type="date"
              id="travel-date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              required
            />

            <div className="selected-info">
              <p>
                <strong>Selected Seats:</strong>{' '}
                {selectedSeats.map((seat) => seat + 1).join(', ') || 'None'}
              </p>
              <p>
                <strong>Total Fare:</strong> {totalFare.toLocaleString()} KES
              </p>
            </div>
          </div>

          <button className="confirm-button" onClick={handleConfirm}>
            Confirm Booking
          </button>
        </>
      )}
    </div>
  );
}
