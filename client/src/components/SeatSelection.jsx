import React, { useState } from 'react';

const SeatSelection = ({ bus, onSeatSelect }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const renderSeats = () => {
    if (!bus || !bus.number_of_seats) {
      return <p>No seats available</p>;
    }

    const seats = [];
    for (let i = 1; i <= bus.number_of_seats; i++) {
      const isSelected = selectedSeats.includes(i);
      seats.push(
        <button
          key={i}
          onClick={() => toggleSeat(i)}
          className={`w-10 h-10 m-1 rounded-md ${
            isSelected ? 'bg-green-500 text-white' : 'bg-gray-200'
          }`}
        >
          {i}
        </button>
      );
    }
    return seats;
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Select Seats</h2>
      <div className="grid grid-cols-4 gap-2 mb-4">{renderSeats()}</div>
      <p className="mb-4">Selected seats: {selectedSeats.join(', ')}</p>
      <button
        onClick={() => onSeatSelect(selectedSeats)}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        disabled={selectedSeats.length === 0}
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default SeatSelection;


