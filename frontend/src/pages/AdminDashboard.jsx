import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import './AdminDashboard'
function AdminDashboard() {
  // States to hold users, drivers, and buses data
  const [users, setUsers] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [buses, setBuses] = useState([]);

  // States for loading and error handling
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data when the component mounts
  useEffect(() => {
    // Fetch users from /users API
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5001/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data.users || []);  // Ensure we set the users data
      } catch (error) {
        setError(error.message);
      }
    };

    // Fetch buses from /buses API
    const fetchBuses = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5001/buses');
        if (!response.ok) {
          throw new Error('Failed to fetch buses');
        }
        const data = await response.json();
        setBuses(data.buses || []);

        // Assuming each bus has a 'driver' field, we can extract the drivers
        const extractedDrivers = data.buses.map(bus => bus.driver).filter(driver => driver !== undefined);
        setDrivers(extractedDrivers);
      } catch (error) {
        setError(error.message);
      }
    };

    // Fetch all data
    Promise.all([fetchUsers(), fetchBuses()])
      .finally(() => setLoading(false)); // Set loading to false once data is fetched
  }, []);

  // Add bus logic (to be implemented)
  const addBus = async () => {
    console.log('Add bus');
  };

  // Remove bus logic
  const removeBus = async (busId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5001/buses/${busId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setBuses(buses.filter(bus => bus.id !== busId));
      } else {
        throw new Error('Failed to remove bus');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // Remove driver logic
  const removeDriver = async (driverId) => {
    try {
      const busToUpdate = buses.find(bus => bus.driver.id === driverId);
      if (!busToUpdate) {
        setError('Driver not found in any bus');
        return;
      }

      busToUpdate.driver = null;

      const response = await fetch(`http://127.0.0.1:5001/buses/${busToUpdate.id}`, {
        method: 'PUT',
        body: JSON.stringify(busToUpdate),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setBuses(buses.map(bus => (bus.id === busToUpdate.id ? busToUpdate : bus)));
      } else {
        throw new Error('Failed to remove driver');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // Activate or deactivate user logic
  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      const updatedStatus = currentStatus === 'active' ? 'inactive' : 'active'; // Toggle between active and inactive

      const response = await fetch(`http://127.0.0.1:5001/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify({ status: updatedStatus }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Update user status in the local state
        setUsers(users.map(user => (user.id === userId ? { ...user, status: updatedStatus } : user)));
        alert(`User ${updatedStatus === 'active' ? 'activated' : 'deactivated'} successfully!`);
      } else {
        throw new Error('Failed to update user status');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {/* Error handling */}
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <section>
            <h2>Active Users</h2>
            <ul>
              {users.map(user => (
                <li key={user.id}>
                  <strong>Username:</strong> {user.username} <br />
                  <strong>Email:</strong> {user.email} <br />
                  <strong>Role:</strong> {user.role} <br />
                  <strong>Status:</strong> {user.status} <br />
                  <button onClick={() => toggleUserStatus(user.id, user.status)}>
                    {user.status === 'active' ? 'Deactivate' : 'Activate'} User
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Drivers</h2>
            <ul>
              {drivers.map(driver => (
                <li key={driver.id}>
                  {driver.name}{' '}
                  <button onClick={() => removeDriver(driver.id)}>Remove Driver</button>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Available Buses</h2>
            <ul>
              {buses.map(bus => (
                <li key={bus.id}>
                  {bus.name} - Available Seats: {bus.availableSeats}{' '}
                  <button onClick={() => removeBus(bus.id)}>Remove Bus</button>
                </li>
              ))}
            </ul>
            <button onClick={addBus}>Add Bus</button>
          </section>
        </>
      )}
    </div>
  );
}

export default AdminDashboard;
