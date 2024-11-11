from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, CHAR, Float, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime

Base = declarative_base()

class User(Base):
    _tablename_ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    role = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.now)

    # Relationships
    bookings = relationship('Booking', back_populates='user')
    buses = relationship('Bus', back_populates='driver')                       
    
    def _repr_(self):
        return f'<User(username={self.username}, email={self.email}, role={self.role})>'

class Bus(Base):
    _tablename_ = 'buses'
    id = Column(Integer, primary_key=True)  # Added primary_key=True
    name = Column(String(255), nullable=False)
    seat_count = Column(Integer, nullable=False)
    cost_per_seat = Column(Float, nullable=False)
    driver_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    route_id = Column(Integer, ForeignKey('routes.id'), nullable=False)  # Corrected table name

    # Relationships
    driver = relationship('User', back_populates='buses')
    route = relationship('Route', back_populates='buses')
    schedules = relationship('Schedule', back_populates='bus')
    
    def _repr_(self):
        return f'<Bus(name={self.name}, seat_count={self.seat_count}, cost_per_seat={self.cost_per_seat})>'

class Route(Base):
    _tablename_ = 'routes'
    id = Column(Integer, primary_key=True)
    start_location = Column(String(255), nullable=False)
    end_location = Column(String(255), nullable=False)
    estimated_time = Column(String(50), nullable=False)

    # Relationships
    buses = relationship('Bus', back_populates='route')

    def _repr_(self):
        return f'<Route(start_location={self.start_location}, end_location={self.end_location}, estimated_time={self.estimated_time})>'

class Schedule(Base):
    _tablename_ = 'schedules'
    id = Column(Integer, primary_key=True)
    bus_id = Column(Integer, ForeignKey('buses.id'), nullable=False)
    departure_time = Column(DateTime, nullable=False)
    arrival_time = Column(DateTime, nullable=False)

    # Relationships
    bus = relationship('Bus', back_populates='schedules')
    bookings = relationship('Booking', back_populates='schedule')  # Added this line

    def _repr_(self):
        return f'<Schedule(bus_id={self.bus_id}, departure_time={self.departure_time}, arrival_time={self.arrival_time})>'

class Booking(Base):
    _tablename_ = 'bookings'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    schedule_id = Column(Integer, ForeignKey('schedules.id'), nullable=False)  # Corrected table name
    seat_number = Column(CHAR(1), nullable=False)
    booking_time = Column(DateTime, default=datetime.now)  # Removed datetime.datetime

    # Relationships
    user = relationship('User', back_populates='bookings')
    schedule = relationship('Schedule', back_populates='bookings')  # Ensured this is defined

    def _repr_(self):
        return f'<Booking(user_id={self.user_id}, schedule_id={self.schedule_id}, seat_number={self.seat_number}, booking_time={self.booking_time})>'

# Setting up the database
engine = create_engine('sqlite:///bus_management.db', echo=True)
Base.metadata.create_all(bind=engine)
Session = sessionmaker(bind=engine)
session = Session()

# Create sample data
user1 = User(username='user1', email='user1@example.com', password='password1', role='passenger')
user2 = User(username='user2', email='user2@example.com', password='password2', role='driver')

session.add_all([user1, user2])
session.commit()