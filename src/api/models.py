from flask_sqlalchemy import SQLAlchemy


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
    salt = db.Column(db.String(80), unique=False, nullable=False)
    more_info = db.Column(db.String(200), nullable=True)
    is_active = db.Column(db.Boolean, default=True, nullable=False)

    profile_image_url = db.Column(db.String(360), nullable=True)

    # RELACIONES
    grupos = db.relationship('Grupo', back_populates='user', cascade="all, delete-orphan", lazy=True)
    viajes = db.relationship('Viaje', back_populates='user', cascade="all, delete-orphan", lazy=True)
    comentarios = db.relationship('Comentarios', back_populates='user', cascade="all, delete-orphan", lazy=True)
    likes = db.relationship('Likes', back_populates='user', cascade="all, delete-orphan", lazy=True)


    def __init__(self, name, username, email, password, salt, profile_image_url, more_info=None, is_active=False):
        self.name = name
        self.username = username
        self.email = email
        self.password = password
        self.salt= salt
        self.profile_image_url = profile_image_url
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
            "more_info": self.more_info,
            "is_active": self.is_active,
            "grupos" : [grupo.serialize() for grupo in self.grupos],
            # "comentarios" : [comentario.serialize() for comentario in self.comentarios],
            "likes" : [like.serialize() for like in self.likes],
            "profile_image_url": self.profile_image_url,
            "viajes" : [viaje.serialize() for viaje in self.viajes],

        }

