import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BusForm from '../Bus/BusForm';
import BusList from '../Bus/BusList';
import BookingList from '../Booking/BookingList';
import { fetchBuses, addBus, updateBus, deleteBus } from '../../redux/slices/busSlice';
import { fetchBookings, deleteBooking } from '../../redux/slices/bookingSlice';

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const buses = useSelector((state) => state.buses.buses);
    // const bookings = useSelector((state) => state.bookings.bookings);
    const busesStatus = useSelector((state) => state.buses.status);
    // const bookingsStatus = useSelector((state) => state.bookings.status);

    // useEffect(() => {
    //     if (busesStatus === 'idle') {
    //         dispatch(fetchBuses());
    //     }
    //     if (bookingsStatus === 'idle') {
    //         dispatch(fetchBookings());
    //     }
    // }, [dispatch, busesStatus, bookingsStatus]);
    // 
   

    const handleBusSubmit = (bus) => {
        if (bus.id) {
            dispatch(updateBus(bus));
        } else {
            dispatch(addBus(bus));
        }
    };

    const handleBusDelete = (id) => {
        dispatch(deleteBus(id));
    };

    const handleBookingCancel = (id) => {
        dispatch(deleteBooking(id));
    };

    // if (busesStatus === 'loading' || 'booking' === 'loading') {
    //     return <div>Loading...</div>;
    // }

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <div className="dashboard-section">
                <h2>Manage Buses</h2>
                <BusForm onSubmit={handleBusSubmit} />
                <BusList buses={buses} onDelete={handleBusDelete} onEdit={handleBusSubmit} />
            </div>
            <div className="dashboard-section">
                <h2>Manage Bookings</h2>
                <BookingList bookings={[]} onCancel={handleBookingCancel} />
            </div>
        </div>
    );
};

export default AdminDashboard;