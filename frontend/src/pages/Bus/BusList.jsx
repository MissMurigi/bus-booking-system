import React from 'react';

const BusList = ({ buses, onEdit, onDelete }) => (
    <div>
        <h2>Bus List</h2>
        <ul>
            {buses.map((bus) => (
                <li key={bus.id}>
                    {bus.busName} - Route: {bus.route} - Capacity: {bus.capacity}
                    <button onClick={() => onEdit(bus)}>Edit</button>
                    <button onClick={() => onDelete(bus.id)}>Delete</button>
                </li>
            ))}
        </ul>
    </div>
);

export default BusList;
