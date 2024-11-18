import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDriverBuses } from '../../redux/slices/busSlice';

const DriverDashboard = () => {
    const dispatch = useDispatch();
    const driverId = localStorage.getItem('driverId'); // Assume driver's ID is stored in localStorage
    const driverBuses = useSelector((state) => state.bus.driverBuses);

    useEffect(() => {
        if (driverId) {
            dispatch(fetchDriverBuses(driverId));
        }
    }, [dispatch, driverId]);

    return (
        <div>
            <h1>Driver Dashboard</h1>
            <h2>Assigned Buses</h2>
            <ul>
                {driverBuses.map((bus) => (
                    <li key={bus.id}>
                        {bus.busName} - Route: {bus.route} - Capacity: {bus.capacity}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DriverDashboard;
