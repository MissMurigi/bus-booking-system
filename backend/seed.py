from werkzeug.security import generate_password_hash
from models import User, Bus, Route, Booking, Schedule  # Import Schedule
from app import db

# Sample Users
users = [
    User(username='john_doe', email='john@example.com', password=generate_password_hash('password1'), role='customer'),
    User(username='jane_smith', email='jane@example.com', password=generate_password_hash('password2'), role='customer'),
    User(username='alice_jones', email='alice@example.com', password=generate_password_hash('password3'), role='customer'),
    User(username='bob_brown', email='bob@example.com', password=generate_password_hash('password4'), role='customer'),
]

# Sample Buses
buses = [
    Bus(driver_id=1, number_of_seats=50, cost_per_seat=20.00, route='Route 1', status='available'),  # Assuming driver_id is 1
    Bus(driver_id=1, number_of_seats=40, cost_per_seat=15.00, route='Route 2', status='available'),
]

# Sample Routes
routes = [
    Route(start_location='New York', end_location='Washington', distance=225),
    Route(start_location='Los Angeles', end_location='San Francisco', distance=380),
]

# Sample Schedules
schedules = [
    Schedule(bus_id=1, departure_time=datetime(2023, 10, 1, 9, 0), arrival_time=datetime(2023, 10, 1, 12, 0), date=date(2023, 10, 1), status='scheduled'),
    Schedule(bus_id=2, departure_time=datetime(2023, 10, 2, 10, 0), arrival_time=datetime(2023, 10, 2, 13, 0), date=date(2023, 10, 2), status='scheduled'),
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

        # Add schedules
        db.session.bulk_save_objects(schedules)
        db.session.commit()

        # Fetch created IDs for bookings
        user_ids = [user.user_id for user in users]
        bus_ids = [bus.bus_id for bus in buses]
        schedule_ids = [schedule.schedule_id for schedule in schedules]

        # Sample Bookings using the created IDs
        bookings = [
            Booking(customer_id=user_ids[0], schedule_id=schedule_ids[0], number_of_seats_booked=2, total_price=40.00, booking_status='confirmed'),
            Booking(customer_id=user_ids[1], schedule_id=schedule_ids[1], number_of_seats_booked=1, total_price=15.00, booking_status='confirmed'),
            Booking(customer_id=user_ids[0], schedule_id=schedule_ids[0], number_of_seats_booked=3, total_price=60.00, booking_status='confirmed'),
            Booking(customer_id=user_ids[2], schedule_id=schedule_ids[0], number_of_seats_booked=4, total_price=80.00, booking_status='confirmed'),
        ]

        # Add bookings
        db.session.bulk_save_objects(bookings)
        db.session.commit()

        print(" Database seeded successfully!")

    except Exception as e:
        db.session.rollback()  # Rollback in case of error
        print(f"An error occurred while seeding the database: {e}")

if __name__ == '__main__':
    seed_database()