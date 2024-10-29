import '../../styles/viajes.css';
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js"
import React, { useState, useContext } from 'react';
import "../../styles/index.css";

import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
};

const firebaseApp = initializeApp(firebaseConfig);

const NewActivity = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [activity, setActivity] = useState({
        name: "",
        // author: store.user.username,
        precio: 0,
        descripcion: "",
        imagenes: "",
        likes: 0,
        comentarios: "",
        duracion: 0,
        viaje_id: store.currentId,
    })

    const upload = async () => {
        const activityImageUrl = activity.imagenes ? await uploadImage(activity.imagenes) : null;
        await actions.addActivity({ ...activity, imagenes: activityImageUrl });
        console.log(activity);
        setActivity({
            name: "",
            precio: 0,
            descripcion: "",
            imagenes: "",
            imagenes: null,
            likes: 0,
            comentarios: "",
            duracion: "",
        });
        navigate(`/trip/${store.currentId}`); // Navega después de guardar
    };


    const uploadImage = async (image) => {
        const storage = getStorage();
        const storageRef = ref(storage, `imagenes_actividades/${image.name}`);
        const metadata = { contentType: image.type };

        try {
            const fileData = await uploadBytesResumable(storageRef, image, metadata);
            const downloadURL = await getDownloadURL(fileData.ref);
            console.log("Disponible en: ", downloadURL);
            return downloadURL;
        } catch (error) {
            toast.error("Error al cargar la imagen");
            return null;
        }
    }

    return (
        <div className="PaginaPrincipal">
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
                                    console.log("Ruta de las imagenes", event.target.files[0]);
                                    setActivity({
                                        ...activity,
                                        imagenes: event.target.files[0],
                                    });
                                }}
                            
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
                                        onChange={(event) => setActivity({
                                            ...activity,
                                            imagenes: event.target.files[0]
                                        })}
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
                            </div>


                            <div className="mb-3">
                                <label htmlFor="duracion" className="form-label text-light"> <i className="colorNaranja fa-solid fa-clock me-2"></i>Duración de la actividad</label>
                                <textarea
                                    className="form-control opacity-50 bg-light border-0 rounded-3"
                                    id="duracion"
                                    rows="1"
                                    placeholder="(opcional)"
                                    value={activity.duracion}
                                    onChange={
                                        (event) => {
                                            const newDuration = event.target.value;
                                            console.log("Duración actualizada", newDuration);
                                            setActivity(prevActivity => ({
                                                ...prevActivity,
                                                duracion: newDuration
                                            }));
                                        }}
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
                </div>
            </div>

        </div>

    )
}


export default NewActivity;