from flask import Flask
from flask_restful import Api
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_cors import CORS
from models import db, User, Booking, Bus
from resources import UserResource, LoginResource, LogoutResource, SignUpResource, BusResource, BookingResource

app = Flask(__name__)

# Enable cross-origin requests
CORS(app)

# Configuration
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'  # Change to your secret key
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'  # Update to your actual database URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
db.init_app(app)
migrate = Migrate(app, db)

# Initialize API
api = Api(app)

# User-related endpoints
api.add_resource(UserResource, '/users', '/users/<int:user_id>')  
api.add_resource(SignUpResource, '/signup')
api.add_resource(LoginResource, '/login')
api.add_resource(LogoutResource, '/logout')

# Bus-related endpoints
api.add_resource(BusResource, '/buses', '/buses/<int:bus_id>')

# Booking-related endpoints
api.add_resource(BookingResource, '/bookings', '/bookings/<int:booking_id>')

if __name__ == '__main__':
    app.run(port=5001 ,debug=True)
