from flask import request
from flask_restful import Resource,reqparse
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from datetime import datetime
from models import db, User, Bus, Schedule, Booking, Payment
from sqlalchemy.exc import IntegrityError



class UserResource(Resource):
    def get(self, user_id=None):
        if user_id:
            user = User.query.get(user_id)
            if not user:
                return {"message": "User not found"}, 404
            return user.to_dict(), 200
        users = User.query.all()
        return [user.to_dict() for user in users], 200

    def post(self):
        data = request.get_json()
        try:
            username = data.get('username')
            password = data.get('password')
            email = data.get('email')
            role = data.get('role')

            if not all([username, password, email, role]):
                return {'message': 'All fields are required'}, 400

            password_hash = generate_password_hash(password)

            user = User(
                username=username,
                password_hash=password_hash,
                email=email,
                role=role
            )
            db.session.add(user)
            db.session.commit()
            return user.to_dict(), 201
        except Exception as e:
            return {'message': f"Error creating user: {str(e)}"}, 400

    def put(self, user_id):
        user = User.query.get(user_id)
        if not user:
            return {"message": "User not found"}, 404

        data = request.get_json()
        try:
            user.username = data.get('username', user.username)
            user.email = data.get('email', user.email)
            user.role = data.get('role', user.role)

            if 'password' in data:
                user.password_hash = generate_password_hash(data['password'])

            db.session.commit()
            return user.to_dict(), 200
        except Exception as e:
            return {'message': f"Error updating user: {str(e)}"}, 400

    def delete(self, user_id):
        user = User.query.get(user_id)
        if not user:
            return {"message": "User not found"}, 404

        try:
            db.session.delete(user)
            db.session.commit()
            return {"message": "User deleted successfully"}, 204
        except Exception as e:
            return {'message': f"Error deleting user: {str(e)}"}, 400
            
