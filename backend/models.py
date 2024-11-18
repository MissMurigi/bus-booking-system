from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy import MetaData, Enum
from werkzeug.security import generate_password_hash, check_password_hash

metadata = MetaData()
db = SQLAlchemy(metadata=metadata)

# Define Enums for role and status management
USER_ROLES = ('customer', 'driver', 'admin')
BUS_STATUS = ('available', 'not_available')
SCHEDULE_STATUS = ('scheduled', 'completed', 'canceled')
BOOKING_STATUS = ('confirmed', 'canceled', 'completed')
PAYMENT_STATUS = ('pending', 'completed', 'failed')


class User(db.Model):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    role = db.Column(Enum(*USER_ROLES, name='user_roles_enum'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    bookings = db.relationship('Booking', back_populates='customer', cascade="all, delete-orphan")
    buses = db.relationship('Bus', back_populates='driver', cascade="all, delete-orphan")

    # Methods
    def set_password(self, password):
        """Hashes the password for secure storage."""
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        """Verifies a stored password hash against a given password."""
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        """Returns a dictionary representation of the user."""
        return {
        'user_id': self.user_id,
        'username': self.username,
        'email': self.email,
       'password': "hidden", # Be cautious about exposing this
        'role': self.role,
        'created_at': self.created_at.isoformat() if self.created_at else None,
        'updated_at': self.updated_at.isoformat() if self.updated_at else None,
    }


    def __repr__(self):
        """Provides a readable representation of the user."""
        return f'<User(username={self.username}, email={self.email}, role={self.role})>'


class Bus(db.Model):
    __tablename__ = 'buses'
    bus_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    driver_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    number_of_seats = db.Column(db.Integer, nullable=False)
    cost_per_seat = db.Column(db.Numeric(10, 2), nullable=False)
    route = db.Column(db.String(255), nullable=False)
    status = db.Column(Enum(*BUS_STATUS, name='bus_status_enum'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    driver = db.relationship('User', back_populates='buses')
    schedules = db.relationship('Schedule', back_populates='bus', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'bus_id': self.bus_id,
            'driver_id': self.driver_id,
            'number_of_seats': self.number_of_seats,
            'cost_per_seat': float(self.cost_per_seat) if self.cost_per_seat is not None else None,  # Convert Decimal to float
            'route': self.route,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
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
    status = db.Column(Enum(*SCHEDULE_STATUS, name='schedule_status_enum'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    bus = db.relationship('Bus', back_populates='schedules')
    bookings = db.relationship('Booking', back_populates='schedule', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'schedule_id': self.schedule_id,
            'bus_id': self.bus_id,
            'departure_time': self.departure_time.isoformat() if self.departure_time else None,
            'arrival_time': self.arrival_time.isoformat() if self.arrival_time else None,
            'date': self.date.isoformat() if self.date else None,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
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
    booking_status = db.Column(Enum(*BOOKING_STATUS, name='booking_status_enum'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    customer = db.relationship('User', back_populates='bookings')
    schedule = db.relationship('Schedule', back_populates='bookings')
    payment = db.relationship('Payment', back_populates='booking', uselist=False, cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'booking_id': self.booking_id,
            'customer_id': self.customer_id,
            'schedule_id': self.schedule_id,
            'number_of_seats_booked': self.number_of_seats_booked,
            'total_price': float(self.total_price) if self.total_price is not None else None,
            'booking_status': self.booking_status,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        }

    def __repr__(self):
        return f'<Booking(customer_id={self.customer_id}, schedule_id={self.schedule_id}, status={self.booking_status})>'


class Payment(db.Model):
    __tablename__ = 'payments'
    payment_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    booking_id = db.Column(db.Integer, db.ForeignKey('bookings.booking_id'), nullable=False)
    payment_amount = db.Column(db.Numeric(10, 2), nullable=False)
    payment_date = db.Column(db.DateTime, default=datetime.utcnow)
    payment_status = db.Column(Enum(*PAYMENT_STATUS, name='payment_status_enum'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    booking = db.relationship('Booking', back_populates='payment')

    def to_dict(self):
        return {
            'payment_id': self.payment_id,
            'booking_id': self.booking_id,
            'payment_amount': float(self.payment_amount) if self.payment_amount is not None else None,
            'payment_date': self.payment_date.isoformat() if self.payment_date else None,
            'payment_status': self.payment_status,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        }

    def __repr__(self):
        return f'<Payment(booking_id={self.booking_id}, amount={self.payment_amount}, status={self.payment_status})>' 
