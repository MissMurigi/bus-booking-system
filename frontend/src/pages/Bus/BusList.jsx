// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchBuses, deleteBus } from '../../redux/slices/busSlice';

// const BusList = ({ onEdit }) => {
//     const dispatch = useDispatch();
//     const { buses, loading, error } = useSelector((state) => state.bus);

//     useEffect(() => {
//         dispatch(fetchBuses());
//     }, [dispatch]);

//     const handleDelete = (busId) => {
//         dispatch(deleteBus(busId))
//             .unwrap()
//             .then(() => {
//                 console.log(`Bus with ID ${busId} deleted successfully.`);
//             })
//             .catch((err) => {
//                 console.error(`Failed to delete bus with ID ${busId}:`, err);
//                 alert('An error occurred while deleting the bus. Please try again.');
//             });
//     };

//     return (
//         <div>
//             <h2>Bus List</h2>
//             {loading && <p>Loading buses, please wait...</p>}
//             {error && <p style={{ color: 'red' }}>Error: {error}</p>}
//             {buses.length === 0 && !loading && <p>No buses available.</p>}
//             <ul>
//                 {buses.map((bus) => (
//                     <li key={bus.bus_id}>
//                         <div>
//                             <strong>Route:</strong> {bus.route} <br />
//                             <strong>Seats:</strong> {bus.number_of_seats} <br />
//                             <strong>Status:</strong> {bus.status} <br />
//                         </div>
//                         <button onClick={() => onEdit(bus)}>Edit</button>
//                         <button onClick={() => handleDelete(bus.bus_id)}>Delete</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default BusList;
// 

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBuses, deleteBus } from '../../redux/slices/busSlice';

const BusList = ({ buses, onDelete, onEdit }) => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.buses);

    useEffect(() => {
        dispatch(fetchBuses());
    }, [dispatch]);

    const handleDelete = (busId) => {
        dispatch(deleteBus(busId))
            .unwrap()
            .then(() => {
                console.log(`Bus with ID ${busId} deleted successfully.`);
            })
            .catch((err) => {
                console.error(`Failed to delete bus with ID ${busId}:`, err);
                alert('An error occurred while deleting the bus. Please try again.');
            });
    };

    return (
        <div>
            <h2>Bus List</h2>
            {loading && <p>Loading buses, please wait...</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {buses.length === 0 && !loading && <p>No buses available.</p>}
            <ul>
                {buses.map((bus) => (
                    <li key={bus.bus_id}>
                        <div>
                            <strong>Route:</strong> {bus.route} <br />
                            <strong>Seats:</strong> {bus.number_of_seats} <br />
                            <strong>Status:</strong> {bus.status} <br />
                        </div>
                        <button onClick={() => onEdit(bus)}>Edit</button>
                        <button onClick={() => handleDelete(bus.bus_id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BusList;
