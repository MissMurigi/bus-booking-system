from flask import Flask, Blueprint, request, jsonify, abort
from models import User, Bus, Route, Booking, Schedule  # Adjust imports based on your models
from app import db  # Ensure db is correctly imported

# Initialize the Flask app
app = Flask(__name__)

# Create Blueprint for API routes
api = Blueprint('api', __name__)

# === Route Helper Functions ===

# Validate route data for creating and updating routes
def validate_route_data(data):
    if 'start_location' not in data or 'end_location' not in data or 'distance' not in data:
        abort(400, description="Invalid data: 'start_location', 'end_location', and 'distance' are required.")

# === Route Routes ===

# Get all routes
@api.route('/api/routes', methods=['GET'])
def get_routes():
    routes = Route.query.all()
    return jsonify([route.to_dict() for route in routes]), 200

# Create a new route
@api.route('/api/routes', methods=['POST'])
def create_route():
    data = request.get_json()
    validate_route_data(data)

    new_route = Route(
        start_location=data['start_location'],
        end_location=data['end_location'],
        distance=data['distance']
    )
    db.session.add(new_route)
    db.session.commit()
    return jsonify(new_route.to_dict()), 201

# Get a specific route by ID
@api.route('/api/routes/<int:route_id>', methods=['GET'])
def get_route(route_id):
    route = Route.query.get(route_id)
    if not route:
        return jsonify({"message": "Route not found"}), 404
    return jsonify(route.to_dict())

# Update a route by ID
@api.route('/api/routes/<int:route_id>', methods=['PUT'])
def update_route(route_id):
    route = Route.query.get(route_id)
    if not route:
        return jsonify({"message": "Route not found"}), 404

    data = request.get_json()
    validate_route_data(data)
    route.start_location = data.get('start_location', route.start_location)
    route.end_location = data.get('end_location', route.end_location)
    route.distance = data.get('distance', route.distance)
    db.session.commit()
    return jsonify({"message": "Route updated successfully!"})

# Delete a route by ID
@api.route('/api/routes/<int:route_id>', methods=['DELETE'])
def delete_route(route_id):
    route = Route.query.get(route_id)
    if not route:
        return jsonify({"message": "Route not found"}), 404

    db.session.delete(route)
    db.session.commit()
    return jsonify({"message": "Route deleted successfully!"})

# === Bus Routes ===

@api.route('/api/buses', methods=['POST'])
def register_bus():
    data = request.get_json()
    new_bus = Bus(name=data['name'], route=data['route'])
    db.session.add(new_bus)
    db.session.commit()
    return jsonify({"message": "Bus registered successfully!"}), 201

@api.route('/api/buses', methods=['GET'])
def get_buses():
    buses = Bus.query.all()
    return jsonify([bus.to_dict() for bus in buses])

@api.route('/api/buses/<int:id>', methods=['GET'])
def get_bus(id):
    bus = Bus.query.get(id)
    if not bus:
        return jsonify({"message": "Bus not found"}), 404
    return jsonify(bus.to_dict())

@api.route('/api/buses/<int:id>', methods=['PUT'])
def update_bus(id):
    bus = Bus.query.get(id)
    if not bus:
        return jsonify({"message": "Bus not found"}), 404

    data = request.get_json()
    bus.name = data.get('name', bus.name)
    bus.route = data.get('route', bus.route)
    db.session.commit()
    return jsonify({"message": "Bus updated successfully!"})

@api.route('/api/buses/<int:id>', methods=['DELETE'])
def delete_bus(id):
    bus = Bus.query.get(id)
    if not bus:
        return jsonify({"message": "Bus not found"}), 404

    db.session.delete(bus)
    db.session.commit()
    return jsonify({"message": "Bus deleted successfully!"})

# === Schedule Routes ===

@api.route('/api/schedules', methods=['POST'])
def schedule_bus():
    data = request.get_json()
    new_schedule = Schedule(bus_id=data['bus_id'], departure_time=data['departure_time'], arrival_time=data['arrival_time'])
    db.session.add(new_schedule)
    db.session.commit()
    return jsonify({"message": "Bus scheduled successfully!"}), 201

@api.route('/api/schedules', methods=['GET'])
def get_schedules():
    schedules = Schedule.query.all()
    return jsonify([schedule.to_dict() for schedule in schedules])

@api.route('/api/schedules/<int:id>', methods=['GET'])
def get_schedule(id):
    schedule = Schedule.query.get(id)
    if not schedule:
        return jsonify({"message": "Schedule not found"}), 404
    return jsonify(schedule.to_dict())

@api.route('/api/schedules/<int:id>', methods=['PUT'])
def update_schedule(id):
    schedule = Schedule.query.get(id)
    if not schedule:
        return jsonify({"message": "Schedule not found"}), 404

    data = request.get_json()
    schedule.departure_time = data.get('departure_time', schedule.departure_time)
    schedule.arrival_time = data.get('arrival_time', schedule.arrival_time)
    db.session.commit()
    return jsonify({"message": "Schedule updated successfully!"})

@api.route('/api/schedules/<int:id>', methods=['DELETE'])
def delete_schedule(id):
    schedule = Schedule.query.get(id)
    if not schedule:
        return jsonify({"message": "Schedule not found"}), 404

    db.session.delete(schedule)
    db.session.commit()
    return jsonify({"message": "Schedule deleted successfully!"})

# === Booking Routes ===

@api.route('/api/bookings', methods=['POST'])
def create_booking():
    data = request.get_json()
    new_booking = Booking(user_id=data['user_id'], bus_id=data['bus_id'], seats=data['seats'])
    db.session.add(new_booking)
    db.session.commit()
    return jsonify({"message": "Booking created successfully!"}), 201

@api.route('/api/bookings', methods=['GET'])
def get_bookings():
    bookings = Booking.query.all()
    return jsonify([booking.to_dict() for booking in bookings])

@api.route('/api/bookings/<int:id>', methods=['GET'])
def get_booking(id):
    booking = Booking.query.get(id)
    if not booking:
        return jsonify({"message": "Booking not found"}), 404
    return jsonify(booking.to_dict())

@api.route('/api/bookings/<int:id>', methods=['PUT'])
def update_booking(id):
    booking = Booking.query.get(id)
    if not booking:
        return jsonify({"message": "Booking not found"}), 404

    data = request.get_json()
    booking.seats = data.get('seats', booking.seats)
    db.session.commit()
    return jsonify({"message": "Booking updated successfully!"})

@api.route('/api/bookings/<int:id>', methods=['DELETE'])
def delete_booking(id):
    booking = Booking.query.get(id)
    if not booking:
        return jsonify({"message": "Booking not found"}), 404

    db.session.delete(booking)
    db.session.commit()
    return jsonify({"message": "Booking deleted successfully!"})

# Register Blueprint
app.register_blueprint(api)

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
