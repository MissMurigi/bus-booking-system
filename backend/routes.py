from flask import Blueprint, jsonify, request, abort
from flask_jwt_extended import (
    create_access_token, create_refresh_token, jwt_required,
    get_jwt_identity, set_access_cookies, unset_jwt_cookies
)
from flask_cors import cross_origin
from app.models import User, Pet, Breed, PetType, Review, Reply, Adoption, Favorite, AdoptionRequest
from app.extensions import db

routes_app = Blueprint('routes_app', _name_)

# Cross-Origin Resource Sharing (CORS) headers
@routes_app.after_request
@cross_origin()
def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

# ---------- USER ROUTES ----------
@routes_app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    
    if not data.get('name') or not data.get('email') or not data.get('password'):
        return abort(400, description="Name, email, and password are required.")

    if User.query.filter_by(email=data['email']).first():
        return abort(400, description="Email already registered.")

    new_user = User(name=data['name'], email=data['email'])
    new_user.set_password(data['password'])  # Hash password before saving
    db.session.add(new_user)
    db.session.commit()

    return jsonify(new_user.to_dict()), 201

@routes_app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data.get('email') or not data.get('password'):
        return abort(400, description="Email and password are required.")

    user = User.query.filter_by(email=data['email']).first()

    if user and user.verify_password(data['password']):
        access_token = create_access_token(identity={'id': user.id, 'email': user.email})
        refresh_token = create_refresh_token(identity={'id': user.id, 'email': user.email})

        response = jsonify({
            'access_token': access_token, 
            'refresh_token': refresh_token, 
            'name': user.name
        })
        set_access_cookies(response, access_token)
        return response, 200
    else:
        return abort(401, description="Invalid email or password.")

@routes_app.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh_token():
    identity = get_jwt_identity()
    access_token = create_access_token(identity=identity)
    
    response = jsonify({'access_token': access_token})
    set_access_cookies(response, access_token)
    return response, 200

@routes_app.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    response = jsonify({"message": "Logout successful"})
    unset_jwt_cookies(response)
    return response, 200

@routes_app.route('/check-email', methods=['GET'])
def check_email():
    email = request.args.get('email')

    if not email:
        return abort(400, description="Email is required.")

    existing_user = User.query.filter_by(email=email).first()
    return jsonify({'available': existing_user is None}), 200

@routes_app.route('/users/profile', methods=['GET'])
@jwt_required()
def get_user_profile():
    current_user = get_jwt_identity()
    user = User.query.get_or_404(current_user['id'])
    
    return jsonify({
        'id': user.id,
        'name': user.name,
        'email': user.email
    }), 200

@routes_app.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users]), 200

