import React from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaUser, FaBus } from "react-icons/fa";
import hero from "../assets/hero.jpeg";

const Hero = () => {
  return (
    <section
      className="relative bg-cover bg-center h-[80vh] flex flex-col justify-end px-6 md:px-16"
      style={{ backgroundImage: `url(${hero})` }}
    >
      {/* Overlay with Blur */}
      <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-10 text-center pb-10">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Plan Your Bus Journey
        </h1>
        <p className="text-lg md:text-xl font-light text-white mb-6">
          Find the best bus routes and book your tickets in just a few clicks.
        </p>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-lg p-4 flex flex-wrap items-center justify-center gap-4 w-full max-w-5xl mx-auto">
          {/* From Location */}
          <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md w-full md:w-auto flex-1">
            <FaMapMarkerAlt className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="From"
              className="bg-transparent outline-none text-gray-700 flex-1"
            />
          </div>

          {/* To Location */}
          <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md w-full md:w-auto flex-1">
            <FaMapMarkerAlt className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="To"
              className="bg-transparent outline-none text-gray-700 flex-1"
            />
          </div>

          {/* Date */}
          <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md w-full md:w-auto">
            <FaCalendarAlt className="text-gray-500 mr-2" />
            <input
              type="date"
              className="bg-transparent outline-none text-gray-700"
            />
          </div>

          {/* Passengers */}
          <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md w-full md:w-auto">
            <FaUser className="text-gray-500 mr-2" />
            <input
              type="number"
              min="1"
              placeholder="Passengers"
              className="bg-transparent outline-none text-gray-700"
            />
          </div>

          {/* Search Button */}
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-semibold flex items-center">
            <FaBus className="mr-2" />
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

