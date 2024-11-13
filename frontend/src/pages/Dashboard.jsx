import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="menu-icon">☰</div>
        <h1>Available Buses</h1>
      </header>
      <div className="search-container">
        <input type="text" placeholder="Boarding from" />
        <input type="text" placeholder="Enter destination" />
        <input type="date" placeholder="DD/MM/YYYY" />
        <button className="find-buses-button">Find Buses</button>
      </div>
      <div className="bus-list">
        <div className="bus-item">
          <div className="ticket-info">
            <p><strong>Ticket no: 124367688</strong></p>
            <p><strong>Boarding Point</strong></p>
            <ul>
              <li>8:05 PM, pick up at Narok Bus Station</li>
              <li>drop off: Nairobi Bus Station</li>
              <li>Bus: KCV 097B</li>
            </ul>
          </div>
          <div className="route-info">
            <p>From Narok 8:05 PM</p>
            <p>To Nairobi 6:03 AM</p>
          </div>
          <div className="cost-info">
            <p><strong>Ksh.600</strong></p>
            <button className="check-details-button">Check details</button>
          </div>
        </div>

        <div className="bus-item">
          <div className="ticket-info">
            <p><strong>Ticket no: 168576886</strong></p>
            <p><strong>Boarding Point</strong></p>
            <ul>
              <li>8:05 PM, pick up at Mandera Bus Station</li>
              <li>drop off: Nairobi Bus Station</li>
              <li>Bus: KBS 475D</li>
            </ul>
          </div>
          <div className="route-info">
            <p>From Mandera 8:05 PM</p>
            <p>To Nairobi 7:57 AM</p>
          </div>
          <div className="cost-info">
            <p><strong>Ksh.900</strong></p>
            <button className="check-details-button">Check details</button>
          </div>
        </div>
      </div>
      <button className="back-button">Back to Homepage</button>
    </div>
  );
};

export default Dashboard;
