from flask_restful import Resource, reqparse
from flask_bcrypt import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models import db, User, Booking, Bus

# User Resource
class UserResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('username', required=True, help='Username is required')
    parser.add_argument('email', required=True, help="Email is required")
    parser.add_argument('password', required=True, help="Password is required")
    parser.add_argument('role', required=True, choices=('admin', 'customer', 'driver'), help="Role must be 'admin', 'customer', or 'driver'")

    def get(self, user_id=None):
        """
        Retrieve a single user by ID or all users.
        """
        if user_id:
            user = User.query.get(user_id)
            if not user:
                return {"message": "User not found"}, 404
            return {"message": "User retrieved successfully", "user": user.to_dict()}, 200

        users = User.query.all()
        return {
            "message": "Users retrieved successfully",
            "users": [user.to_dict() for user in users]
        }, 200

    def post(self):
        """
        Create a new user.
        """
        data = self.parser.parse_args()

        # Check for existing username or email
        if User.query.filter((User.username == data['username']) | (User.email == data['email'])).first():
            return {"message": "Username or email already taken"}, 409

        # Encrypt the password
        hashed_password = generate_password_hash(data['password']).decode('utf-8')

        # Create a new user
        user = User(
            username=data['username'],
            email=data['email'],
            password=hashed_password,
            role=data['role']
        )
        db.session.add(user)
        db.session.commit()

        # Generate JWT token
        access_token = create_access_token(identity=user.id)

        return {
            "message": "User created successfully",
            "user": user.to_dict(),
            "access_token": access_token
        }, 201


# SignUp Resource
class SignUpResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('username', required=True, help='Username is required')
    parser.add_argument('email', required=True, help="Email is required")
    parser.add_argument('password', required=True, help="Password is required")
    parser.add_argument('role', required=True, choices=('admin', 'customer', 'driver'), help="Role must be 'admin', 'customer', or 'driver'")

    def post(self):
        """
        Sign up a new user.
        """
        data = self.parser.parse_args()

        # Check for existing username or email
        if User.query.filter((User.username == data['username']) | (User.email == data['email'])).first():
            return {"message": "Username or email already taken"}, 409

        # Encrypt the password
        hashed_password = generate_password_hash(data['password']).decode('utf-8')

        # Create a new user
        user = User(
            username=data['username'],
            email=data['email'],
            password=hashed_password,
            role=data['role']
        )
        db.session.add(user)
        db.session.commit()

        # Generate JWT token
        access_token = create_access_token(identity=user.id)

        return {
            "message": "Sign-up successful",
            "user": user.to_dict(),
            "access_token": access_token
        }, 201


# Login Resource
class LoginResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('email', required=True, help="Email is required")
    parser.add_argument('password', required=True, help="Password is required")

    def post(self):
        """
        Authenticate user and return a JWT token.
        """
        data = self.parser.parse_args()

        # Find the user by email
        user = User.query.filter_by(email=data['email']).first()
        if not user or not check_password_hash(user.password, data['password']):
            return {"message": "Invalid email or password"}, 401

        # Generate JWT token
        access_token = create_access_token(identity=user.id)

        return {
            "message": "Login successful",
            "user": user.to_dict(),
            "access_token": access_token
        }, 200


# Logout Resource
class LogoutResource(Resource):
    @jwt_required()
    def post(self):
        """
        Invalidate user session (if using token blacklisting).
        """
        return {"message": "Logout successful"}, 200

