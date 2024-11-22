import React from 'react';
import { FaBus, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-lg font-semibold">
            Explore the world with RoutEase
          </h2>
          <p className="text-sm text-blue-600 underline mt-2 cursor-pointer">
            Discover routes, bookings, and tickets
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-gray-800 font-medium">RoutEase</h3>
            <p className="text-sm mt-2">
              Your reliable companion for bus travel and ticketing.
            </p>
          </div>

          <div>
            <h3 className="text-gray-800 font-medium">Company</h3>
            <ul className="mt-2 text-sm space-y-2">
              <li>About Us</li>
              <li>Careers</li>
              <li>Newsroom</li>
              <li>Advertising</li>
              <li>Contact</li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-800 font-medium">Explore</h3>
            <ul className="mt-2 text-sm space-y-2">
              <li>Routes</li>
              <li>Popular Destinations</li>
              <li>Offers</li>
              <li>Bus Operators</li>
              <li className="text-blue-600 underline cursor-pointer">See more</li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-800 font-medium">Help</h3>
            <ul className="mt-2 text-sm space-y-2">
              <li>Support</li>
              <li>Cancel Bookings</li>
              <li>Refund Policy</li>
              <li>Terms of Use</li>
              <li>FAQs</li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-4 text-sm flex flex-col sm:flex-row justify-between items-center">
          <p>© RoutEase 2024</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <FaFacebook className="cursor-pointer" />
            <FaTwitter className="cursor-pointer" />
            <FaInstagram className="cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

