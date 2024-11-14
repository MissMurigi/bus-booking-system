import os


class Config:
    # Secret key for signing cookies and other cryptographic operations
    SECRET_KEY = os.environ.get('SECRET_KEY', '9ec3aefda2fb71ca09b2c2ce00448b60')
    
    # Database configuration for SQLAlchemy (using PostgreSQL by default)
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'postgresql://username:password@localhost/dbname')
    SQLALCHEMY_TRACK_MODIFICATIONS = False  # Disable modification tracking for performance

    # JWT configuration
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', '8234447a23636b85520319b5d8b6f025f538f7e3d8fd46384062d394af9aabc9')
    JWT_TOKEN_LOCATION = ['headers']  # Specify where the token can be found (e.g., in headers)
    
    # Token expiration times
    JWT_ACCESS_TOKEN_EXPIRES = 30 * 60  # Access token expiration time in seconds (30 minutes)
    JWT_REFRESH_TOKEN_EXPIRES = 7 * 24 * 60 * 60  # Refresh token expiration time in seconds (7 days)

    # CORS configuration
    CORS_ORIGINS = os.environ.get('CORS_ORIGINS', 'http://localhost:3000')  # Allowed origin
    CORS_SUPPORTS_CREDENTIALS = True  # Allow cookies with cross-origin requests
