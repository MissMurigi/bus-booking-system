import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDriverBuses } from '../../redux/slices/busSlice';
import BusList from '../Bus/BusList';
import './DriverDashboard.css';

const DriverDashboard = () => {
    const dispatch = useDispatch();
    const { driverBuses, status, error } = useSelector((state) => state.buses);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user && user.id) {
            dispatch(fetchDriverBuses(user.id));
        }
    }, [dispatch, user]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="driver-dashboard">
            <h1 className="dashboard-title">Driver Dashboard</h1>
            <div className="dashboard-section">
                <h2>Your Assigned Buses</h2>
                <BusList buses={driverBuses} />
            </div>
        </div>
    );
};

export default DriverDashboard;