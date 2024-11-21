import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../config/api'; // Importing the API base URL

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'customer',
    });
    const [error, setError] = useState(null); // For error handling
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}/users/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                // Handle server errors
                const errorData = await response.json();
                throw new Error(errorData.message || 'Signup failed');
            }

            alert('Signup successful! Please log in.');
            navigate('/'); // Redirect to Login page
        } catch (err) {
            console.error('Signup error:', err);
            setError(err.message); // Set error message for display
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Signup</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
            />
            <select name="role" value={formData.role} onChange={handleChange}>
                <option value="customer">Customer</option>
                <option value="driver">Driver</option>
                <option value="admin">Admin</option>
            </select>
            <button type="submit">Signup</button>
        </form>
    );
};

export default Signup;
