import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  // Check login status and role on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole'); // Example: 'admin', 'customer', 'driver'
    if (token) {
      setIsLoggedIn(true);
      setRole(userRole);
    } else {
      setIsLoggedIn(false); // Ensure logged-out state if token is absent
      setRole(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    setRole(null);
    navigate('/login');
  };

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle('dark');
  };

  // Define links dynamically based on authentication state and role
  const links = [
    { path: '/', label: 'Home', active: !isLoggedIn },
    ...(!isLoggedIn
      ? [{ path: '/login', label: 'Login', active: false }]
      : role === 'admin'
      ? [{ path: '/admin-dashboard', label: 'Admin Dashboard', active: true }]
      : role === 'customer'
      ? [{ path: '/customer-dashboard', label: 'Customer Dashboard', active: true }]
      : role === 'driver'
      ? [{ path: '/driver-dashboard', label: 'Driver Dashboard', active: true }]
      : []),
  ];

  return (
    <nav className="navbar">
      <ul className="navbar-links">
        {links.map((link) => (
          <li key={link.path}>
            <Link to={link.path} className={`navbar-link ${link.active ? 'active' : ''}`}>
              {link.label}
            </Link>
          </li>
        ))}
        {isLoggedIn && (
          <li>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </li>
        )}
      </ul>
      <button onClick={toggleTheme} className="theme-toggle-button">
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>
    </nav>
  );
}
