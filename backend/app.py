from flask import Flask, jsonify
from flask_restful import Api
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_cors import CORS  # Import Flask-CORS
from models import db, User
from resources import UserResource, LoginResource, LogoutResource, SignUpResource

app = Flask(__name__)

# Initialize Flask-CORS to allow cross-origin requests
CORS(app)  # This enables CORS for all routes and origins by default

# Flask-JWT-Extended Config
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'  # Change to a secret key of your choice

# Flask Config
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'  # Change to your actual database URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize Extensions
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
db.init_app(app)

# Initialize Migrate
migrate = Migrate(app, db)

# Initialize API
api = Api(app)

# Add Resources
api.add_resource(UserResource, '/users', '/users/<int:user_id>')  
api.add_resource(LoginResource, '/login')
api.add_resource(LogoutResource, '/logout')
api.add_resource(SignUpResource, '/signup')


if __name__ == '__main__':
    app.run(debug=True)
