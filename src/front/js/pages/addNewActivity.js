import '../../styles/viajes.css';
import { Link } from "react-router-dom";
import React from 'react';


const NewActivity = () => {

    
    return (
        <div className="container">
            <form className="p-4 bg-dark  rounded shadow-lg w-50 mx-auto">

                <div className="mb-3">
                    <label htmlFor="Actividad" className="form-label text-light fs-3">Nombre de la actividad</label>
                    <input
                        type="text"
                        className="form-control opacity-50 bg-light border-0 rounded-3"
                        id="destino"
                        placeholder="Heladería"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="descripción" className="form-label text-light"> <i class="colorNaranja fa-solid fa-comment-dots me-2"></i>Descripción</label>
                    <textarea
                        className="form-control opacity-50 bg-light border-0 rounded-3"
                        id="nota"
                        rows="2"
                        placeholder="Describe la actividad, horarios, datos importantes, entre otros..."
                    ></textarea>

                </div>

                <div className="mb-3">
                    <label htmlFor="Monto" className="form-label text-light"> <i class="colorNaranja fa-solid fa-sack-dollar me-2"></i>Costo apróximado</label>
                    <textarea
                        className="form-control opacity-50 bg-light border-0 rounded-3"
                        id="motivo"
                        rows="1"
                        placeholder="Ingresa el monto total que estimas para la actividad (opcional)"
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label htmlFor="Foto" className="form-label text-light"> <i class="colorNaranja fa-solid fa-image me-2"></i>Sube una foto de referencia</label>
                    <textarea
                        className="form-control opacity-50 bg-light border-0 rounded-3"
                        id="motivo"
                        rows="1"
                        placeholder="Foto del destino"
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label htmlFor="Foto" className="form-label text-light"> <i class="colorNaranja fa-solid fa-clock me-2"></i>Duración de la actividad</label>
                    <textarea
                        className="form-control opacity-50 bg-light border-0 rounded-3"
                        id="motivo"
                        rows="1"
                        placeholder="(opcional)"
                    ></textarea>
                </div>
                

                <button type="submit" className="mb-3 btn btn-success w-100">Guardar</button>

                <div className="d-flex justify-content-start">
                    <Link to="/" className="btn btn-secondary mt-2 d-flex align-items-center rounded-3">
                        <i className="fa-solid fa-circle-chevron-left me-2"></i> Inicio
                    </Link>
                </div>

            </form>
        </div>

    )
}


export default NewActivity;