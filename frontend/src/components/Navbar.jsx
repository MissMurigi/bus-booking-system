import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        {isAuthenticated ? (
          <>
            {user.role === 'admin' && <li><Link to="/admindashboard">Admin Dashboard</Link></li>}
            {user.role === 'driver' && <li><Link to="/driverdashboard">Driver Dashboard</Link></li>}
            {user.role === 'customer' && <li><Link to="/customerdashboard">Customer Dashboard</Link></li>}
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
