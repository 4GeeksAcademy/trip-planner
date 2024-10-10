from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, ForeignKey, Integer, String, Enum

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
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

class Viaje(db.Model):
    __tablename__ = 'viajes'
    id = db.Column(db.Integer, primary_key=True)
    destino = db.Column(db.String(120), unique=False, nullable=False)

class Grupo(db.Model):
    __tablename__ = 'grupo'
    id = db.Column(db.Integer, primary_key=True),
    integrantes = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship(User)
    viaje_id = db.Column(db.Integer, db.ForeignKey('grupo.id'))
    viaje = db.relationship(Viaje)

    # tabla de asociacion


class Actividad(db.Model):
    __tablename__ = 'actividad'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    precio = db.Column(db.Integer, unique=False, nullable=True)
    moneda = db.Column(db.String(120), unique=False, nullable=True)
    imagenes = db.Column(db.String(360), unique=False, nullable=False)
    duracion = db.Column(db.Integer, unique=False, nullable=True)
    viaje_id = db.Column(db.Integer, db.ForeignKey('viajes.id'))
    viaje = db.relationship(Viaje)
    descripcion = db.Column(db.String(360), unique=False, nullable=True)
    likes =  db.Column(db.Integer, unique=False, nullable=True)
    comentarios_id = db.Column(db.Integer, db.ForeignKey('comentarios.id'))


class Comentarios(db.Model):
     __tablename__ = 'commentario'
     id = db.Column(db.Integer, primary_key=True)
     activity_id = db.Column(db.Integer, db.ForeignKey('actividades.id'))
     author_id = db.Column(db.Integer, db.ForeignKey('user.username'))
     comentario = db.Column(db.String(120), unique=False, nullable=True)

class Likes(db.Model):
     __tablename__ = 'like'
     id = db.Column(db.Integer, primary_key=True)
     activity_id = db.Column(db.Integer, db.ForeignKey('actividades.id'))
     author_id = Column(Integer, ForeignKey('user.username'))
