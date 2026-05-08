import '../../styles/viajes.css';
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js"
import React, { useState, useContext } from 'react';
import "../../styles/index.css";
import { toast } from "react-hot-toast";
import uploadToCloudinary from "../store/cloudinaryUpload";

const NewActivity = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [activity, setActivity] = useState({
        name: "",
        precio: 0,
        descripcion: "",
        imagenes: "",
        likes: 0,
        comentarios: "",
        duracion: 0,
        viaje_id: store.currentId,
    })

    const upload = async () => {
        setIsLoading(true);
        try {
            const activityImageUrl = activity.imagenes ? await uploadToCloudinary(activity.imagenes, "activities") : null;
            await actions.addActivity({ ...activity, imagenes: activityImageUrl });
            setActivity({
                name: "",
                precio: 0,
                descripcion: "",
                imagenes: null,
                likes: 0,
                comentarios: "",
                duracion: "",
            });
            navigate(`/trip/${store.currentId}`);
        } catch (error) {
            toast.error("Error al guardar la actividad");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="PaginaPrincipal">
            <div className="container">
                <div className="p-4 bg-dark shadow-lg w-50 mx-auto" style={{ borderRadius: "30px" }}>

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
                        <label className="form-label text-light"> <i className="colorNaranja fa-solid fa-image me-2"></i>Sube una foto de referencia</label>
                        <div className="d-flex justify-content-center">
                            <img
                                src={activity.imagenes ? URL.createObjectURL(activity.imagenes) : activity.activityImageUrl || 'https://i.pinimg.com/550x/a8/0e/36/a80e3690318c08114011145fdcfa3ddb.jpg'}
                                className="rounded-3 mx-auto"
                                style={{ width: '150px', cursor: 'pointer' }}
                                onClick={() => document.getElementById('imagenActividad').click()} // Activa el input de archivo
                            />
                        </div>
                        <div className="mb-3 d-flex flex-column">
                            <input
                                id="imagenActividad"
                                type="file"
                                accept="image/*"
                                className="form-control"
                                style={{ display: 'none' }}
                                onChange={(event) => {
                                    setActivity({
                                        ...activity,
                                        imagenes: event.target.files[0],
                                    });
                                }}
                            />

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
                                    id="precio"
                                    rows="1"
                                    placeholder="Ingresa el monto total que estimas para la actividad (opcional)"
                                    value={activity.precio}
                                    onChange={
                                        (event) => setActivity({
                                            ...activity,
                                            precio: event.target.value
                                        })
                                    }
                                ></textarea>
                                <small className="form-text text-light">Por favor, ingresa el monto en dólares -  USD $</small>
                            </div>


                            <div className="mb-3">
                                <label htmlFor="duracion" className="form-label text-light"> <i className="colorNaranja fa-solid fa-clock me-2"></i>Duración de la actividad <span className="colorNaranja">(Horas)</span></label>
                                <textarea
                                    className="form-control opacity-50 bg-light border-0 rounded-3"
                                    id="duracion"
                                    rows="1"
                                    placeholder="(opcional)"
                                    value={activity.duracion}
                                    onChange={
                                        (event) => {
                                            const newDuration = event.target.value;
                                            setActivity(prevActivity => ({
                                                ...prevActivity,
                                                duracion: newDuration
                                            }));
                                        }}
                                ></textarea>

                            </div>


                            <button onClick={upload} disabled={isLoading} className="mb-3 btn btn-success w-100 rounded-pill">
                                {isLoading ? <span className="spinner-border spinner-border-sm me-2" role="status" /> : null}
                                {isLoading ? "Guardando..." : "Guardar"}
                            </button>

                            <div className="d-flex justify-content-start">
                                <Link to="/"
                                    className="btn btn-secondary mt-2 d-flex align-items-center rounded-pill"
                                >
                                    <i className="fa-solid fa-circle-chevron-left me-2 "></i> Inicio
                                </Link>
                            </div>


                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}


export default NewActivity;