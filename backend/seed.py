from app import app, db
from models import User, Bus, Schedule, Booking, Payment
from datetime import datetime, timedelta

# Function to seed data into the database
def seed_data():
    with app.app_context():  # Ensure that the code runs inside the application context
        # Seed Users
        users = [
            User(username='customer1', password_hash='hashedpassword1', email='customer1@example.com', role='customer'),
            User(username='driver1', password_hash='hashedpassword2', email='driver1@example.com', role='driver'),
            User(username='admin1', password_hash='hashedpassword3', email='admin1@example.com', role='admin'),
            User(username='customer2', password_hash='hashedpassword4', email='customer2@example.com', role='customer'),
            User(username='driver2', password_hash='hashedpassword5', email='driver2@example.com', role='driver'),
        ]

        # Add Users to the session
        db.session.add_all(users)
        db.session.commit()

        # Seed Buses (Assuming driver_id references a User with role 'driver')
        buses = [
            Bus(driver_id=2, number_of_seats=40, cost_per_seat=100.00, route='Route A', status='available'),
            Bus(driver_id=5, number_of_seats=50, cost_per_seat=120.00, route='Route B', status='available'),
            Bus(driver_id=2, number_of_seats=30, cost_per_seat=80.00, route='Route C', status='available'),
            Bus(driver_id=5, number_of_seats=45, cost_per_seat=110.00, route='Route D', status='available'),
            Bus(driver_id=2, number_of_seats=60, cost_per_seat=130.00, route='Route E', status='not_available'),
        ]

        # Add Buses to the session
        db.session.add_all(buses)
        db.session.commit()

        # Seed Schedules (Assuming bus_id references an existing Bus)
        schedules = [
            Schedule(bus_id=1, departure_time=datetime.utcnow() + timedelta(days=1), arrival_time=datetime.utcnow() + timedelta(days=1, hours=3), date=datetime.utcnow().date(), status='scheduled'),
            Schedule(bus_id=2, departure_time=datetime.utcnow() + timedelta(days=2), arrival_time=datetime.utcnow() + timedelta(days=2, hours=3), date=datetime.utcnow().date(), status='scheduled'),
            Schedule(bus_id=3, departure_time=datetime.utcnow() + timedelta(days=3), arrival_time=datetime.utcnow() + timedelta(days=3, hours=3), date=datetime.utcnow().date(), status='scheduled'),
            Schedule(bus_id=4, departure_time=datetime.utcnow() + timedelta(days=4), arrival_time=datetime.utcnow() + timedelta(days=4, hours=3), date=datetime.utcnow().date(), status='scheduled'),
            Schedule(bus_id=5, departure_time=datetime.utcnow() + timedelta(days=5), arrival_time=datetime.utcnow() + timedelta(days=5, hours=3), date=datetime.utcnow().date(), status='scheduled'),
        ]

        # Add Schedules to the session
        db.session.add_all(schedules)
        db.session.commit()

        # Seed Bookings (Assuming customer_id references an existing User and schedule_id references an existing Schedule)
        bookings = [
            Booking(customer_id=1, schedule_id=1, number_of_seats_booked=2, total_price=200.00, booking_status='confirmed'),
            Booking(customer_id=4, schedule_id=2, number_of_seats_booked=3, total_price=300.00, booking_status='confirmed'),
            Booking(customer_id=1, schedule_id=3, number_of_seats_booked=4, total_price=400.00, booking_status='completed'),
            Booking(customer_id=1, schedule_id=4, number_of_seats_booked=1, total_price=100.00, booking_status='canceled'),
            Booking(customer_id=4, schedule_id=5, number_of_seats_booked=5, total_price=500.00, booking_status='confirmed'),
        ]

        # Add Bookings to the session
        db.session.add_all(bookings)
        db.session.commit()

        # Seed Payments (Assuming booking_id references an existing Booking)
        payments = [
            Payment(booking_id=1, payment_amount=200.00, payment_status='completed'),
            Payment(booking_id=2, payment_amount=300.00, payment_status='completed'),
            Payment(booking_id=3, payment_amount=400.00, payment_status='completed'),
            Payment(booking_id=4, payment_amount=100.00, payment_status='failed'),
            Payment(booking_id=5, payment_amount=500.00, payment_status='completed'),
        ]

        # Add Payments to the session
        db.session.add_all(payments)
        db.session.commit()

        print("Data seeded successfully!")

if __name__ == '__main__':
    seed_data()
