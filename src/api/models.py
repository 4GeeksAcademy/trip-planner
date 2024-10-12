from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, ForeignKey, Integer, String, Float, Boolean

db = SQLAlchemy()

class User(db.Model):
    """Almacena la información del usuario, tiene relaciones de: 1 a muchos con Grupo,
    1 a muchos con Comentarios, 1 a muchos con Likes/ User puede tener múltiples grupos, comentarios y likes"""
    __tablename__ = 'users'  
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    username = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    number = db.Column(db.String(120), nullable=False)
    more_info = db.Column(db.String(200), nullable=True)
    is_active = db.Column(db.Boolean, default=True, nullable=False)

    # Relación muchos a muchos con Grupo
    grupos = db.relationship('Grupo', secondary='group_association', backref='users', lazy=True)

    def __init__(self, name, username, email, password, number, more_info=None, is_active=True):
        self.name = name
        self.username = username
        self.email = email
        self.password = password
        self.number = number
        self.more_info = more_info
        self.is_active = is_active

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "username": self.username,
            "email": self.email,
            "number": self.number,
            "more_info": self.more_info,
            "is_active": self.is_active  
        }

class Viaje(db.Model):
    """Almacena información acerca de los viajes, tiene relaciones de:
    1 a muchos con Grupo, 1 a muchos con Actividad/ Viaje puede tener múltiples grupos y actividades"""
    __tablename__ = 'viajes'
    id = db.Column(db.Integer, primary_key=True)
    destino = db.Column(db.String(120), nullable=False)

    def __init__(self, destino):
        self.destino = destino

    def serialize(self):
        return {
            "id": self.id,
            "destino": self.destino
        }

class Grupo(db.Model):
    """Almacena información sobre los grupos que se formaron para el viaje, las relaciones
    son de: Muchos a 1 con User, Muchos a 1 con Viaje/ Grupo está asociado a un único User y un único Viaje"""
    __tablename__ = 'grupos'
    id = db.Column(db.Integer, primary_key=True)
    group_name = db.Column(db.String(120), nullable=False)
    viaje_id = db.Column(db.Integer, db.ForeignKey('viajes.id'), nullable=False)
    viaje = db.relationship("Viaje", backref='grupos', lazy=True)  # Relación de Viaje a Grupo

    def __init__(self, group_name, viaje_id):
        self.group_name = group_name
        self.viaje_id = viaje_id

    def serialize(self):
        return {
            "id": self.id,
            "group_name": self.group_name,
            "viaje_id": self.viaje_id
        }

# Tabla de asociación
group_association = db.Table('group_association',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('grupo_id', db.Integer, db.ForeignKey('grupos.id'))
)

class Actividad(db.Model):
    """Almacena información acerca de las actividades realizadas durante un viaje
    tiene relaciones de: Muchos a 1 con Viaje, 1 a muchos con Comentarios, 1 a muchos con Likes/
    Actividad está asociada a un único Viaje, pero puede tener muchos Comentarios y likes"""
    __tablename__ = 'actividades'
    id = db.Column(db.Integer, primary_key=True)
    activity_name = db.Column(db.String(120), unique=True, nullable=False)
    precio = db.Column(db.Float, nullable=True)
    moneda = db.Column(db.String(120), nullable=True)
    imagenes = db.Column(db.String(360), nullable=False)
    duracion = db.Column(db.Integer, nullable=True)
    viaje_id = db.Column(db.Integer, db.ForeignKey('viajes.id'), nullable=False)
    viaje = db.relationship("Viaje", backref='actividades', lazy=True)  # Relación de Viaje a Actividad
    descripcion = db.Column(db.String(360), nullable=True)
    likes = db.Column(db.Integer, default=0, nullable=False) 
    comentarios = db.relationship("Comentarios", backref='actividad', lazy=True)  # Relación de Actividad a Comentarios

    def __init__(self, activity_name, precio, moneda, imagenes, duracion, viaje_id, descripcion=None, likes=0):
        self.activity_name = activity_name
        self.precio = precio
        self.moneda = moneda
        self.imagenes = imagenes
        self.duracion = duracion
        self.viaje_id = viaje_id
        self.descripcion = descripcion
        self.likes = likes

    def serialize(self):
        return {
            "id": self.id,
            "activity_name": self.activity_name,
            "precio": self.precio,
            "moneda": self.moneda,
            "imagenes": self.imagenes,
            "duracion": self.duracion,
            "viaje_id": self.viaje_id,
            "descripcion": self.descripcion,
            "likes": self.likes
        }

class Comentarios(db.Model):
    """Almacena comentarios hechos por los usuarios sobre las actividades, tiene relación de:
    Muchos a 1 con Actividad, Muchos a 1 con User/ Comentarios está asociado a una única actividad y un único user"""
    __tablename__ = 'comentarios'
    id = db.Column(db.Integer, primary_key=True)
    activity_id = db.Column(db.Integer, db.ForeignKey('actividades.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship("User", backref='comentarios', lazy=True)  # Relación de User a Comentarios
    comentario = db.Column(db.String(500), nullable=True)

    def __init__(self, activity_id, user_id, comentario):
        self.activity_id = activity_id
        self.user_id = user_id
        self.comentario = comentario

    def serialize(self):
        return {
            "id": self.id,
            "activity_id": self.activity_id,
            "user_id": self.user_id,
            "comentario": self.comentario
        }

class Likes(db.Model):
    """Almacena los Likes de los usuarios acerca de las actividades realizadas, tiene relaciones de:
    Muchos a 1 con Actividad, Muchos a 1 con User/ Likes está asociado a una única actividad y un único user"""
    __tablename__ = 'likes'
    id = db.Column(db.Integer, primary_key=True)
    activity_id = db.Column(db.Integer, db.ForeignKey('actividades.id'), nullable=False)
    actividad = db.relationship("Actividad", backref='likes', lazy=True)  # Relación de Actividad a Likes
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship("User", backref='likes', lazy=True)  # Relación de User a Likes

    def __init__(self, activity_id, user_id):
        self.activity_id = activity_id
        self.user_id = user_id

    def serialize(self):
        return {
            "id": self.id,
            "activity_id": self.activity_id,
            "user_id": self.user_id
        }
