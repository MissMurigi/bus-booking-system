import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthStore } from "../store/authStore";

const VALID_ROLES = ["admin", "customer", "driver"];

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Import navigate
  const login = useAuthStore((state) => state.login);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/users/login", formData);
      const { access_token, message } = response.data;

      toast.success(message, {
        position: "top-center",
        autoClose: 2000,
      });

      // Save token in local storage
      localStorage.setItem("access_token", access_token);

      // Login user
      login(formData.username, formData.role);

      // Navigate to the home page
      navigate("/");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Login failed.", {
          position: "top-center",
        });
      } else {
        toast.error("An unexpected error occurred.", {
          position: "top-center",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              <option value="">Select a role</option>
              {VALID_ROLES.map((role) => (
                <option key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-medium ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;

