from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Api,Resource
from resources import UserResource, BusResource,ScheduleResource,BookingResource,PaymentResource # Import resources from resources.py
from models import db
from dotenv import load_dotenv
import os

load_dotenv()


# Initialize the Flask application
app = Flask(__name__)

# Configure the database URI
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
api = Api(app)

# Initialize Flask-Migrate
migrate = Migrate(app, db)

# Initialize app
db.init_app(app)

#Index url
class Index(Resource):
    def get(self):
        return {"message":"Welcome to Our Bus Booking System"}

# Register API resources
api.add_resource(Index,'/')
api.add_resource(UserResource, '/users', '/users/<int:user_id>')
api.add_resource(BusResource, '/buses', '/buses/<int:bus_id>')
api.add_resource(ScheduleResource, '/schedule', '/schedule/<int:schedule_id>')
api.add_resource(BookingResource, '/booking', '/booking/<int:booking_id>')
api.add_resource(PaymentResource, '/payment', '/payment/<int:payment_id>')

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
