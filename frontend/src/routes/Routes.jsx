import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Authentication/Login';
import Signup from '../pages/Authentication/Signup';
import AdminDashboard from '../pages/Dashboard/AdminDashboard';
import DriverDashboard from '../pages/Dashboard/DriverDashboard';
import CustomerDashboard from '../pages/Dashboard/CustomerDashboard';
import BookingForm from '../pages/Booking/BookingForm';
import PrivateRoute from './PrivateRoute';

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard/admin" element={<PrivateRoute component={AdminDashboard} />} />
        <Route path="/dashboard/driver" element={<PrivateRoute component={DriverDashboard} />} />
        <Route path="/dashboard/customer" element={<PrivateRoute component={CustomerDashboard} />} />
        <Route path="/booking" element={<PrivateRoute component={BookingForm} />} />
    </Routes>
);

export default AppRoutes;
