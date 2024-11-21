// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

// const SetPrice = () => {
//   const { busId } = useParams();
//   const [pricePerSeat, setPricePerSeat] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSetPrice = async (e) => {
//     e.preventDefault();
//     setError('');

//     const priceData = { busId, price: pricePerSeat };

//     try {
//       const response = await fetch('http://127.0.0.1:5000/set-price', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(priceData),
//       });
// // 
//       if (response.ok) {
//         navigate('/driverdashboard'); // Redirect to driver dashboard after setting price
//       } else {
//         const data = await response.json();
//         setError(data.message || 'Failed to set price');
//       }
//     } catch (err) {
//       setError('Error while setting the price');
//     }
//   };

//   return (
//     <div>
//       <h2>Set Price per Seat for Bus {busId}</h2>
//       {error && <p className="error">{error}</p>}

//       <form onSubmit={handleSetPrice}>
//         <div>
//           <label>Price per Seat</label>
//           <input
//             type="number"
//             value={pricePerSeat}
//             onChange={(e) => setPricePerSeat(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Set Price</button>
//       </form>
//     </div>
//   );
// };

// export default SetPrice;
