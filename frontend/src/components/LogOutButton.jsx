// Example of logout action
import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Clear user state
    navigate('/login'); // Redirect to login page
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}

export default Logout;
