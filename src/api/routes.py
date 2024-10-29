"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Viaje, Grupo, Actividad
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import datetime
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
import bcrypt 

import os

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

sender_email = os.getenv("SMTP_USERNAME")
sender_password = os.getenv("SMTP_PASSWORD")
smtp_host = os.getenv("SMTP_HOST")
smtp_port = os.getenv("SMTP_PORT")
reciever_email = os.getenv("RECIEVERS_EMAIL")

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


# AGREGAR ACTIVIDADES AL VIAJE

# AGREGAR LIKES DE LAS ACTIVIDADES
@api.route('/add-likes/', methods= ['POST'])
def add_like(actividad_id):
    actrividad_id = request.json.get("actrividad_id", None)


# AGREGAR MIEMBROS AL GRUPO
@api.route('/add-member/<int:id_viaje>', methods= ['POST'])
def add_member(id_viaje):
    group_name = request.json.get("group_name", None)
    viaje_id = Viaje.query.filter_by(id = id_viaje).one_or_none()
    user_email = request.json.get("user_email", None)

    member = Grupo(
        group_name = group_name,
        viaje_id = viaje_id,
        user_email = user_email,
    )
    db.session.add(member)
    db.session.commit()

    return jsonify(member.serialize()), 201


# TRAER DATOS DE FORM VIAJE
@api.route('/all-trip', methods=['GET'])
@jwt_required()
def all_trip(): 
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    
    if user is None:
        return jsonify({"error": "User not found"}), 404
    
    # Filtra usando user.id
    viajes = Viaje.query.filter_by(user_id=user.id).all()
    
    return jsonify([viaje.serialize() for viaje in viajes]), 200



# AGREGAR VIAJE
@api.route('/add-trip', methods=['POST'])
def add_trip():
    # print(f"Este es el contenido entrante {request.json}")
    
    #Campos obliagtorios
    destino = request.json.get("destino")
    fecha_inicio = request.json.get("fecha_inicio")
    fecha_fin = request.json.get("fecha_fin")

    if not destino or not fecha_inicio or not fecha_fin:
        return jsonify({"msg": "Faltan campos por completar."}), 400
    
    destino = request.json.get("destino", None)
    fecha_inicio = request.json.get("fecha_inicio", None)
    fecha_fin = request.json.get("fecha_fin", None)
    presupuesto_grupo = request.json.get("presupuesto_grupo", None)
    motivo = request.json.get("motivo", None)
    nota = request.json.get("nota", None)
    presupuesto_personal = request.json.get("presupuesto_personal", None)
    user_id = request.json.get("user_id", None)
    trip_image_url = request.json.get("trip_image_url", None)


    viaje = Viaje(
        destino = destino,
        fecha_inicio=fecha_inicio,
        fecha_fin=fecha_fin,
        presupuesto_grupo=presupuesto_grupo,
        motivo=motivo,
        nota=nota,
        presupuesto_personal=presupuesto_personal,
        user_id=user_id,
        trip_image_url = trip_image_url
    )
    db.session.add(viaje)
    db.session.commit()

    return jsonify(viaje.serialize()), 201

# AGREGAR ACTIVIDAD
@api.route('/add-activity', methods=['POST'])
def add_activity():
    nombre_actividad = request.json.get("name", None)
    precio = request.json.get("precio", None)
    imagenes = request.json.get("imagenes", None)
    duracion = request.json.get("duracion", None)
    viaje_id = request.json.get("viaje_id", None)
    # viaje = Viaje.query.get(viaje_id)
    descripcion = request.json.get("descripcion", None)

    activity = Actividad(
        nombre_actividad = nombre_actividad,
        precio = precio,
        imagenes = imagenes,
        duracion = duracion,
        viaje_id = viaje_id,
        descripcion = descripcion
    )
    db.session.add(activity)
    db.session.commit()

    return jsonify(activity.serialize()), 201

# VeR LA LISTA DE ACTIVIDADES/OPCIONES
@api.route('/all-activities/<int:viaje_id>', methods=['GET'])
def all_activities(viaje_id):

    viaje = Viaje.query.filter_by(id=viaje_id).first()
    if not viaje: 
        return jsonify({ "msg" : "Viaje no encontrado" }), 404

    actividades = viaje.actividades
    actividades_serializadas = [actividad.serialize() for actividad in actividades]
    return jsonify(actividades_serializadas), 200
    

# ENVIAR EMAIL (PRUEBA)
@api.route('/send-email', methods=['POST'])
def send_email():

    message = MIMEMultipart("alternative")
    message["Subject"] = "Te inivito a Trippy - ¡Haremos un viaje juntos!"
    message["From"] = sender_email
    message["To"] = reciever_email

    print(sender_email, sender_password, smtp_host, smtp_port)
    
    # message["To"] = ", ".join(recipients)

    text = "Prueba1"

    html_content = """
        <html>
            <body>
                <h1 style="color:blue;">Estoy probando estooo!</h1>
                <p>This email is sent using <b>Trippy Backend</b> and Gmail's SMTP server.</p>
            </body>
        </html>
    """

    part1 = MIMEText(text, "plain")

    part2 = MIMEText(html_content, "html")

    message.attach(part1)

    message.attach(part2)

    smtp_connection = smtplib.SMTP(smtp_host, smtp_port)

    smtp_connection.starttls() # Secure the connection

    smtp_connection.login(sender_email, sender_password)

    smtp_connection.sendmail(sender_email, reciever_email, message.as_string())

    smtp_connection.quit()

    return jsonify({"msg": "Email sent"}), 200


