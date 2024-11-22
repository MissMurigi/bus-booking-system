import React, { useState, useEffect } from "react";
import axios from "axios";
import BusCard from "../components/BusCard";

const Buses = () => {
  const [buses, setBuses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBuses, setFilteredBuses] = useState([]);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await axios.get("https://bus-booking-phi.vercel.app/buses");
        setBuses(response.data);
        setFilteredBuses(response.data);
      } catch (error) {
        console.error("Error fetching buses:", error);
      }
    };

    fetchBuses();
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = buses.filter((bus) =>
      bus.route.toLowerCase().includes(term)
    );
    setFilteredBuses(filtered);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Find Your Bus
        </h1>

        {/* Search Bar */}
        <div className="flex items-center bg-white rounded-lg shadow-md p-4 mb-8">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by route..."
            className="flex-grow p-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Main Layout */}
        <div className="flex">
          {/* Sidebar Filters */}
          <aside className="w-1/4 bg-white rounded-lg shadow-md p-4 mr-6">
            <h2 className="text-lg font-semibold text-blue-500 mb-4">Filters</h2>
            <div className="mb-6">
              <h3 className="font-medium mb-2">Price Range</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Below Ksh. 1,000
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Ksh. 1,000 - 2,000
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Above Ksh. 2,000
                </label>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Ratings</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  5 Stars
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  4 Stars & above
                </label>
              </div>
            </div>
          </aside>

          {/* Bus Cards */}
          <div className="flex-grow">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBuses.map((bus) => (
                <BusCard key={bus.bus_id} bus={bus} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buses;

