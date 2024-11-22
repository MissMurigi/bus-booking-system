from app import app, db
from models import User, Bus, Schedule, Booking, Payment

def reset_database():
    with app.app_context():
        # Drop all tables
        db.drop_all()
        print("All tables dropped.")

        # Create all tables
        db.create_all()
        print("All tables recreated.")

if __name__ == "__main__":
    reset_database()
    print("Database reset completed.")


