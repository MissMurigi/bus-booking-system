from app import app, db
from models import User
from flask_bcrypt import generate_password_hash

# This function will create sample users
def seed_db():
    with app.app_context():
        # Check if the database is already populated
        if User.query.count() == 0:
            # Create some sample users with hashed passwords
            hashed_password = generate_password_hash('admin123').decode('utf-8')
            admin = User(username='admin', email='admin@example.com', password=hashed_password, role='admin')
            bus_owner = User(username='owner', email='owner@example.com', password=hashed_password, role='driver')
            customer = User(username='customer', email='customer@example.com', password=hashed_password, role='customer')

            db.session.add(admin)
            db.session.add(bus_owner)
            db.session.add(customer)

            db.session.commit()

        print("Database seeded successfully!")

# Run the seed function
if __name__ == '__main__':
    seed_db()