# Bus Resource
class BusResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('image', required=True, help='Image URL is required')
    parser.add_argument('name', required=True, help='Name is required')
    parser.add_argument('number_plate', required=True, help='Number plate is required')
    parser.add_argument('rating', type=float, required=True, help='Rating is required')
    parser.add_argument('description', required=True, help='Description is required')
    parser.add_argument('total_seats', type=int, required=True, help='Total seats are required')
    parser.add_argument('cost_per_seat', type=float, required=True, help='Cost per seat is required')
    parser.add_argument('route', required=True, help='Route is required')
    parser.add_argument('time_of_travel', required=True, help='Time of travel is required')

    def get(self, bus_id=None):
        if bus_id:
            bus = Bus.query.get(bus_id)
            if not bus:
                return {"message": "Bus not found"}, 404
            return {"message": "Bus retrieved", "bus": bus.to_dict()}
        
        buses = Bus.query.all()
        return {"message": "Buses retrieved", "buses": [bus.to_dict() for bus in buses]}

    def post(self):
        data = self.parser.parse_args()
        bus = Bus(**data)
        db.session.add(bus)
        db.session.commit()
        return {"message": "Bus added successfully", "bus": bus.to_dict()}, 201

    def put(self, bus_id):
        data = self.parser.parse_args()
        bus = Bus.query.get(bus_id)
        if not bus:
            return {"message": "Bus not found"}, 404
        
        for key, value in data.items():
            setattr(bus, key, value)
        db.session.commit()
        return {"message": "Bus updated successfully", "bus": bus.to_dict()}

    def delete(self, bus_id):
        bus = Bus.query.get(bus_id)
        if not bus:
            return {"message": "Bus not found"}, 404
        db.session.delete(bus)
        db.session.commit()
        return {"message": "Bus deleted successfully"}, 200


# Booking Resource
class BookingResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('bus_id', type=int, required=True, help='Bus ID is required')
    parser.add_argument('seat_number', type=int, required=True, help='Seat number is required')
    parser.add_argument('travel_date', required=True, help='Travel date is required (YYYY-MM-DD)')

    @jwt_required()
    def get(self, booking_id=None):
        user_id = get_jwt_identity()
        if booking_id:
            booking = Booking.query.get(booking_id)
            if not booking or booking.user_id != user_id:
                return {"message": "Booking not found"}, 404
            return {"message": "Booking retrieved", "booking": booking.to_dict()}
        
        bookings = Booking.query.filter_by(user_id=user_id).all()
        return {"message": "Bookings retrieved", "bookings": [b.to_dict() for b in bookings]}

    @jwt_required()
    def post(self):
        data = self.parser.parse_args()
        user_id = get_jwt_identity()
        
        bus = Bus.query.get(data['bus_id'])
        if not bus:
            return {"message": "Bus not found"}, 404
        if data['seat_number'] > bus.total_seats or data['seat_number'] < 1:
            return {"message": "Invalid seat number"}, 400

        # Check if the seat is already booked on the selected travel date
        existing_booking = Booking.query.filter_by(
            bus_id=data['bus_id'], seat_number=data['seat_number'], travel_date=data['travel_date']
        ).first()
        if existing_booking:
            return {"message": "Seat already booked on this travel date"}, 400

        booking = Booking(
            user_id=user_id,
            bus_id=data['bus_id'],
            seat_number=data['seat_number'],
            travel_date=data['travel_date']
        )
        bus.available_seats -= 1
        db.session.add(booking)
        db.session.commit()
        return {"message": "Booking successful", "booking": booking.to_dict()}

    @jwt_required()
    def put(self, booking_id):
        data = self.parser.parse_args()
        user_id = get_jwt_identity()

        booking = Booking.query.get(booking_id)
        if not booking or booking.user_id != user_id:
            return {"message": "Booking not found"}, 404

        # Update booking details (e.g., travel date)
        booking.travel_date = data['travel_date']
        booking.seat_number = data['seat_number']
        db.session.commit()
        return {"message": "Booking updated successfully", "booking": booking.to_dict()}

    @jwt_required()
    def delete(self, booking_id):
        user_id = get_jwt_identity()
        booking = Booking.query.get(booking_id)
        if not booking or booking.user_id != user_id:
            return {"message": "Booking not found"}, 404
        
        # Update bus availability on deletion
        booking.bus.available_seats += 1
        db.session.delete(booking)
        db.session.commit()
        return {"message": "Booking canceled successfully"}
