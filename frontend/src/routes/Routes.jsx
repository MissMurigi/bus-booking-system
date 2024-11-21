import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Authentication/Login';
import Signup from '../pages/Authentication/Signup';
import AdminDashboard from '../pages/Dashboard/AdminDashboard';
import DriverDashboard from '../pages/Dashboard/DriverDashboard';
import CustomerDashboard from '../pages/Dashboard/CustomerDashboard';
import BookingForm from '../pages/Booking/BookingForm';
import PrivateRoute from './PrivateRoute';
import Home from '../pages/Home/Home';


const AppRoutes = () => (
    <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Private Routes */}
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/driver" element={<DriverDashboard />} />
        <Route path="/dashboard/customer" element={<CustomerDashboard />} />
        <Route path="/booking" element={<BookingForm />} />
        <Route path="/driver-dashboard" element={<DriverDashboard />} />
        
        
        
    </Routes>
);

export default AppRoutes;
