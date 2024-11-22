from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False, unique=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(50), nullable=False)

    def __init__(self, username, email, password, role):
        self.username = username
        self.email = email
        self.password = password
        self.role = role

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'role': self.role
        }

class Bus(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String(200), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    number_plate = db.Column(db.String(50), nullable=False)
    rating = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text, nullable=False)
    total_seats = db.Column(db.Integer, nullable=False)
    available_seats = db.Column(db.Integer, nullable=False)
    cost_per_seat = db.Column(db.Float, nullable=False)  # New field for seat cost
    route = db.Column(db.String(200), nullable=False)  # New field for bus route
    time_of_travel = db.Column(db.String(50), nullable=False)  # New field for travel time

    def to_dict(self):
        return {
            'id': self.id,
            'image': self.image,
            'name': self.name,
            'number_plate': self.number_plate,
            'rating': self.rating,
            'description': self.description,
            'total_seats': self.total_seats,
            'available_seats': self.available_seats,
            'cost_per_seat': self.cost_per_seat,
            'route': self.route,
            'time_of_travel': self.time_of_travel
        }

class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    bus_id = db.Column(db.Integer, db.ForeignKey('bus.id'), nullable=False)
    seat_number = db.Column(db.Integer, nullable=False)
    travel_date = db.Column(db.String(50), nullable=False)  # New field for travel date
    status = db.Column(db.String(20), nullable=False, default='booked')  # e.g., booked, canceled

    user = db.relationship('User', backref='bookings')
    bus = db.relationship('Bus', backref='bookings')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'bus_id': self.bus_id,
            'seat_number': self.seat_number,
            'travel_date': self.travel_date,
            'status': self.status,
            'bus_details': self.bus.to_dict(),
            'user_details': self.user.to_dict()
        }
