import React from 'react';

const BookingList = ({ bookings, onCancel }) => (
    <div>
        <h2>Booking List</h2>
        <ul>
            {bookings.map((booking) => (
                <li key={booking.id}>
                    {booking.customerName} - {booking.busId} - {booking.date}
                    <button onClick={() => onCancel(booking.id)}>Cancel</button>
                </li>
            ))}
        </ul>
    </div>
);

export default BookingList;
