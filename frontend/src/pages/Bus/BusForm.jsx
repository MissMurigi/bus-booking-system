import React, { useState } from 'react';

const BusForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        busName: '',
        route: '',
        capacity: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ busName: '', route: '', capacity: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add/Update Bus</h2>
            <input
                type="text"
                name="busName"
                placeholder="Bus Name"
                value={formData.busName}
                onChange={handleChange}
            />
            <input
                type="text"
                name="route"
                placeholder="Route"
                value={formData.route}
                onChange={handleChange}
            />
            <input
                type="number"
                name="capacity"
                placeholder="Capacity"
                value={formData.capacity}
                onChange={handleChange}
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default BusForm;
