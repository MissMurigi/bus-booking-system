from flask import Flask, request, jsonify, abort
from your_app.models import User, Bus, Route, Booking  # Adjust the import based on your project structure
from your_app import db  # Assuming you're using SQLAlchemy for the database

app = Flask(__name__)

# Helper function to validate route data
def validate_route_data(data):
    if 'start_location' not in data or 'end_location' not in data or 'distance' not in data:
        abort(400, description='Invalid data: start_location, end_location, and distance are required.')

# Route to get all routes
@app.route('/api/routes', methods=['GET'])
def get_routes():
    routes = Route.query.all()
    return jsonify([route.to_dict() for route in routes]), 200

# Route to create a new route
@app.route('/api/routes', methods=['POST'])
def create_route():
    data = request.get_json()
    validate_route_data(data)

    new_route = Route(
        start_location=data['start_location'],
        end_location=data['end_location'],
        distance=data['distance']
    )
    
    try:
        db.session.add(new_route)
        db.session.commit()
    except Exception as e:
        db.session.rollback()  # Rollback in case of error
        abort(500, description='Database error: ' + str(e))

    return jsonify(new_route.to_dict()), 201

# Route to get a specific route by ID
@app.route('/api/routes/<int:route_id>', methods=['GET'])
def get_route(route_id):
    route = Route.query.get(route_id)
    if route:
        return jsonify(route.to_dict()), 200
    abort(404, description='Route not found')

# Route to update a route
@app.route('/api/routes/<int:route_id>', methods=['PUT'])
def update_route(route_id):
    route = Route.query.get(route_id)
    if not route:
        abort(404, description='Route not found')

    data = request.get_json()
    validate_route_data(data)  # Validate incoming data
    route.start_location = data.get('start_location', route.start_location)
    route.end_location = data.get('end_location', route.end_location)
    route.distance = data.get('distance', route.distance)

    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()  # Rollback in case of error
        abort(500, description='Database error: ' + str(e))

    return jsonify(route.to_dict()), 200

# Route to delete a route
@app.route('/api/routes/<int:route_id>', methods=['DELETE'])
def delete_route(route_id):
    route = Route.query.get(route_id)
    if route:
        db.session.delete(route)
        db.session.commit()
        return jsonify({'message': 'Route deleted successfully'}), 200
    abort(404, description='Route not found')

# Additional routes for users, buses, and bookings can be added similarly

if __name__ == '__main__':
    app.run(debug=True)