#Endpoint for LOGIN
@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email == None or password == None:
        return jsonify({"msg": "Falta el correo o contraseña"}), 401

    user = User.query.filter_by(email=email).first()
    if user == None:
        return jsonify({"msg": "Usuario no encontrado!"}), 401
    
    password_bytes = bytes(password, 'utf-8')
    if bcrypt.checkpw(password_bytes, user.password.encode('utf-8')):

        access_token = create_access_token(identity=email)
        
        return jsonify({"token": access_token,
                        "user": user.serialize()}), 200
    
    return jsonify({"msg": "Contraseña inválida"})

@api.route("/register", methods =["POST"])
def register():
    name = request.json.get("name", None)
    username = request.json.get("username", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    more_info = request.json.get("more_info", None)
    profile_image = request.json.get("profile_image_url", None)
    
    if name ==None:
        return jsonify({"msg": "Falta el nombre"}), 401
    if username ==None:
        return jsonify({"msg": "Falta el nombre de usuario"}), 401
    if email ==None:
        return jsonify({"msg": "Falta el correo"}), 401
    if password ==None:
        return jsonify({"msg": "Falta la contraseña"}), 401
    
    user = User.query.filter_by(email=email).first()

    if user != None:
        return jsonify({"msg": "El usuario ya existe!"}), 401

    bpassword = bytes(password, 'utf-8')
    salt = bcrypt.gensalt(14)

    hashed_password = bcrypt.hashpw(password=bpassword, salt=salt)
    
    print(hashed_password.decode('utf-8'))

    new_user = User(name=name, username=username, email=email, password=hashed_password.decode('utf-8'), salt=salt, profile_image_url=profile_image, more_info=more_info)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"user": new_user.serialize(),
                    "token": create_access_token(identity=email)
                    }),200

#CRUD PARA LA TABLA USER

#MANTENER USUARIO LOGEADO
@api.route("/user", methods=["GET"])
@jwt_required()
def get_user_logged():
    current_user = get_jwt_identity()
    print(f"Usuario actual: {current_user}")
    user = User.query.filter_by(email=current_user).first()
    return jsonify(user.serialize()),200
#TRAER A TODOS LOS USERS
@api.route('/users', methods=['GET'])
def all_users():
    users = User.query.all()
    usuarios_serializados = [persona.serialize() for persona in users]
    return jsonify(usuarios_serializados), 200
#TRAER A UN SOLO USER POR EMAIL
@api.route("/user/<string:email>", methods=["GET"])
def get_user(email):
    searched_user = User.query.filter_by(email=email).one_or_none() 

    if searched_user is None:  
        return jsonify({"error": f"Usuario con email: {email} no encontrado"}), 404
    
    usuario_serializado = searched_user.serialize() 
    return jsonify(usuario_serializado), 200

#ACTUALIZAR USUARIO
@api.route('/user/<string:email>', methods=['PUT'])
def update_user(email):
    searched_user = User.query.filter_by(email=email).one_or_none()
    
    body = request.json
    if not body:
        return jsonify({"error": "Los datos no fueron provistos"}), 400
    if searched_user is None:
        return jsonify({"error": f"El usuario con email: {email} no fue encontrado"}), 404
    
    new_name = body.get('name', None)
    new_username= body.get('username', None)
    new_email = body.get('email', None)
    new_password = body.get('password', None)
    new_more_info = body.get('more_info', None)
    new_profile_image_url = body.get('profile_image_url', None)

    if new_name!=None:
        searched_user.name=new_name
    if new_username!=None:
        searched_user.username=new_username
    if new_email!=None:
        searched_user.email=new_email
    if new_password!=None:
        bpassword = bytes(new_password, 'utf-8')
        new_salt = bcrypt.gensalt(14)
        new_hashed_password = bcrypt.hashpw(password=bpassword, salt=new_salt)
        searched_user.password = new_hashed_password.decode('utf-8')
        searched_user.salt = new_salt
    if new_more_info!=None:
        searched_user.more_info = new_more_info
    if new_profile_image_url is not None and isinstance(new_profile_image_url, str):
        searched_user.profile_image_url = new_profile_image_url

    db.session.commit()
    token = create_access_token(identity=searched_user.email)
    return jsonify({"user": searched_user.serialize(), "token": token}), 200

#ELIMINAR A UN USUARIO
@api.route('/user/<string:email>', methods=['DELETE'])
def remove_user(email):
    searched_user=User.query.filter_by(email=email).one_or_none()
    if searched_user is not None:
        db.session.delete(searched_user)
        db.session.commit()
        return jsonify(searched_user.serialize()), 202
    else:
        return jsonify({"error": f"El usuario con email: {email} no fue encontrado"}), 404




@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
