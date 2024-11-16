from flask import request
from flask_restful import Resource
from models import db, User, Bus, Schedule, Booking, Payment

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
        data = request.json
        try:
            user = User(
                username=data['username'],
                password_hash=data['password_hash'],
                email=data['email'],
                role=data['role']
            )
            db.session.add(user)
            db.session.commit()
            return user.to_dict(), 201
        except Exception as e:
            return {"error": str(e)}, 400

    def put(self, user_id):
        user = User.query.get(user_id)
        if not user:
            return {"message": "User not found"}, 404
        data = request.json
        try:
            user.username = data.get('username', user.username)
            user.password_hash = data.get('password_hash', user.password_hash)
            user.email = data.get('email', user.email)
            user.role = data.get('role', user.role)
            db.session.commit()
            return user.to_dict(), 200
        except Exception as e:
            return {"error": str(e)}, 400

    def delete(self, user_id):
        user = User.query.get(user_id)
        if not user:
            return {"message": "User not found"}, 404
        db.session.delete(user)
        db.session.commit()
        return {"message": "User deleted"}, 200


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
        data = request.json
        try:
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
            return {"error": str(e)}, 400

    def put(self, bus_id):
        bus = Bus.query.get(bus_id)
        if not bus:
            return {"message": "Bus not found"}, 404
        data = request.json
        try:
            bus.number_of_seats = data.get('number_of_seats', bus.number_of_seats)
            bus.cost_per_seat = data.get('cost_per_seat', bus.cost_per_seat)
            bus.route = data.get('route', bus.route)
            bus.status = data.get('status', bus.status)
            db.session.commit()
            return bus.to_dict(), 200
        except Exception as e:
            return {"error": str(e)}, 400

    def delete(self, bus_id):
        bus = Bus.query.get(bus_id)
        if not bus:
            return {"message": "Bus not found"}, 404
        db.session.delete(bus)
        db.session.commit()
        return {"message": "Bus deleted"}, 200


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
        data = request.json
        try:
            schedule = Schedule(
                bus_id=data['bus_id'],
                departure_time=data['departure_time'],
                arrival_time=data['arrival_time'],
                date=data['date'],
                status=data['status']
            )
            db.session.add(schedule)
            db.session.commit()
            return schedule.to_dict(), 201
        except Exception as e:
            return {"error": str(e)}, 400

    def put(self, schedule_id):
        schedule = Schedule.query.get(schedule_id)
        if not schedule:
            return {"message": "Schedule not found"}, 404
        data = request.json
        try:
            schedule.departure_time = data.get('departure_time', schedule.departure_time)
            schedule.arrival_time = data.get('arrival_time', schedule.arrival_time)
            schedule.date = data.get('date', schedule.date)
            schedule.status = data.get('status', schedule.status)
            db.session.commit()
            return schedule.to_dict(), 200
        except Exception as e:
            return {"error": str(e)}, 400

    def delete(self, schedule_id):
        schedule = Schedule.query.get(schedule_id)
        if not schedule:
            return {"message": "Schedule not found"}, 404
        db.session.delete(schedule)
        db.session.commit()
        return {"message": "Schedule deleted"}, 200


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
        data = request.json
        try:
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
            return {"error": str(e)}, 400

    def put(self, booking_id):
        booking = Booking.query.get(booking_id)
        if not booking:
            return {"message": "Booking not found"}, 404
        data = request.json
        try:
            booking.number_of_seats_booked = data.get('number_of_seats_booked', booking.number_of_seats_booked)
            booking.total_price = data.get('total_price', booking.total_price)
            booking.booking_status = data.get('booking_status', booking.booking_status)
            db.session.commit()
            return booking.to_dict(), 200
        except Exception as e:
            return {"error": str(e)}, 400

    def delete(self, booking_id):
        booking = Booking.query.get(booking_id)
        if not booking:
            return {"message": "Booking not found"}, 404
        db.session.delete(booking)
        db.session.commit()
        return {"message": "Booking deleted"}, 200


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
        data = request.json
        try:
            payment = Payment(
                booking_id=data['booking_id'],
                payment_amount=data['payment_amount'],
                payment_status=data['payment_status']
            )
            db.session.add(payment)
            db.session.commit()
            return payment.to_dict(), 201
        except Exception as e:
            return {"error": str(e)}, 400

    def put(self, payment_id):
        payment = Payment.query.get(payment_id)
        if not payment:
            return {"message": "Payment not found"}, 404
        data = request.json
        try:
            payment.payment_amount = data.get('payment_amount', payment.payment_amount)
            payment.payment_status = data.get('payment_status', payment.payment_status)
            db.session.commit()
            return payment.to_dict(), 200
        except Exception as e:
            return {"error": str(e)}, 400

    def delete(self, payment_id):
        payment = Payment.query.get(payment_id)
        if not payment:
            return {"message": "Payment not found"}, 404
        db.session.delete(payment)
        db.session.commit()
        return {"message": "Payment deleted"}, 200
