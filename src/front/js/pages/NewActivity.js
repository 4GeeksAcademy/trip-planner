import '../../styles/viajes.css';
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js"
import React, {useState, useContext} from 'react';


const NewActivity = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
 
    const [activity, setActivity] = useState({
        name: "",
        // author: store.user.username,
        costo: 0,
        descripcion: "",
        imageURL: "",
        likes: 0,
        comentarios: "",
        duracion: "",
        viaje_id: store.currentId
    })

    const upload = () => {
        actions.addActivity(activity);
        console.log(activity);
        setActivity({
            name: "",
            costo: 0,
            descripcion: "",
            imageURL: "",
            likes: 0,
            comentarios: "",
            duracion: ""
        })
        navigate(`/trip/${store.currentId}`); // Navega después de guardar
    };

    return (
        <div className="container">
            <div className="p-4 bg-dark  rounded shadow-lg w-50 mx-auto">

                <div className="mb-3">
                    <label htmlFor="Actividad" className="form-label text-light fs-3">Nombre de la actividad </label>
                    <input
                        type="text"
                        className="form-control opacity-50 bg-light border-0 rounded-3"
                        id="name"
                        placeholder="Heladería"
                        required
                        value={activity.name}
                        onChange={
                            (event) => setActivity({
                                ...activity,
                                name: event.target.value
                            })
                        }
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="Foto" className="form-label text-light"> <i className="colorNaranja fa-solid fa-image me-2"></i>Sube una foto de referencia</label>
                    <div className = "d-flex justify-content-center">
                        <img
                            src={'https://i.pinimg.com/550x/a8/0e/36/a80e3690318c08114011145fdcfa3ddb.jpg'}
                            // user.image ? URL.createObjectURL(user.image) : user.profileImageUrl || 
                            className="rounded-3 mx-auto"
                            style={{ width: '150px', cursor: 'pointer' }}
                            // onClick={() => document.getElementById('imagenPerfil').click()} // Activa el input de archivo
                            />
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="descripción" className="form-label text-light"> <i className="colorNaranja fa-solid fa-comment-dots me-2"></i>Descripción</label>
                    <textarea
                        className="form-control opacity-50 bg-light border-0 rounded-3"
                        id="descripcion"
                        rows="2"
                        placeholder="Describe la actividad, horarios, datos importantes, entre otros..."
                        value={activity.descripcion}
                        onChange={
                            (event) => setActivity({
                                ...activity,
                                descripcion: event.target.value
                            })
                        }
                    ></textarea>

                </div>

                <div className="mb-3">
                    <label htmlFor="Monto" className="form-label text-light"> <i className="colorNaranja fa-solid fa-sack-dollar me-2"></i>Costo apróximado</label>
                    <textarea
                        className="form-control opacity-50 bg-light border-0 rounded-3"
                        id="costo"
                        rows="1"
                        placeholder="Ingresa el monto total que estimas para la actividad (opcional)"
                        value={activity.costo}
                        onChange={
                            (event) => setActivity({
                                ...activity,
                                costo: event.target.value
                            })
                        }
                    ></textarea>
                </div>


                <div className="mb-3">
                    <label htmlFor="Foto" className="form-label text-light"> <i className="colorNaranja fa-solid fa-clock me-2"></i>Duración de la actividad</label>
                    <textarea
                        className="form-control opacity-50 bg-light border-0 rounded-3"
                        id="duracion"
                        rows="1"
                        placeholder="(opcional)"
                        value={activity.duracion}
                        onChange={
                            (event) => setActivity({
                                ...activity,
                                duracion: event.target.value
                            })
                        }
                    ></textarea>
                </div>
                

                <button onClick={upload} className="mb-3 btn btn-success w-100">Guardar</button>

                <div className="d-flex justify-content-start">
                    <Link to="/" 
                    className="btn btn-secondary mt-2 d-flex align-items-center rounded-3"
                    >
                        <i className="fa-solid fa-circle-chevron-left me-2"></i> Inicio
                    </Link>
                </div>

            </div>
        </div>

    )
}


export default NewActivity;