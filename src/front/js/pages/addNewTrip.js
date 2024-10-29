import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext.js"
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
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

const _firebaseApp = initializeApp(firebaseConfig);


const NewTrip = () => {

    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [tripImageUrl, setTripImageUrl] = useState("");


    // Carga datos ingresados en el form
    const [viaje, setViaje] = useState({
        destino: "",
        fecha_inicio: "",
        fecha_fin: "",
        presupuesto_grupo: 0,
        motivo: "",
        nota: "",
        presupuesto_personal: 0,
    })


    // Carga imagen de destino

    const uploadImage = async (image) => {
        const storage = getStorage(_firebaseApp);
        const storageRef = ref(storage, `trip_images/${image.name}`);
        const metadata = { contentType: image.type };

        try {
            const fileData = await uploadBytesResumable(storageRef, image, metadata);
            const downloadURL = await getDownloadURL(fileData.ref);
            console.log("Disponible en:", downloadURL);
            return downloadURL;
        } catch (error) {
            toast.error("Error al cargar la imagen");
            return null;
        }
    };

    const ImageChange = async (event) => {
        const selectedImage = event.target.files[0];
        if (selectedImage) {
            setImage(selectedImage);
            const downloadURL = await uploadImage(selectedImage);
            if (downloadURL) {
                setTripImageUrl(downloadURL);
            }
        }
    };

    //Validación de campos obligatorios
    const isFormValid = () => {
        return viaje.destino && viaje.fecha_inicio && viaje.fecha_fin;
    };

    const upload = async () => {
        if (!isFormValid()) {
            toast.error("Faltan campos por completar.");
            return;
        }

        const fechaInicio = new Date(viaje.fecha_inicio);
        const fechaFin = new Date(viaje.fecha_fin);
        const fechaActual = new Date();

        // Validar que la fecha de inicio no sea anterior a la fecha actual
        if (fechaInicio <= fechaActual) {
            toast.error("La fecha de inicio no puede ser anterior a la fecha actual.");
            return;
        }

        // Validar que la fecha de fin sea mayor que la fecha de inicio
        if (fechaFin <= fechaInicio) {
            toast.error("La fecha de fin debe ser posterior a la fecha de inicio.");
            return;
        }

        let resultado = await actions.post_trip({ ...viaje, trip_image_url: tripImageUrl });
        if (resultado) {
            navigate("/viajes"); // Navega después de guardar
        } else {
            alert("Algo salió mal agregando el nuevo viaje");
        }
    };


    return (
        <div className="PaginaPrincipal">
        <div className="container">
            <div className="p-4 bg-dark  rounded shadow-lg w-50 mx-auto">

                <div className="mb-3">
                    <label htmlFor="destino" className="form-label text-light">Destino</label>
                    <input
                        type="text"
                        className="form-control opacity-50 bg-light border-0 rounded-3"
                        id="destino"
                        placeholder="Ciudad, País"
                        required
                        value={viaje.destino}
                        onChange={
                            (event) => setViaje({
                                ...viaje,
                                destino: event.target.value
                            })
                        }
                    />
                </div>

                <div className="mb-3">
                    <div className="mb-3 d-flex flex-column justify-content-center">
                        <label className="form-label text-light">Imagen referencial de tu viaje</label>
                        <img
                            src={image ? URL.createObjectURL(image) : 'https://firebasestorage.googleapis.com/v0/b/trippy-proyecto.appspot.com/o/fondoDestino.png?alt=media&token=c65fa4ed-494d-410b-bd9a-68e74ef3e456'}
                            className="rounded-3 mx-auto"
                            style={{ width: '150px', cursor: 'pointer' }}
                            onClick={() => document.getElementById('tripImage').click()}
                        />
                    </div>
                    <input
                        id="tripImage"
                        type="file"
                        accept="image/*"
                        className="form-control"
                        style={{ display: 'none' }}
                        onChange={ImageChange} // Función para manejar el cambio de imagen
                    />
                </div>


                <div className="mb-3 row">
                    <div className="col">
                        <label htmlFor="fechaInicio" className="form-label text-light">Fecha Inicio</label>
                        <input
                            type="date"
                            className="form-control opacity-50 bg-light  border-0 rounded-3"
                            id="fechaInicio"
                            required
                            value={viaje.fecha_inicio}
                            onChange={
                                (event) => setViaje({
                                    ...viaje,
                                    fecha_inicio: event.target.value
                                })
                            }
                        />
                    </div>
                    <div className="col">
                        <label htmlFor="fechaFin" className="form-label text-light">Fecha Fin</label>
                        <input
                            type="date"
                            className="form-control opacity-50 bg-light  border-0 rounded-3"
                            id="fechaFin"
                            required
                            value={viaje.fecha_fin}
                            onChange={
                                (event) => setViaje({
                                    ...viaje,
                                    fecha_fin: event.target.value
                                })
                            }
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="presupuesto_grupo" className="form-label text-light">Presupuesto</label>
                    <input
                        type="number"
                        className="form-control opacity-50 bg-light  border-0 rounded-3"
                        id="presupuesto"
                        placeholder="Ingresa el monto estimado para tu viaje"
                        value={viaje.presupuesto_grupo}
                        onChange={
                            (event) => setViaje({
                                ...viaje,
                                presupuesto_grupo: event.target.value
                            })
                        }
                    />
                    <small className="form-text text-light">Por favor, ingresa el monto en dólares -  USD $</small>
                </div>

                <div className="mb-3">
                    <label htmlFor="presupuesto" className="form-label text-light">Presupuesto personal</label>
                    <input
                        type="number"
                        className="form-control opacity-50 bg-light  border-0 rounded-3"
                        id="presupuesto"
                        placeholder="Opcional"
                        value={viaje.presupuesto_personal}
                        onChange={
                            (event) => setViaje({
                                ...viaje,
                                presupuesto_personal: event.target.value
                            })
                        }
                    />
                </div>


                <div className="mb-3">
                    <label htmlFor="motivo" className="form-label text-light">Motivo de Viaje</label>
                    <input
                        className="form-control opacity-50 bg-light border-0 rounded-3"
                        id="motivo"
                        rows="1"
                        placeholder="Ingresa el motivo del viaje (opcional)"
                        value={viaje.motivo}
                        onChange={
                            (event) => setViaje({
                                ...viaje,
                                motivo: event.target.value
                            })
                        }
                    ></input>
                </div>

                <div className="mb-3">
                    <label htmlFor="nota" className="form-label text-light">Nota</label>
                    <input
                        className="form-control opacity-50 bg-light border-0 rounded-3"
                        id="nota"
                        rows="2"
                        placeholder="Información importante para tu viaje (opcional)"
                        value={viaje.nota}
                        onChange={
                            (event) => setViaje({
                                ...viaje,
                                nota: event.target.value
                            })
                        }
                    ></input>
                </div>

                <div className="mb-3">
                    <button
                        className="btn btn-primary w-100 mb-5 rounded-3"
                        onClick={upload} // Llama a la función upload
                        disabled={!isFormValid()} // Deshabilitar el botón si el formulario no es válido
                    >
                        ¡Listo!
                    </button>
                    <div className="d-flex justify-content-start">
                        <Link to="/" className="btn btn-secondary mt-2 d-flex align-items-center rounded-3">
                            <i className="fa-solid fa-circle-chevron-left me-2"></i> Inicio
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );

}

export default NewTrip;