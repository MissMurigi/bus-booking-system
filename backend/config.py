import os

class Config:
    # General Configurations
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'a_default_secret_key'  # Change this to a secure key
    DEBUG = os.environ.get('DEBUG', 'False').lower() in ['true', '1']

    # Database Configurations
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///site.db'  # Change to your database URL
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Optional: Other Configurations
    # You can add more configuration variables as needed
    # For example, email settings, logging settings, etc.

# Create a function to load the configuration
def load_config(app):
    app.config.from_object(Config)

# If you want to use this file directly for testing
if __name__ == '__main__':
    from flask import Flask
    app = Flask(__name__)
    load_config(app)
    print(app.config)  # Print the configuration for verification