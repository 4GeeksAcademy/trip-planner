import React from "react";
import { Link } from "react-router-dom";


const NewTrip = () => {
    return (
        <div className="container">
            <form className="p-4 bg-dark  rounded shadow-lg w-50 mx-auto">

                <div className="mb-3">
                    <label htmlFor="destino" className="form-label text-light">Destino</label>
                    <input
                        type="text"
                        className="form-control opacity-50 bg-light border-0 rounded-3"
                        id="destino"
                        placeholder="Ingresa el destino"
                        required
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
                        />
                    </div>
                    <div className="col">
                        <label htmlFor="fechaFin" className="form-label text-light">Fecha Fin</label>
                        <input
                            type="date"
                            className="form-control opacity-50 bg-light  border-0 rounded-3"
                            id="fechaFin"
                            required
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="presupuesto" className="form-label text-light">Presupuesto</label>
                    <input
                        type="number"
                        className="form-control opacity-50 bg-light  border-0 rounded-3"
                        id="presupuesto"
                        placeholder="Ingresa el monto estimado para tu viaje"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="motivo" className="form-label text-light">Motivo de Viaje</label>
                    <textarea
                        className="form-control opacity-50 bg-light border-0 rounded-3"
                        id="motivo"
                        rows="1"
                        placeholder="Ingresa el motivo del viaje (opcional)"
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label htmlFor="nota" className="form-label text-light">Nota</label>
                    <textarea
                        className="form-control opacity-50 bg-light border-0 rounded-3"
                        id="nota"
                        rows="2"
                        placeholder="Información importante para tu viaje (opcional)"
                    ></textarea>
                </div>

                <div className="mb-3 text-center">
                    <div className="p-3 bg-opacity-10 border border-info rounded-3 text-light">
                        <h5 className="text-ligth">¡Invita a tus amigos!</h5>
                        <input
                            type="email"
                            className="form-control  opacity-50 bg-light  border-0 rounded-3"
                            id="invitar"
                            placeholder="Ingresa correo electrónico"
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <button type="submit" className="btn btn-primary w-100 mb-5 rounded-3">¡Listo!</button>
                    <div className="d-flex justify-content-start">
                        <Link to="/" className="btn btn-secondary mt-2 d-flex align-items-center rounded-3">
                            <i className="fa-solid fa-circle-chevron-left me-2"></i> Inicio
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );

}

export default NewTrip;