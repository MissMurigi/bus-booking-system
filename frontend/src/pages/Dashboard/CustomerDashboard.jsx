import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BookingForm from '../Booking/BookingForm';
import BookingList from '../Booking/BookingList';
import { fetchBookings, addBooking, deleteBooking } from '../../redux/slices/bookingSlice';

const CustomerDashboard = () => {
    const dispatch = useDispatch();
    const bookings = useSelector((state) => state.booking.bookings);

    useEffect(() => {
        dispatch(fetchBookings());
    }, [dispatch]);

    const handleBookingSubmit = (booking) => dispatch(addBooking(booking));
    const handleBookingCancel = (id) => dispatch(deleteBooking(id));

    return (
        <div>
            <h1>Customer Dashboard</h1>
            <BookingForm onSubmit={handleBookingSubmit} />
            <BookingList bookings={bookings} onCancel={handleBookingCancel} />
        </div>
    );
};

export default CustomerDashboard;
