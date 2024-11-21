import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBus, FaRoute, FaTicketAlt, FaUserCircle, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import "./Navbar.css"

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">BookingWeb</Link>
      </div>
      <div className="navbar-menu">
        <Link to="/" className="navbar-item">Home</Link>
        <div className="navbar-item has-dropdown">
          <button
            className="navbar-link"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <FaBus /> Manage Buses
          </button>
          {showDropdown && (
            <div className="navbar-dropdown">
              <Link to="/buses/register" className="navbar-item">Register Buses</Link>
              <Link to="/buses/schedule" className="navbar-item">Schedule Buses</Link>
              <Link to="/buses/manage" className="navbar-item">Manage Buses</Link>
            </div>
          )}
        </div>
        <Link to="/routes" className="navbar-item"><FaRoute /> Routes</Link>
        <Link to="/bookings" className="navbar-item">Bookings</Link>
        <Link to="/tickets" className="navbar-item"><FaTicketAlt /> Tickets</Link>
      </div>
      <div className="navbar-end">
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === "light" ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
        {isLoggedIn ? (
          <button className="navbar-item logout-button" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        ) : (
          <Link to="/login" className="navbar-item login-button">
            <FaSignInAlt /> Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
