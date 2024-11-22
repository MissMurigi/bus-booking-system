import React from 'react';
import { FaBus, FaRoute, FaMoneyBillWave, FaChair } from 'react-icons/fa';

const BusCard = ({ bus }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden m-4">
      <img src={bus.photo_url} alt={`Bus ${bus.bus_id}`} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">Bus {bus.bus_id}</h2>
        <div className="flex items-center mb-2">
          <FaRoute className="mr-2 text-blue-500" />
          <span>{bus.route}</span>
        </div>
        <div className="flex items-center mb-2">
          <FaChair className="mr-2 text-blue-400" />
          <span>{bus.number_of_seats} seats</span>
        </div>
        <div className="flex items-center mb-2">
          <FaMoneyBillWave className="mr-2 text-blue-300" />
          <span>Ksh. {bus.cost_per_seat} per seat</span>
        </div>
        <div className="flex items-center">
          <FaBus className="mr-2 text-blue-200" />
          <span className={bus.status === 'available' ? 'text-green-500' : 'text-red-500'}>
            {bus.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BusCard;

