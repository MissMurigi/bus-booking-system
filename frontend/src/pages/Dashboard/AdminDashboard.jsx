import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BusForm from '../Bus/BusForm';
import BusList from '../Bus/BusList';
import BookingList from '../Booking/BookingList';
import { fetchBuses, addBus, updateBus, deleteBus } from '../../redux/slices/busSlice';
import { fetchBookings, deleteBooking } from '../../redux/slices/bookingSlice';

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const buses = useSelector((state) => state.bus.buses);
    const bookings = useSelector((state) => state.booking.bookings);

    useEffect(() => {
        dispatch(fetchBuses());
        dispatch(fetchBookings());
    }, [dispatch]);

    const handleBusSubmit = (bus) => {
        if (bus.id) dispatch(updateBus(bus));
        else dispatch(addBus(bus));
    };

    const handleBusDelete = (id) => dispatch(deleteBus(id));
    const handleBookingCancel = (id) => dispatch(deleteBooking(id));

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <BusForm onSubmit={handleBusSubmit} />
            <BusList buses={buses} onDelete={handleBusDelete} onEdit={(bus) => {}} />
            <BookingList bookings={bookings} onCancel={handleBookingCancel} />
        </div>
    );
};

export default AdminDashboard;
