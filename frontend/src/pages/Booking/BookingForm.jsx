import React, { useState } from 'react';

const BookingForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        customerName: '',
        busId: '',
        date: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ customerName: '', busId: '', date: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>New Booking</h2>
            <input
                type="text"
                name="customerName"
                placeholder="Customer Name"
                value={formData.customerName}
                onChange={handleChange}
            />
            <input
                type="text"
                name="busId"
                placeholder="Bus ID"
                value={formData.busId}
                onChange={handleChange}
            />
            <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
            />
            <button type="submit">Book</button>
        </form>
    );
};

export default BookingForm;
