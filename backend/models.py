from app import db

class User(db.Model):
    __tablename__ = 'user'  # Explicitly define the table name
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

    bookings = db.relationship('Booking', back_populates='user')

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }

    def __repr__(self):
        return f'<User  {self.username}>'


class Bus(db.Model):
    __tablename__ = 'bus'

    id = db.Column(db.Integer, primary_key=True)
    bus_number = db.Column(db.String(20), unique=True, nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    bus_type = db.Column(db.String(50), nullable=False)

    bookings = db.relationship('Booking', back_populates='bus')

    def to_dict(self):
        return {
            'id': self.id,
            'bus_number': self.bus_number,
            'capacity': self.capacity,
            'bus_type': self.bus_type
        }

    def __repr__(self):
        return f'<Bus {self.bus_number}>'


class Route(db.Model):
    __tablename__ = 'route'

    id = db.Column(db.Integer, primary_key=True)
    start_location = db.Column(db.String(100), nullable=False)
    end_location = db.Column(db.String(100), nullable=False)
    distance = db.Column(db.Float, nullable=False)

    bookings = db.relationship('Booking', back_populates='route')

    def to_dict(self):
        return {
            'id': self.id,
            'start_location': self.start_location,
            'end_location': self.end_location,
            'distance': self.distance
        }

    def __repr__(self):
        return f'<Route {self.start_location} to {self.end_location}>'


class Booking(db.Model):
    __tablename__ = 'booking'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    bus_id = db.Column(db.Integer, db.ForeignKey('bus.id'), nullable=False)
    route_id = db.Column(db.Integer, db.ForeignKey('route.id'), nullable=False)
    booking_date = db.Column(db.DateTime, nullable=False)  # Use DateTime instead of String
    seats_booked = db.Column(db.Integer, nullable=False)

    user = db.relationship('User ', back_populates='bookings')
    bus = db.relationship('Bus', back_populates='bookings')
    route = db.relationship('Route', back_populates='bookings')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'bus_id': self.bus_id,
            'route_id': self.route_id,
            'booking_date': self.booking_date.isoformat(),  # Convert to ISO format for JSON
            'seats_booked': self.seats_booked
        }

    def __repr__(self):
        return f'<Booking {self.id} by User {self.user_id}>'