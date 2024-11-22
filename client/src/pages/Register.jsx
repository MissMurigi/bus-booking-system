import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "customer",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/users/register", formData);

      // Show success toast notification
      toast.success("Registration successful! Please log in.", {
        position: "top-center",
        autoClose: 3000, 
      });

      // Clear the form
      setFormData({
        username: "",
        email: "",
        password: "",
        role: "customer",
      });

      // Redirect to the login page after 3 seconds
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      // Show error toast notification
      if (error.response) {
        toast.error(error.response.data.message || "Registration failed.", {
          position: "top-center",
          autoClose: 3000,
        });
      } else {
        toast.error("An unexpected error occurred.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Register</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter your username"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter your password"
            />
          </div>

          {/* Role */}
          <div>
            <label htmlFor="role" className="block font-medium mb-1">
              Role
            </label>
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="customer">Customer</option>
              <option value="driver">Driver</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-medium ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>

      {/* Toast container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default Register;

