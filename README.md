# Bus-booking-system

This is a web application for managing bus schedules and bookings. It allows bus drivers to register buses, schedule trips, set seat prices, and allow customers to book seats for their travels. The system provides an efficient way for bus operators and customers to manage bus trips, seat availability, and bookings.

## Table of Contents
- Project Overview
- Technologies Used
- Prerequisites
- Backend Setup
    - Step 1: Set up the Flask API
    - Step 2: Set up Database and Models
    - Step 3: Create Routes for CRUD Operations
    - Step 4: Implement Authentication

- Frontend Setup
    - Step 1: Set up React App
    - Step 2: Install Dependencies
    - Step 3: Create React Components
    - Step 4: Integrate Redux for State Management
    - Step 5: Connect Frontend with Backend

- Deployment

## Project Overview

The Bus Booking System provides a solution for bus companies to efficiently manage bus schedules, bookings, and seat availability. It includes features for bus drivers to register buses, manage schedules, set prices, and enable customers to book, view, update, and delete their bookings. The system also includes different user roles such as admin, bus drivers, and customers.

## Technologies Used

- Backend: Flask, PostgreSQL
- Frontend: React.js, React 18.x,React-Router,React Toastify
- Database: PostgreSQL
- Authentication: JWT (JSON Web Tokens)

## Prerequisites
Before starting the project, make to install the folowing ;

1. Python 3.x (For Backend)
2. Node.js and npm (For Frontend)
3. PostgreSQL (For Database)
4. Git (For Version Control)


## Backend Setup
- To set up the backend of the Bus Booking System using Flask,use:

## Step 1: Set up the Flask API

- Clone the Repository:


Copy code
git clone https://github.com/MissMurigi/bus-booking-system.git
cd bus-booking-system

- Create a Virtual Environment:


python -m venv venv
source venv/bin/activate  # For Linux/MacOS
venv\Scripts\activate     # For Windows

## Install Dependencies:


pip install -r requirements.txt

- Create a .env file to store environment variables (e.g., database URL, secret key for JWT):

Example:
  - FLASK_APP=app.py
  - FLASK_ENV=development
  - DATABASE_URL=postgresql://user:password@localhost/bus_booking_system
  - SECRET_KEY=your-secret-key

- Run the Flask Server:
- flask run


## Step 2: Set up Database and Models

- Define Database Models:

Create your models using SQLAlchemy (e.g., User, Bus, Route, Booking, etc.). Here is an example of the User model:
e.g.

class User(db.Model):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    role = db.Column(db.Enum('customer', 'driver', 'admin'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

## Set up Database Migrations:

- Initialize Alembic for database migrations:

  - flask db init
  - flask db migrate
  - flask db upgrade

## Step 3: Create Routes for CRUD Operations
### endpoints
- Bus api
https://backend-pi-bay-65.vercel.app/buses

- Schedule api
https://backend-pi-bay-65.vercel.app/schedule

- Booking api
https://backend-pi-bay-65.vercel.app/booking

- Payment api
https://backend-pi-bay-65.vercel.app/payment
- Users api
https://backend-pi-bay-65.vercel.app/users

Define routes for buses, bookings, and schedules in the routes.py file using Flask Blueprints.

e.g.

@api.route('/api/buses', methods=['POST'])
def register_bus():
    data = request.get_json()
    new_bus = Bus(bus_number=data['bus_number'], capacity=data['capacity'], bus_type=data['bus_type'])
    db.session.add(new_bus)
    db.session.commit()
    return jsonify({"message": "Bus registered successfully!"}), 201

## Step 4: Implement Authentication

- Install Flask-JWT-Extended:
- pip install Flask-JWT-Extended
- Create Login and Signup Routes for JWT authentication:
example:

from flask_jwt_extended import JWTManager, create_access_token

jwt = JWTManager(app)

@api.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and check_password_hash(user.password_hash, data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token), 200
    return jsonify(message="Invalid credentials"), 401


## Frontend Setup
- Follow these steps to set up the frontend using React:

## Step 1: Set up React App
- Create a React App:
- npx create-react-app/vite bus-booking-frontend
- cd bus-booking-frontend

## Install Dependencies:

   - npm install 

## Step 2: Install Dependencies

## Step 3: Create React Components

- Create components for Bus Registration, Booking, Schedule Viewing, etc.
- Use React Router to handle different views (e.g., /login, /bookings, /buses).

- Example component for booking:
javascript

import React, { useState } from 'react';

function BookBus() {
  const [busId, setBusId] = useState('');
  const [seats, setSeats] = useState('');

  const handleBooking = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/bookings', {
        bus_id: busId,
        seats: seats
      });
      alert('Booking successful');
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <div>
      <input type="text" placeholder="Bus ID" value={busId} onChange={(e) => setBusId(e.target.value)} />
      <input type="number" placeholder="Seats" value={seats} onChange={(e) => setSeats(e.target.value)} />
      <button onClick={handleBooking}>Book Now</button>
    </div>
  );
}

export default BookBus;

## Step 4: Connect Frontend with Backend
- To make API calls from React components to your Flask backend.
- Handle authentication using JWT and store tokens in localStorage.

## Testing
- Ensure that you write unit tests for both the frontend and backend:

- Backend Testing: Use pytest and Flask-Testing for backend tests.
- Frontend Testing: Use Jest for unit tests and React Testing Library for component tests.

## Deployment

- Backend Deployment: Deploy your backend on platforms like render or Vercel.
- Frontend Deployment: Deploy your frontend on platforms like Netlify or Vercel.



