from flask_restful import Resource, reqparse
from flask_bcrypt import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token,jwt_required
from models import db, User


# User registration resource
class UserResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('username', required=True, help='Username is required')
    parser.add_argument('email', required=True, help="Email is required")
    parser.add_argument('password', required=True, help="Password is required")
    parser.add_argument('role', required=True, help="Role is required")

    def get(self, user_id=None):
        if user_id:  # If a user ID is passed, fetch a single user
            user = User.query.get(user_id)
            if not user:
                return {"message": "User not found"}, 404
            return {
                "message": "User details retrieved successfully",
                "user": user.to_dict()
            }

        # If no user ID is passed, return all users
        users = User.query.all()
        return {
            "message": "Users retrieved successfully",
            "users": [user.to_dict() for user in users]
        }

    def post(self):
        data = self.parser.parse_args()

        # Check if the username or email is already taken
        username = User.query.filter_by(username=data['username']).first()
        email = User.query.filter_by(email=data['email']).first()

        if username or email:
            return {"message": "Username or email already taken"}, 422

        # Encrypt the password
        hashed_password = generate_password_hash(data['password']).decode('utf-8')

        # Create new user
        user = User(username=data['username'], email=data['email'], password=hashed_password, role=data['role'])
        db.session.add(user)
        db.session.commit()

        # Generate JWT token
        access_token = create_access_token(identity=user.id)

        return {
            "message": "User created successfully",
            "user": user.to_dict(),
            "access_token": access_token
        }
    
    # SignUp Resource (User Registration)
class SignUpResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('username', required=True, help='Username is required')
    parser.add_argument('email', required=True, help="Email is required")
    parser.add_argument('password', required=True, help="Password is required")
    parser.add_argument('role', required=True, help="Role is required")

    def post(self):
        data = self.parser.parse_args()

        # Check if the username or email is already taken
        username = User.query.filter_by(username=data['username']).first()
        email = User.query.filter_by(email=data['email']).first()

        if username or email:
            return {"message": "Username or email already taken"}, 422

        # Encrypt the password
        hashed_password = generate_password_hash(data['password']).decode('utf-8')

        # Create new user
        user = User(username=data['username'], email=data['email'], password=hashed_password, role=data['role'])
        db.session.add(user)
        db.session.commit()

        # Generate JWT token
        access_token = create_access_token(identity=user.id)

        return {
            "message": "User created successfully",
            "user": user.to_dict(),
            "access_token": access_token
        }


# Login Resource
class LoginResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('email', required=True, help="Email is required")
    parser.add_argument('password', required=True, help="Password is required")

    def post(self):
        data = self.parser.parse_args()

        # Retrieve user based on email
        user = User.query.filter_by(email=data['email']).first()

        if user is None or not check_password_hash(user.password, data['password']):
            return {"message": "Invalid email or password"}, 401

        # Generate JWT token
        access_token = create_access_token(identity=user.id)

        return {
            "message": "Login successful",
            "user": user.to_dict(),
            "access_token": access_token
        }

# Logout Resource (optional)
class LogoutResource(Resource):
    @jwt_required()
    def post(self):
        return {"message": "Logout successful"}, 200