class RegistrationResource(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('username', type=str, required=True, help='Username is required')
        self.reqparse.add_argument('email', type=str, required=True, help='Email is required')
        self.reqparse.add_argument('password', type=str, required=True, help='Password is required')
        self.reqparse.add_argument('role', type=str, required=True, choices=('customer', 'driver', 'admin'), help='Valid role is required')
        super(RegistrationResource, self).__init__()

    def post(self):
        args = self.reqparse.parse_args()

        # Check if username or email already exists
        if User.query.filter((User.username == args['username']) | (User.email == args['email'])).first():
            return {'message': 'Username or email already exists'}, 400

        # Create new user
        new_user = User(
            username=args['username'],
            email=args['email'],
            role=args['role']
        )
        new_user.set_password(args['password'])

        try:
            db.session.add(new_user)
            db.session.commit()
            return {'message': 'User created successfully', 'user': new_user.to_dict()}, 201
        except IntegrityError:
            db.session.rollback()
            return {'message': 'An error occurred while creating the user'}, 500
        except Exception as e:
            db.session.rollback()
            return {'message': f'An unexpected error occurred: {str(e)}'}, 500


class LoginResource(Resource):
    def post(self):
        # Check if the request is JSON
        if not request.is_json:
            return {"message": "Request must be JSON"}, 415

        data = request.get_json()
        try:
            username = data.get('username')
            password = data.get('password')

            if not username or not password:
                return {"message": "Username and password are required"}, 400

            user = User.query.filter_by(username=username).first()
            if not user or not check_password_hash(user.password_hash, password):
                return {"message": "Invalid username or password"}, 401

            access_token = create_access_token(identity={"user_id": user.user_id, "role": user.role})
            return {"access_token": access_token, "message": "Login successful"}, 200
        except Exception as e:
            return {"message": f"Error during login: {str(e)}"}, 500



class BusResource(Resource):
    def get(self, bus_id=None):
        if bus_id:
            bus = Bus.query.get(bus_id)
            if not bus:
                return {"message": "Bus not found"}, 404
            return bus.to_dict(), 200
        buses = Bus.query.all()
        return [bus.to_dict() for bus in buses], 200

    def post(self):
        data = request.get_json()
        try:
            required_fields = ['driver_id', 'number_of_seats', 'cost_per_seat', 'route', 'status']
            if not all(field in data for field in required_fields):
                return {'message': 'All fields are required'}, 400

            bus = Bus(
                driver_id=data['driver_id'],
                number_of_seats=data['number_of_seats'],
                cost_per_seat=data['cost_per_seat'],
                route=data['route'],
                status=data['status']
            )
            db.session.add(bus)
            db.session.commit()
            return bus.to_dict(), 201
        except Exception as e:
            return {'message': f"Error creating bus: {str(e)}"}, 400

    def put(self, bus_id):
        bus = Bus.query.get(bus_id)
        if not bus:
            return {"message": "Bus not found"}, 404

        data = request.get_json()
        try:
            bus.number_of_seats = data.get('number_of_seats', bus.number_of_seats)
            bus.cost_per_seat = data.get('cost_per_seat', bus.cost_per_seat)
            bus.route = data.get('route', bus.route)
            bus.status = data.get('status', bus.status)

            db.session.commit()
            return bus.to_dict(), 200
        except Exception as e:
            return {'message': f"Error updating bus: {str(e)}"}, 400

    def delete(self, bus_id):
        bus = Bus.query.get(bus_id)
        if not bus:
            return {"message": "Bus not found"}, 404
        try:
            db.session.delete(bus)
            db.session.commit()
            return {"message": "Bus deleted successfully"}, 204
        except Exception as e:
            return {'message': f"Error deleting bus: {str(e)}"}, 400


class ScheduleResource(Resource):
    def get(self, schedule_id=None):
        if schedule_id:
            schedule = Schedule.query.get(schedule_id)
            if not schedule:
                return {"message": "Schedule not found"}, 404
            return schedule.to_dict(), 200
        schedules = Schedule.query.all()
        return [schedule.to_dict() for schedule in schedules], 200

    def post(self):
        data = request.get_json()
        try:
            required_fields = ['bus_id', 'departure_time', 'arrival_time', 'date', 'status']
            if not all(field in data for field in required_fields):
                return {'message': 'All fields are required'}, 400

            schedule = Schedule(
                bus_id=data['bus_id'],
                departure_time=datetime.strptime(data['departure_time'], '%Y-%m-%d %H:%M:%S'),
                arrival_time=datetime.strptime(data['arrival_time'], '%Y-%m-%d %H:%M:%S'),
                date=datetime.strptime(data['date'], '%Y-%m-%d').date(),
                status=data['status']
            )
            db.session.add(schedule)
            db.session.commit()
            return schedule.to_dict(), 201
        except ValueError as ve:
            return {'message': f"Invalid date format: {str(ve)}"}, 400
        except Exception as e:
            return {'message': f"Error creating schedule: {str(e)}"}, 400

    def put(self, schedule_id):
        schedule = Schedule.query.get(schedule_id)
        if not schedule:
            return {"message": "Schedule not found"}, 404

        data = request.get_json()
        try:
            schedule.departure_time = datetime.strptime(data.get('departure_time', schedule.departure_time.strftime('%Y-%m-%d %H:%M:%S')), '%Y-%m-%d %H:%M:%S')
            schedule.arrival_time = datetime.strptime(data.get('arrival_time', schedule.arrival_time.strftime('%Y-%m-%d %H:%M:%S')), '%Y-%m-%d %H:%M:%S')
            schedule.date = datetime.strptime(data.get('date', schedule.date.strftime('%Y-%m-%d')), '%Y-%m-%d').date()
            schedule.status = data.get('status', schedule.status)

            db.session.commit()
            return schedule.to_dict(), 200
        except Exception as e:
            return {'message': f"Error updating schedule: {str(e)}"}, 400

    def delete(self, schedule_id):
        schedule = Schedule.query.get(schedule_id)
        if not schedule:
            return {"message": "Schedule not found"}, 404
        try:
            db.session.delete(schedule)
            db.session.commit()
            return {"message": "Schedule deleted successfully"}, 204
        except Exception as e:
            return {'message': f"Error deleting schedule: {str(e)}"}, 400


class BookingResource(Resource):
    def get(self, booking_id=None):
        if booking_id:
            booking = Booking.query.get(booking_id)
            if not booking:
                return {"message": "Booking not found"}, 404
            return booking.to_dict(), 200
        bookings = Booking.query.all()
        return [booking.to_dict() for booking in bookings], 200

    def post(self):
        data = request.get_json()
        try:
            required_fields = ['customer_id', 'schedule_id', 'number_of_seats_booked', 'total_price', 'booking_status']
            if not all(field in data for field in required_fields):
                return {'message': 'All fields are required'}, 400

            if not isinstance(data['number_of_seats_booked'], int) or not isinstance(data['total_price'], (int, float)):
                return {'message': 'Invalid data types for number_of_seats_booked or total_price'}, 400

            booking = Booking(
                customer_id=data['customer_id'],
                schedule_id=data['schedule_id'],
                number_of_seats_booked=data['number_of_seats_booked'],
                total_price=data['total_price'],
                booking_status=data['booking_status']
            )
            db.session.add(booking)
            db.session.commit()
            return booking.to_dict(), 201
        except Exception as e:
            return {'message': f"Error creating booking: {str(e)}"}, 400

    def put(self, booking_id):
        booking = Booking.query.get(booking_id)
        if not booking:
            return {"message": "Booking not found"}, 404

        data = request.get_json()
        try:
            booking.number_of_seats_booked = data.get('number_of_seats_booked', booking.number_of_seats_booked)
            booking.total_price = data.get('total_price', booking.total_price)
            booking.booking_status = data.get('booking_status', booking.booking_status)

            db.session.commit()
            return booking.to_dict(), 200
        except Exception as e:
            return {'message': f"Error updating booking: {str(e)}"}, 400

    def delete(self, booking_id):
        booking = Booking.query.get(booking_id)
        if not booking:
            return {"message": "Booking not found"}, 404
        try:
            db.session.delete(booking)
            db.session.commit()
            return {"message": "Booking deleted successfully"}, 204
        except Exception as e:
            return {'message': f"Error deleting booking: {str(e)}"}, 400


class PaymentResource(Resource):
    def get(self, payment_id=None):
        if payment_id:
            payment = Payment.query.get(payment_id)
            if not payment:
                return {"message": "Payment not found"}, 404
            return payment.to_dict(), 200
        payments = Payment.query.all()
        return [payment.to_dict() for payment in payments], 200

    def post(self):
        data = request.get_json()
        try:
            required_fields = ['booking_id', 'payment_amount', 'payment_status']
            if not all(field in data for field in required_fields):
                return {'message': 'All fields are required'}, 400

            payment = Payment(
                booking_id=data['booking_id'],
                payment_amount=data['payment_amount'],
                payment_status=data['payment_status']
            )
            db.session.add(payment)
            db.session.commit()
            return payment.to_dict(), 201
        except Exception as e:
            return {'message': f"Error creating payment: {str(e)}"}, 400

    def put(self, payment_id):
        payment = Payment.query.get(payment_id)
        if not payment:
            return {"message": "Payment not found"}, 404

        data = request.get_json()
        try:
            payment.payment_amount = data.get('payment_amount', payment.payment_amount)
            payment.payment_status = data.get('payment_status', payment.payment_status)

            db.session.commit()
            return payment.to_dict(), 200
        except Exception as e:
            return {'message': f"Error updating payment: {str(e)}"}, 400

    def delete(self, payment_id):
        payment = Payment.query.get(payment_id)
        if not payment:
            return {"message": "Payment not found"}, 404
        try:
            db.session.delete(payment)
            db.session.commit()
            return {"message": "Payment deleted successfully"}, 204
        except Exception as e:
            return {'message': f"Error deleting payment: {str(e)}"}, 400
