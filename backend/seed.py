#from your_app import db  # Ensure you have the correct import for your db instance
#from your_app.models import User, Bus, Route, Booking
from werkzeug.security import generate_password_hash
from models import User, Bus, Route, Booking
from app import app, db

# Sample Users
users = [
    User(username='john_doe', email='jedn@example.com', password=generate_password_hash('password1')),
    User(username='jane_smith', email='jaee@example.com', password=generate_password_hash('password2')),
    User(username='alice_jones', email='alice@example.com', password=generate_password_hash('password3')),
    User(username='bob_brown', email='bob@example.com', password=generate_password_hash('password4')),
]

# Sample Buses
buses = [
    Bus(bus_number='BUS001', capacity=50, bus_type='Luxury'),
    Bus(bus_number='BUS002', capacity=40, bus_type='Standard'),
    Bus(bus_number='BUS003', capacity=30, bus_type='Economy'),
    Bus(bus_number='BUS004', capacity=20, bus_type='Luxury'),
]

# Sample Routes
routes = [
    Route(start_location='New York', end_location='Washington', distance=225),
    Route(start_location='Los Angeles', end_location='San Francisco', distance=380),
    Route(start_location='Chicago', end_location='Detroit', distance=280),
]

# Function to seed the database
def seed_database():
    try:
        # Add users
        db.session.bulk_save_objects(users)
        db.session.commit()

        # Add buses
        db.session.bulk_save_objects(buses)
        db.session.commit()

        # Add routes
        db.session.bulk_save_objects(routes)
        db.session.commit()

        # Fetch created IDs for bookings
        user_ids = [user.id for user in users]
        bus_ids = [bus.id for bus in buses]
        route_ids = [route.id for route in routes]

        # Sample Bookings using the created IDs
        bookings = [
            Booking(user_id=user_ids[0], bus_id=bus_ids[0], route_id=route_ids[0], booking_date='2023-10-01', seats_booked=2),
            Booking(user_id=user_ids[1], bus_id=bus_ids[1], route_id=route_ids[1], booking_date='2023-10-02', seats_booked=1),
            Booking(user_id=user_ids[0], bus_id=bus_ids[2], route_id=route_ids[2], booking_date='2023-10-03', seats_booked=3),
            Booking(user_id=user_ids[2], bus_id=bus_ids[0], route_id=route_ids[0], booking_date='2023-10-04', seats_booked=4),
        ]

        # Add bookings
        db.session.bulk_save_objects(bookings)
        db.session.commit()

        print("Database seeded successfully!")

    except Exception as e:
        db.session.rollback()  # Rollback in case of error
        print(f"An error occurred while seeding the database: {e}")

if __name__ == '__main__':
    seed_database()