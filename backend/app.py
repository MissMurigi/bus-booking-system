from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS
from resources import UserResource, BusResource, ScheduleResource, BookingResource, PaymentResource, LoginResource, RegistrationResource
from models import db, User, Bus, Schedule, Booking, Payment
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
from datetime import timedelta
import os

# Load environment variables from .env
load_dotenv()

# Initialize the Flask application
app = Flask(__name__)

jwt = JWTManager(app)

# Enable CORS
CORS(app)

# Configure the database URI from .env file
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'your-fallback-secret-key')  # Use environment variable or fallback
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1) 

# Verify if DATABASE_URL is correctly loaded
if not app.config['SQLALCHEMY_DATABASE_URI']:
    raise RuntimeError("DATABASE_URL is not set in the .env file or environment variables.")

# Initialize Flask extensions
db.init_app(app)
migrate = Migrate(app, db)
api = Api(app)

# Index route
class Index(Resource):
    def get(self):
        return {"message": "Welcome to Our Bus Booking System"}

# Register API resources
api.add_resource(Index, '/')
api.add_resource(UserResource, '/users', '/users/<int:user_id>')
api.add_resource(LoginResource, '/users/login')
api.add_resource(RegistrationResource, '/users/register')
api.add_resource(BusResource, '/buses', '/buses/<int:bus_id>')
api.add_resource(ScheduleResource, '/schedule', '/schedule/<int:schedule_id>')
api.add_resource(BookingResource, '/booking', '/booking/<int:booking_id>')
api.add_resource(PaymentResource, '/payment', '/payment/<int:payment_id>')

# Main entry point
if __name__ == '__main__':
    app.run(debug=True)