class Viaje(db.Model):
    """Almacena información acerca de los viajes, tiene relaciones de:
    1 a muchos con Grupo, 1 a muchos con Actividad/ Viaje puede tener múltiples grupos y actividades"""
    __tablename__ = 'viajes'
    id = db.Column(db.Integer, primary_key=True)
    destino = db.Column(db.String(120), nullable=False)
    fecha_inicio= db.Column(db.Date, nullable=False)
    fecha_fin= db.Column(db.Date, nullable=False)
    presupuesto_grupo = db.Column(db.Integer, nullable=True)
    motivo= db.Column(db.String(120), nullable=True)
    presupuesto_personal = db.Column(db.String(120), nullable=True)
    nota = db.Column(db.String(100), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    trip_image_url = db.Column(db.String(360), nullable=True)

    # Relaciones
    user = db.relationship('User', back_populates='viajes')
    grupos = db.relationship('Grupo', back_populates='viaje', cascade="all, delete-orphan", lazy=True)
    actividades = db.relationship('Actividad', back_populates='viaje', cascade="all, delete-orphan", lazy=True)

    def __init__(self, destino, fecha_inicio, fecha_fin, presupuesto_grupo, motivo, nota, presupuesto_personal, user_id, trip_image_url):
        self.destino = destino
        self.fecha_inicio = fecha_inicio
        self.fecha_fin = fecha_fin
        self.presupuesto_grupo = presupuesto_grupo
        self.motivo = motivo
        self.nota = nota
        self.presupuesto_personal = presupuesto_personal
        self.user_id = user_id
        self.trip_image_url = trip_image_url
        
    def serialize(self):
        return {
            "id": self.id,
            "destino": self.destino,
            "fecha_inicio": self.fecha_inicio,
            "fecha_fin": self.fecha_fin,
            "presupuesto": self.presupuesto_grupo,
            "presupuesto_personal": self.presupuesto_personal,
            "usuario": self.user.id if self.user else None, 
            "trip_image_url": self.trip_image_url,
            # "grupos": [grupo.serialize() for grupo in self.grupos],
            # "actividades": [actividad.serialize() for actividad in self.actividades]
        }
    
    
class Grupo(db.Model):
    """Almacena información sobre los grupos que se formaron para el viaje, las relaciones
    son de: Muchos a 1 con User, Muchos a 1 con Viaje/ Grupo está asociado a un único User y un único Viaje"""
    __tablename__ = 'grupos'
    id = db.Column(db.Integer, primary_key=True)
    viaje_id = db.Column(db.Integer, db.ForeignKey('viajes.id'), nullable=False)
    user_email = db.Column(db.String(120), db.ForeignKey('users.email'), nullable=False)

    # Relaciones
    user = db.relationship('User', back_populates='grupos')
    viaje = db.relationship('Viaje', back_populates='grupos')
    
    def __init__(self, viaje_id, user_email):
        # self.group_name = group_name
        self.viaje_id = viaje_id
        self.user_email = user_email

    def serialize(self):
        return {
            "id": self.id,
            # "group_name": self.group_name,
            "viaje": self.viaje.serialize(),
            "user_email": self.user_email,
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
    nombre_actividad = db.Column(db.String(120), unique=False, nullable=False)
    precio = db.Column(db.Float, nullable=True)
    imagenes = db.Column(db.String(360), nullable=True)
    duracion = db.Column(db.Integer, nullable=True)
    viaje_id = db.Column(db.Integer, db.ForeignKey('viajes.id'), nullable=False)
    viaje = db.relationship("Viaje", back_populates='actividades', lazy=True)
    descripcion = db.Column(db.String(360), nullable=True)
    comentarios = db.relationship("Comentarios", back_populates='actividad', cascade="all, delete-orphan", lazy=True)  # Relación de Comentarios a Actividad
    likes = db.relationship('Likes', back_populates='actividad', cascade="all, delete-orphan", lazy=True)

    def __init__(self, nombre_actividad, precio, imagenes, duracion, viaje_id, descripcion=None):
        self.nombre_actividad = nombre_actividad
        self.precio = precio
        self.duracion = duracion
        self.imagenes = imagenes    #OJO VER DESPUES
        self.viaje_id = viaje_id
        self.descripcion = descripcion
        

    def serialize(self):
        return {
            "id": self.id,
            "nombre_actividad": self.nombre_actividad,
            "precio": self.precio,
            "imagenes": self.imagenes,
            "duracion": self.duracion,
            "viaje_id": self.viaje_id,
            "descripcion": self.descripcion,
            "comentarios": [comentario.serialize() for comentario in self.comentarios],
            "likes" : [like.serialize() for like in self.likes]
        }

class Comentarios(db.Model):
    """Almacena comentarios hechos por los usuarios sobre las actividades, tiene relación de:
    Muchos a 1 con Actividad, Muchos a 1 con User/ Comentarios está asociado a una única actividad y un único user"""
    __tablename__ = 'comentarios'
    id = db.Column(db.Integer, primary_key=True)
    actividades_id = db.Column(db.Integer, db.ForeignKey('actividades.id'), nullable=False)
    actividad = db.relationship('Actividad', back_populates='comentarios')
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship("User", back_populates='comentarios', lazy=True)  # Relación de User a Comentarios
    comentario = db.Column(db.String(500), nullable=True)

    def __init__(self, actividades_id, user_id, comentario):
        self.actividades_id = actividades_id
        self.user_id = user_id
        self.comentario = comentario

    def serialize(self):
        return {
            "id": self.id,
            "actividades_id": self.actividades_id,
            "user_id": self.user_id,
            "usuario": self.user.username if self.user else None,
            "comentario": self.comentario
        }

class Likes(db.Model):
    """Almacena los Likes de los usuarios acerca de las actividades realizadas, tiene relaciones de:
    Muchos a 1 con Actividad, Muchos a 1 con User/ Likes está asociado a una única actividad y un único user"""
    __tablename__ = 'likes'
    id = db.Column(db.Integer, primary_key=True)
    actividades_id = db.Column(db.Integer, db.ForeignKey('actividades.id'), nullable=False)
    actividad = db.relationship("Actividad", back_populates='likes', lazy=True, foreign_keys=[actividades_id])  # Relación de Actividad a Likes
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship("User", back_populates='likes', lazy=True, foreign_keys=[user_id])  # Relación de User a Likes

    def __init__(self, actividades_id, user_id):
        self.actividades_id = actividades_id
        self.user_id = user_id

    def serialize(self):
        return {
            # "id": self.id,
            "actividades_id": self.actividades_id,
            "user_id": self.user_id,
            # "actividad" : self.actividad.serialize() if self.actividad else None,
            # "usuario": self.user.serialize() if self.user else None
        }
