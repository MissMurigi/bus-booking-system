import React, { useState } from 'react';
import RouteSearch from './RouteSearch';
import SeatSelection from './SeatSelection';
import Payment from './Payment';
import axios from 'axios';

const BookingProcess = () => {
  const [step, setStep] = useState(1);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [booking, setBooking] = useState(null);

  const handleRouteSelect = (route) => {
    setSelectedRoute(route);
    setStep(2);
  };

  const handleSeatSelect = async (seat) => {
    setSelectedSeat(seat);
    try {
      const response = await axios.post('/booking', {
        schedule_id: selectedRoute.schedule_id,
        seat_id: seat.seat_id
      });
      setBooking(response.data);
      setStep(3);
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking. Please try again.');
    }
  };

  const handlePaymentComplete = (payment) => {
    alert('Booking confirmed! Your booking ID is: ' + booking.booking_id);
    // Reset the booking process or redirect to a confirmation page
    setStep(1);
    setSelectedRoute(null);
    setSelectedSeat(null);
    setBooking(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {step === 1 && <RouteSearch onRouteSelect={handleRouteSelect} />}
      {step === 2 && selectedRoute && (
        <SeatSelection 
          bus={selectedRoute.bus} 
          onSeatSelect={handleSeatSelect} 
        />
      )}
      {step === 3 && booking && (
        <Payment booking={booking} onPaymentComplete={handlePaymentComplete} />
      )}
    </div>
  );
};

export default BookingProcess;


