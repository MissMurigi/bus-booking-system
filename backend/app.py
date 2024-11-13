from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import load_config
from routes import register_routes

app = Flask(__name__)
load_config(app)

# Initialize the database
db = SQLAlchemy(app)

# Register routes
register_routes(app)

if __name__ == '__main__':
    app.run(debug=True)