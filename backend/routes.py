from flask import Flask, Blueprint, request, jsonify, abort
from models import User, Bus, Route, Booking, Schedule, db
from werkzeug.security import generate_password_hash
from marshmallow import Schema, fields, ValidationError

# Initialize app
app = Flask(__name__)

# Blueprint for users
users_blueprint = Blueprint('users', __name__)
# Blueprint for routes
routes_blueprint = Blueprint('routes', __name__)
# Blueprint for buses
buses_blueprint = Blueprint('buses', __name__)
# Blueprint for schedules
schedules_blueprint = Blueprint('schedules', __name__)
# Blueprint for bookings
bookings_blueprint = Blueprint('bookings', __name__)

# === Schema Definitions ===
class RouteSchema(Schema):
    start_location = fields.String(required=True)
    end_location = fields.String(required=True)
    distance = fields.Float(required=True)

route_schema = RouteSchema()
routes_schema = RouteSchema(many=True)

class UserSchema(Schema):
    username = fields.String(required=True)
    email = fields.Email(required=True)
    password = fields.String(required=True)
    role = fields.String(required=True)

user_schema = UserSchema()

# === Error Handling ===
@app.errorhandler(ValidationError)
def handle_validation_error(e):
    return jsonify({"errors": e.messages}), 400

@app.errorhandler(404)
def handle_404(e):
    return jsonify({"error": str(e)}), 404

@app.errorhandler(Exception)
def handle_exception(e):
    return jsonify({"error": "An unexpected error occurred.", "message": str(e)}), 500

# === User Routes ===
@users_blueprint.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    user_data = user_schema.load(data)
    
    password_hash = generate_password_hash(user_data['password'])
    new_user = User(
        username=user_data['username'],
        email=user_data['email'],
        password_hash=password_hash,
        role=user_data['role']
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.to_dict()), 201

@users_blueprint.route('/users/login', methods=['POST'])
def login_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        return jsonify({"message": "Login successful", "user": user.to_dict()}), 200
    return jsonify({"message": "Invalid email or password"}), 401

# === Route Routes ===
@routes_blueprint.route('/api/routes', methods=['GET'])
def get_routes():
    routes = Route.query.all()
    return jsonify(routes_schema.dump(routes)), 200

@routes_blueprint.route('/api/routes', methods=['POST'])
def create_route():
    data = request.get_json()
    route_data = route_schema.load(data)

    new_route = Route(**route_data)
    db.session.add(new_route)
    db.session.commit()
    return jsonify(new_route.to_dict()), 201

@routes_blueprint.route('/api/routes/<int:route_id>', methods=['GET', 'PUT', 'DELETE'])
def manage_route(route_id):
    route = Route.query.get(route_id)
    if not route:
        abort(404, description="Route not found")

    if request.method == 'GET':
        return jsonify(route.to_dict())
    
    if request.method == 'PUT':
        data = request.get_json()
        route_data = route_schema.load(data, partial=True)
        for key, value in route_data.items():
            setattr(route, key, value)
        db.session.commit()
        return jsonify({"message": "Route updated successfully!"})
    
    if request.method == 'DELETE':
        db.session.delete(route)
        db.session.commit()
        return jsonify({"message": "Route deleted successfully!"})

# === Register Blueprints ===
app.register_blueprint(users_blueprint, url_prefix='/users')
app.register_blueprint(routes_blueprint, url_prefix='/routes')
app.register_blueprint(buses_blueprint, url_prefix='/buses')
app.register_blueprint(schedules_blueprint, url_prefix='/schedules')
app.register_blueprint(bookings_blueprint, url_prefix='/bookings')

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
