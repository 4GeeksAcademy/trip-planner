from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String(120), unique=False, nullable=False)
    username= db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    number = db.Column(db.String(120), unique=False, nullable=False)
    more_info = db.Column(db.String(200), unique=False, nullable=True)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __init__(self, name, username, email, password, number, more_info, is_active):
        self.name = name
        self.username = username
        self.email = email
        self.password = password
        self.number = number
        self.more_info = more_info
        self.is_active = True


    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "username": self.username,
            "email": self.email,
            "number": self.number,
            "more_info": self.more_info
            # do not serialize the password, its a security breach
        }
