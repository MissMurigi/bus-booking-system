<<<<<<< HEAD
from app import db

class User(db.Model):
    __tablename__ = 'user'  # Explicitly define the table name
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

    bookings = db.relationship('Booking', back_populates='user')

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }

    def __repr__(self):
        return f'<User  {self.username}>'


class Bus(db.Model):
    __tablename__ = 'bus'

    id = db.Column(db.Integer, primary_key=True)
    bus_number = db.Column(db.String(20), unique=True, nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    bus_type = db.Column(db.String(50), nullable=False)

    bookings = db.relationship('Booking', back_populates='bus')

    def to_dict(self):
        return {
            'id': self.id,
            'bus_number': self.bus_number,
            'capacity': self.capacity,
            'bus_type': self.bus_type
        }

    def __repr__(self):
        return f'<Bus {self.bus_number}>'


class Route(db.Model):
    __tablename__ = 'route'

    id = db.Column(db.Integer, primary_key=True)
    start_location = db.Column(db.String(100), nullable=False)
    end_location = db.Column(db.String(100), nullable=False)
    distance = db.Column(db.Float, nullable=False)

    bookings = db.relationship('Booking', back_populates='route')

    def to_dict(self):
        return {
            'id': self.id,
            'start_location': self.start_location,
            'end_location': self.end_location,
            'distance': self.distance
        }

    def __repr__(self):
        return f'<Route {self.start_location} to {self.end_location}>'


class Booking(db.Model):
    __tablename__ = 'booking'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    bus_id = db.Column(db.Integer, db.ForeignKey('bus.id'), nullable=False)
    route_id = db.Column(db.Integer, db.ForeignKey('route.id'), nullable=False)
    booking_date = db.Column(db.DateTime, nullable=False)  # Use DateTime instead of String
    seats_booked = db.Column(db.Integer, nullable=False)

    user = db.relationship('User ', back_populates='bookings')
    bus = db.relationship('Bus', back_populates='bookings')
    route = db.relationship('Route', back_populates='bookings')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'bus_id': self.bus_id,
            'route_id': self.route_id,
            'booking_date': self.booking_date.isoformat(),  # Convert to ISO format for JSON
            'seats_booked': self.seats_booked
        }

    def __repr__(self):
        return f'<Booking {self.id} by User {self.user_id}>'
=======
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    role = db.Column(db.Enum('customer', 'driver', 'admin'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    bookings = db.relationship('Booking', back_populates='customer')
    buses = db.relationship('Bus', back_populates='driver')

    def __repr__(self):
        return f'<User(username={self.username}, email={self.email}, role={self.role})>'

class Bus(db.Model):
    __tablename__ = 'buses'
    bus_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    driver_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    number_of_seats = db.Column(db.Integer, nullable=False)
    cost_per_seat = db.Column(db.Numeric(10, 2), nullable=False)
    route = db.Column(db.String(255), nullable=False)
    status = db.Column(db.Enum('available', 'not_available'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    driver = db.relationship('User', back_populates='buses')
    schedules = db.relationship('Schedule', back_populates='bus')

    def __repr__(self):
        return f'<Bus(driver_id={self.driver_id}, route={self.route}, status={self.status})>'

class Schedule(db.Model):
    __tablename__ = 'schedules'
    schedule_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    bus_id = db.Column(db.Integer, db.ForeignKey('buses.bus_id'), nullable=False)
    departure_time = db.Column(db.DateTime, nullable=False)
    arrival_time = db.Column(db.DateTime, nullable=False)
    date = db.Column(db.Date, nullable=False)
    status = db.Column(db.Enum('scheduled', 'completed', 'canceled'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    bus = db.relationship('Bus', back_populates='schedules')
    bookings = db.relationship('Booking', back_populates='schedule')

    def __repr__(self):
        return f'<Schedule(bus_id={self.bus_id}, date={self.date}, status={self.status})>'

class Booking(db.Model):
    __tablename__ = 'bookings'
    booking_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    schedule_id = db.Column(db.Integer, db.ForeignKey('schedules.schedule_id'), nullable=False)
    number_of_seats_booked = db.Column(db.Integer, nullable=False)
    total_price = db.Column(db.Numeric(10, 2), nullable=False)
    booking_status = db.Column(db.Enum('confirmed', 'canceled', 'completed'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    customer = db.relationship('User', back_populates='bookings')
    schedule = db.relationship('Schedule', back_populates='bookings')

    def __repr__(self):
        return f'<Booking(customer_id={self.customer_id}, schedule_id={self.schedule_id}, status={self.booking_status})>'

class Payment(db.Model):
    __tablename__ = 'payments'
    payment_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    booking_id = db.Column(db.Integer, db.ForeignKey('bookings.booking_id'), nullable=False)
    payment_amount = db.Column(db.Numeric(10, 2), nullable=False)
    payment_date = db.Column(db.DateTime, default=datetime.utcnow)
    payment_status = db.Column(db.Enum('pending', 'completed', 'failed'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    booking = db.relationship('Booking')

    def __repr__(self):
        return f'<Payment(booking_id={self.booking_id}, amount={self.payment_amount}, status={self.payment_status})>'
>>>>>>> 2f33e95654bc0143907d517b250b0784c5a1eb53
