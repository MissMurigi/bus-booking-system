import React, { useState } from 'react';
import { updateBooking } from '../api/bookingApi';

const BookingItem = ({ booking, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBooking, setEditedBooking] = useState(booking);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await updateBooking(booking.booking_id, editedBooking);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const handleChange = (e) => {
    setEditedBooking({
      ...editedBooking,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      {isEditing ? (
        <>
          <input
            type="number"
            name="number_of_seats_booked"
            value={editedBooking.number_of_seats_booked}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded"
          />
          <button 
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <p className="mb-2">Seats: {booking.number_of_seats_booked}</p>
          <p className="mb-2">Total Price: ${booking.total_price}</p>
          <p className="mb-2">Status: {booking.booking_status}</p>
          <div className="flex justify-between">
            <button 
              onClick={handleEdit}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button 
              onClick={() => onDelete(booking.booking_id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BookingItem;