@routes_app.route('/users/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify(user.to_dict()), 200

# ---------- PET ROUTES ----------
@routes_app.route('/pets', methods=['GET'])
@jwt_required()
def get_pets():
    """
    Get all pets.
    Requires JWT for authorization.
    """
    pets = Pet.query.all()
    return jsonify([pet.to_dict() for pet in pets]), 200

@routes_app.route('/pets', methods=['POST'])
@jwt_required()
def create_pet():
    """
    Create a new pet.
    Requires JWT for authorization.
    Expects a JSON body with name, age, pet_type_id, owner_id, and optionally description and image_url.
    """
    data = request.get_json()
    
    # Check for required fields
    if not all([data.get('name'), data.get('age'), data.get('pet_type_id'), data.get('owner_id')]):
        return abort(400, description="Missing required fields.")
    
    new_pet = Pet(
        name=data['name'],
        age=data['age'],
        description=data.get('description', ''),
        pet_type_id=data['pet_type_id'],
        owner_id=data['owner_id'],
        image_url=data.get('image_url', '')  # Include image_url during creation
    )
    
    db.session.add(new_pet)
    db.session.commit()
    
    return jsonify(new_pet.to_dict()), 201

@routes_app.route('/pets/<int:id>', methods=['GET'])
@jwt_required()
def get_pet(id):
    """
    Get a specific pet by ID.
    Requires JWT for authorization.
    """
    pet = Pet.query.get_or_404(id)
    return jsonify({
        'id': pet.id,
        'name': pet.name,
        'age': pet.age,
        'description': pet.description,
        'pet_type_id': pet.pet_type_id,
        'owner_id': pet.owner_id,
        'image_url': pet.image_url  # Include image_url in the response
    }), 200

@routes_app.route('/pets/<int:id>/image', methods=['PUT'])
@jwt_required()
def update_pet_image(id):
    """
    Update the image URL of a specific pet.
    Requires JWT for authorization.
    Expects a JSON body with image_url.
    """
    pet = Pet.query.get_or_404(id)
    data = request.get_json()
    
    # Check if image_url is provided
    if 'image_url' not in data:
        return abort(400, description="Image URL is required.")
    
    # Update the pet's image URL
    pet.image_url = data['image_url']
    db.session.commit()
    
    return jsonify(pet.to_dict()), 200

@routes_app.route('/pets/<int:id>', methods=['PUT'])
@jwt_required()
def update_pet(id):
    """
    Update a specific pet's details.
    Requires JWT for authorization.
    Expects a JSON body with any combination of name, age, description, pet_type_id, owner_id.
    """
    pet = Pet.query.get_or_404(id)
    data = request.get_json()

    # Update only the fields provided in the request
    pet.name = data.get('name', pet.name)
    pet.age = data.get('age', pet.age)
    pet.description = data.get('description', pet.description)
    pet.pet_type_id = data.get('pet_type_id', pet.pet_type_id)
    pet.owner_id = data.get('owner_id', pet.owner_id)
    
    db.session.commit()
    return jsonify(pet.to_dict()), 200

@routes_app.route('/pets/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_pet(id):
    """
    Delete a specific pet by ID.
    Requires JWT for authorization.
    """
    pet = Pet.query.get_or_404(id)
    db.session.delete(pet)
    try:
        db.session.commit()
        return jsonify({'message': 'Pet deleted successfully.'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400
# ---------- BREED ROUTES ----------
@routes_app.route('/breeds', methods=['GET'])
@jwt_required()
def get_breeds():
    breeds = Breed.query.all()
    return jsonify([breed.to_dict() for breed in breeds]), 200

@routes_app.route('/breeds', methods=['POST'])
@jwt_required()
def create_breed():
    data = request.get_json()

    if not data.get('name'):
        return abort(400, description="Breed name is required.")
    
    new_breed = Breed(name=data['name'])
    db.session.add(new_breed)
    db.session.commit()

    return jsonify(new_breed.to_dict()), 201

# ---------- PET TYPE ROUTES ----------
@routes_app.route('/pet-types', methods=['GET'])
@jwt_required()
def get_pet_types():
    pet_types = PetType.query.all()
    return jsonify([pet_type.to_dict() for pet_type in pet_types]), 200

@routes_app.route('/pet-types', methods=['POST'])
@jwt_required()
def create_pet_type():
    data = request.get_json()

    if not data.get('name'):
        return abort(400, description="Pet type name is required.")
    
    new_pet_type = PetType(name=data['name'])
    db.session.add(new_pet_type)
    db.session.commit()

    return jsonify(new_pet_type.to_dict()), 201

# ---------- REVIEW ROUTES ----------
@routes_app.route('/reviews', methods=['GET'])
@jwt_required()
def get_reviews():
    reviews = Review.query.all()
    return jsonify([review.to_dict() for review in reviews]), 200

@routes_app.route('/reviews', methods=['POST'])
@jwt_required()
def create_review():
    data = request.get_json()
    
    if not all([data.get('content'), data.get('rating'), data.get('user_id'), data.get('pet_id')]):
        return abort(400, description="Missing required fields.")
    
    new_review = Review(
        content=data['content'],
        rating=data['rating'],
        user_id=data['user_id'],
        pet_id=data['pet_id']
    )
    db.session.add(new_review)
    db.session.commit()
    
    return jsonify(new_review.to_dict()), 201

@routes_app.route('/reviews/<int:id>', methods=['GET'])
@jwt_required()
def get_review(id):
    review = Review.query.get_or_404(id)
    return jsonify(review.to_dict()), 200

@routes_app.route('/reviews/<int:id>', methods=['PUT'])
@jwt_required()
def update_review(id):
    review = Review.query.get_or_404(id)
    data = request.get_json()

    review.content = data.get('content', review.content)
    review.rating = data.get('rating', review.rating)

    db.session.commit()
    return jsonify(review.to_dict()), 200

@routes_app.route('/reviews/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_review(id):
    review = Review.query.get_or_404(id)
    db.session.delete(review)
    db.session.commit()
    
    return jsonify({'message': 'Review deleted successfully.'}), 200

# ---------- REPLY ROUTES ----------
@routes_app.route('/replies', methods=['POST'])
@jwt_required()
def create_reply():
    data = request.get_json()
    
    if not all([data.get('content'), data.get('review_id'), data.get('user_id')]):
        return abort(400, description="Missing required fields.")
    
    new_reply = Reply(
        content=data['content'],
        review_id=data['review_id'],
        user_id=data['user_id']
    )
    db.session.add(new_reply)
    db.session.commit()

    return jsonify(new_reply.to_dict()), 201

# ---------- ADOPTION ROUTES ----------
@routes_app.route('/adoptions', methods=['GET'])
@jwt_required()
def get_adoptions():
    adoptions = Adoption.query.all()
    return jsonify([adoption.to_dict() for adoption in adoptions]), 200

@routes_app.route('/adoptions', methods=['POST'])
@jwt_required()
def create_adoption():
    data = request.get_json()
    
    if not all([data.get('pet_id'), data.get('user_id')]):
        return abort(400, description="Missing required fields.")
    
    new_adoption = Adoption(
        pet_id=data['pet_id'],
        user_id=data['user_id'],
        status='Pending'
    )
    db.session.add(new_adoption)
    db.session.commit()
    
    return jsonify(new_adoption.to_dict()), 201

@routes_app.route('/adoptions/<int:id>', methods=['GET'])
@jwt_required()
def get_adoption(id):
    adoption = Adoption.query.get_or_404(id)
    return jsonify(adoption.to_dict()), 200

@routes_app.route('/adoptions/<int:id>', methods=['PUT'])
@jwt_required()
def update_adoption(id):
    adoption = Adoption.query.get_or_404(id)
    data = request.get_json()

    adoption.status = data.get('status', adoption.status)

    db.session.commit()
    return jsonify(adoption.to_dict()), 200

@routes_app.route('/adoptions/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_adoption(id):
    adoption = Adoption.query.get_or_404(id)
    db.session.delete(adoption)
    db.session.commit()
    
    return jsonify({'message': 'Adoption deleted successfully.'}), 200

# ---------- ADOPTION REQUEST ROUTES ----------
@routes_app.route('/adoption-requests', methods=['GET'])
@jwt_required()
def get_adoption_requests():
    adoption_requests = AdoptionRequest.query.all()
    return jsonify([request.to_dict() for request in adoption_requests]), 200

@routes_app.route('/adoption-requests', methods=['POST'])
@jwt_required()
def create_adoption_request():
    data = request.get_json()

    if not all([data.get('pet_id'), data.get('user_id'), data.get('message')]):
        return abort(400, description="Missing required fields.")
    
    new_request = AdoptionRequest(
        pet_id=data['pet_id'],
        user_id=data['user_id'],
        message=data['message'],
        status='Pending'
    )
    db.session.add(new_request)
    db.session.commit()
    
    return jsonify(new_request.to_dict()), 201

@routes_app.route('/adoption-requests/<int:id>', methods=['GET'])
@jwt_required()
def get_adoption_request(id):
    adoption_request = AdoptionRequest.query.get_or_404(id)
    return jsonify(adoption_request.to_dict()), 200

@routes_app.route('/adoption-requests/<int:id>', methods=['PUT'])
@jwt_required()
def update_adoption_request(id):
    adoption_request = AdoptionRequest.query.get_or_404(id)
    data = request.get_json()

    adoption_request.status = data.get('status', adoption_request.status)

    db.session.commit()
    return jsonify(adoption_request.to_dict()), 200

@routes_app.route('/adoption-requests/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_adoption_request(id):
    adoption_request = AdoptionRequest.query.get_or_404(id)
    db.session.delete(adoption_request)
    db.session.commit()
    
    return jsonify({'message': 'Adoption request deleted successfully.'}), 200