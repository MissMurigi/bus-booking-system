import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#007BFF', color: 'white' }}>
        <div>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', marginRight: '1rem' }}>Home</Link>
            <Link to="/dashboard/customer" style={{ color: 'white', textDecoration: 'none', marginRight: '1rem' }}>Dashboard</Link>
            <Link to="/booking" style={{ color: 'white', textDecoration: 'none' }}>Bookings</Link>
        </div>
        <button style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }} onClick={() => localStorage.clear()}>
            Logout
        </button>
    </nav>
);

export default Navbar;
