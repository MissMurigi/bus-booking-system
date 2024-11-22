import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import './AdminDashboard.css';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5001/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data.users || []);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchBuses = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5001/buses');
        if (!response.ok) {
          throw new Error('Failed to fetch buses');
        }
        const data = await response.json();
        setBuses(data.buses || []);
        const extractedDrivers = data.buses.map(bus => bus.driver).filter(driver => driver !== undefined);
        setDrivers(extractedDrivers);
      } catch (error) {
        setError(error.message);
      }
    };

    Promise.all([fetchUsers(), fetchBuses()]).finally(() => setLoading(false));
  }, []);

  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      const updatedStatus = currentStatus === 'active' ? 'inactive' : 'active';

      const response = await fetch(`http://127.0.0.1:5001/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify({ status: updatedStatus }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
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
    <div className="dashboard-container">
      <Navbar />
      <h1>Admin Dashboard</h1>
      {error && <div className="error-message">Error: {error}</div>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <section className="card-section">
            <h2>Active Users</h2>
            <div className="card-grid">
              {users.map(user => (
                <div key={user.id} className="card">
                  <p><strong>Username:</strong> {user.username}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Role:</strong> {user.role}</p>
                  <p><strong>Status:</strong> {user.status}</p>
                  <button className="card-button" onClick={() => toggleUserStatus(user.id, user.status)}>
                    {user.status === 'active' ? 'Deactivate' : 'Activate'} User
                  </button>
                </div>
              ))}
            </div>
          </section>
          <section className="card-section">
            <h2>Available Buses</h2>
            <div className="card-grid">
              {buses.map(bus => (
                <div key={bus.id} className="card">
                  <p><strong>Name:</strong> {bus.name}</p>
                  <p><strong>Available Seats:</strong> {bus.availableSeats}</p>
                  <button className="card-button" onClick={() => console.log(`Remove bus ${bus.id}`)}>Remove Bus</button>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default AdminDashboard;
