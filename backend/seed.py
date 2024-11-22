from app import app, db
from models import User, Bus
from flask_bcrypt import generate_password_hash


def seed_db():
    with app.app_context():
        # Create sample users
        if User.query.count() == 0:
            hashed_password = generate_password_hash('password').decode('utf-8')
            admin = User(username='admin', email='admin@example.com', password=hashed_password, role='admin')
            customer = User(username='customer', email='customer@example.com', password=hashed_password, role='customer')

            db.session.add(admin)
            db.session.add(customer)

        # Create sample buses
        if Bus.query.count() == 0:
            buses = [
                Bus(
                    image="https://i.pinimg.com/474x/0b/13/28/0b13282e806fcacc6c4558281da81fbb.jpg",
                    name="Luxury Express",
                    number_plate="ABC-123",
                    rating=4.5,
                    description="Luxury bus with WiFi and snacks",
                    total_seats=40,
                    available_seats=40,
                    cost_per_seat=750,
                    route="City A to City B",
                    time_of_travel="10:00 AM"
                ),
                Bus(
                    image="https://i.pinimg.com/474x/d5/c0/86/d5c0865e01e4f33bb3e0ebdabae71320.jpg",
                    name="Comfort Cruiser",
                    number_plate="DEF-456",
                    rating=4.2,
                    description="Comfortable seating with onboard entertainment",
                    total_seats=50,
                    available_seats=50,
                    cost_per_seat=800,
                    route="City B to City C",
                    time_of_travel="1:00 PM"
                ),
                Bus(
                    image="https://i.pinimg.com/474x/a6/71/23/a67123d6575b805071df6ddd6e4de2d7.jpg",
                    name="Speedline",
                    number_plate="GHI-789",
                    rating=4.8,
                    description="Fast travel with ample luggage space",
                    total_seats=45,
                    available_seats=45,
                    cost_per_seat=700,
                    route="City C to City D",
                    time_of_travel="3:00 PM"
                ),
                Bus(
                    image="https://i.pinimg.com/474x/21/7f/f6/217ff6675d81bded96579ecc748401ce.jpg",
                    name="EcoRide",
                    number_plate="JKL-012",
                    rating=4.1,
                    description="Environmentally friendly travel option",
                    total_seats=30,
                    available_seats=30,
                    cost_per_seat=600,
                    route="City D to City E",
                    time_of_travel="6:00 PM"
                ),
                Bus(
                    image="https://i.pinimg.com/736x/fc/85/d2/fc85d2ef43e1f1d8094956f7a014dc7f.jpg",
                    name="City Hopper",
                    number_plate="MNO-345",
                    rating=3.9,
                    description="Ideal for short city routes and daily commutes",
                    total_seats=25,
                    available_seats=25,
                    cost_per_seat=500,
                    route="City A to City F",
                    time_of_travel="8:00 AM"
                ),
                Bus(
                    image="https://i.pinimg.com/736x/5b/b6/14/5bb614672f0a431bf7c384e932a87bbe.jpg",
                    name="Night Rider",
                    number_plate="PQR-678",
                    rating=4.7,
                    description="Overnight travel with reclining seats and blankets",
                    total_seats=40,
                    available_seats=40,
                    cost_per_seat=850,
                    route="City F to City G",
                    time_of_travel="10:00 PM"
                ),
                Bus(
                    image="https://i.pinimg.com/474x/10/ac/47/10ac47895c97aadbe9eadb3ee5a10a34.jpg",
                    name="Family Wagon",
                    number_plate="STU-901",
                    rating=4.4,
                    description="Spacious seating for families and large groups",
                    total_seats=60,
                    available_seats=60,
                    cost_per_seat=1000,
                    route="City G to City H",
                    time_of_travel="7:00 AM"
                ),
                Bus(
                    image="https://i.pinimg.com/474x/1e/fd/50/1efd50b5020e06ffa8d903a7cd081b50.jpg",
                    name="Elite Traveler",
                    number_plate="VWX-234",
                    rating=4.9,
                    description="Luxury seating with complimentary meals and beverages",
                    total_seats=20,
                    available_seats=20,
                    cost_per_seat=1200,
                    route="City H to City I",
                    time_of_travel="9:00 AM"
                ),
                Bus(
                    image="https://i.pinimg.com/474x/cd/61/6f/cd616f27b25124fd457348b631c17ed5.jpg",
                    name="Budget Ride",
                    number_plate="YZA-567",
                    rating=3.5,
                    description="Affordable travel with basic amenities",
                    total_seats=50,
                    available_seats=50,
                    cost_per_seat=400,
                    route="City I to City J",
                    time_of_travel="6:00 AM"
                ),
                Bus(
                    image="https://i.pinimg.com/474x/8e/32/44/8e3244ee57917ae66aba83037ab5e1c0.jpg",
                    name="CrossCountry",
                    number_plate="BCD-890",
                    rating=4.3,
                    description="Long-distance travel with multiple stops",
                    total_seats=55,
                    available_seats=55,
                    cost_per_seat=900,
                    route="City J to City K",
                    time_of_travel="2:00 PM"
                ),
                Bus(
                    image="https://i.pinimg.com/474x/3b/b5/c1/3bb5c1b4d1afd2d776ff508424625896.jpg",
                    name="Swift Shuttle",
                    number_plate="EFG-123",
                    rating=4.6,
                    description="Quick and efficient service for medium distances",
                    total_seats=35,
                    available_seats=35,
                    cost_per_seat=700,
                    route="City K to City L",
                    time_of_travel="12:00 PM"
                )
            ]

            db.session.bulk_save_objects(buses)  # Add all buses in a single transaction

        db.session.commit()
        print("Database seeded successfully!")


if __name__ == '__main__':
    seed_db()
