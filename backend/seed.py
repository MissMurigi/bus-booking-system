from your_app.models import User, Bus, Route, Booking

# Sample Users
users = [
    User(username='john_doe', email='john@example.com', password='hashed_password_1'),
    User(username='jane_smith', email='jane@example.com', password='hashed_password_2'),
    User(username='alice_jones', email='alice@example.com', password='hashed_password_3'),
    User(username='bob_brown', email='bob@example.com', password='hashed_password_4'),
]

# Sample Buses
buses = [
    Bus(bus_number='BUS001', capacity=50, bus_type='Luxury'),
    Bus(bus_number='BUS002', capacity=40, bus_type='Standard'),
    Bus(bus_number='BUS003', capacity=30, bus_type='Economy'),
]

# Sample Routes
routes = [
    Route(start_location='New York', end_location='Washington', distance=225),
    Route(start_location='Los Angeles', end_location='San Francisco', distance=380),
    Route(start_location='Chicago', end_location='Detroit', distance=280),
]

# Sample Bookings
bookings = [
    Booking(user_id=1, bus_id=1, route_id=1, booking_date='2023-10-01', seats_booked=2),
    Booking(user_id=2, bus_id=2, route_id=2, booking_date='2023-10-02', seats_booked=1),
    Booking(user_id=1, bus_id=3, route_id=3, booking_date='2023-10-03', seats_booked=3),
    Booking(user_id=3, bus_id=1, route_id=1, booking_date='2023-10-04', seats_booked=4),
]

# Function to seed the database
def seed_database():
    for user in users:
        user.save()
    
    for bus in buses:
        bus.save()
    
    for route in routes:
        route.save()
    
    for booking in bookings:
        booking.save()

if __name__ == '__main__':
    seed_database()