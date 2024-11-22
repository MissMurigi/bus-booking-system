import React from 'react';
import BookingProcess from '../components/BookingProcess';

function Booking() {
  return (
    <div className="App">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Bus Booking System</h1>
      </header>
      <main>
        <BookingProcess />
      </main>
    </div>
  );
}

export default Booking;

