import React from "react";
import { FaPlane, FaSearch, FaBus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  // Define role-based links
  const defaultLinks = [
    { name: "Home", path: "/" },
    { name: "Buses", path: "/buses" },
    { name: "Bookings", path: "/bookings" },
    { name: "Routes", path: "/routes" },
    { name: "Tickets", path: "/tickets" },
  ];

  const driverLinks = [
    { name: "Schedule Buses", path: "/driver/schedule" },
    { name: "Manage Buses", path: "/driver/manage-buses" },
  ];

  const customerLinks = [
    { name: "Book Travel", path: "/customer/book-travel" },
    { name: "Manage Bookings", path: "/customer/manage-bookings" },
    { name: "View Routes", path: "/customer/view-routes" },
  ];

  const adminLinks = [
    { name: "Buses & Schedules", path: "/admin/buses-schedules" },
    { name: "Manage Users", path: "/admin/users" },
  ];

  // Determine the links to display
  const linksToDisplay = !isAuthenticated
    ? defaultLinks
    : user.role === "driver"
    ? driverLinks
    : user.role === "customer"
    ? customerLinks
    : user.role === "admin"
    ? adminLinks
    : defaultLinks;

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <FaBus className="text-blue-500 text-xl" />
          <Link to="/" className="text-lg font-bold text-gray-800">
            RoutEase
          </Link>
        </div>

        {/* Links */}
        <div className="hidden md:flex space-x-6">
          {linksToDisplay.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-gray-700 hover:text-blue-500 font-medium transition"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Buttons or User Profile */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated && user ? (
            <>
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                {user.username[0].toUpperCase()}
              </div>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded-md font-medium hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md font-medium hover:bg-blue-50 transition"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition"
              >
                Sign In
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:text-gray-800 transition">
            <FaSearch className="text-lg" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-800 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

