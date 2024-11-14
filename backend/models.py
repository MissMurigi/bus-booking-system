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

    def to_dict(self):
        return {
            'user_id': self.user_id,
            'username': self.username,
            'email': self.email,
            'role': self.role,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

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

    def to_dict(self):
        return {
            'bus_id': self.bus_id,
            'driver_id': self.driver_id,
            'number_of_seats': self.number_of_seats,
            'cost_per_seat': self.cost_per_seat,
            'route': self.route,
            'status': self.status,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

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

    def to_dict(self):
        return {
            'schedule_id': self.schedule_id,
            'bus_id': self.bus_id,
            'departure_time': self.departure_time,
            'arrival_time': self.arrival_time,
            'date': self.date,
            'status': self.status,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

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

    def to_dict(self):
        return {
            'booking_id': self.booking_id,
            'customer_id': self.customer_id,
            'schedule_id': self.schedule_id,
            'number_of_seats_booked': self.number_of_seats_booked,
            'total_price': self.total_price,
            'booking_status': self.booking_status,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

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

    def to_dict(self):
        return {
            'payment_id': self.payment_id,
            'booking_id': self.booking_id,
            'payment_amount': self.payment_amount,
            'payment_date': self.payment_date,
            'payment_status': self.payment_status,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

    def __repr__(self):
        return f'<Payment(booking_id={self.booking_id}, amount={self.payment_amount}, status={self.payment_status})>'
