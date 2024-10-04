import React from "react";
import { Link } from "react-router-dom";


const NewTrip = () => {
    return (
        <div className="container mt-5">
            <form className="p-4 bg-light rounded shadow w-50 mx-auto">
                <div className="mb-3">
                    <label htmlFor="destino" className="form-label">Destino</label>
                    <input type="text" className="form-control" id="destino" placeholder="Ingresa el destino" required />
                </div>
                <div className="mb-3 row">
                    <div className="col">
                        <label htmlFor="fechaInicio" className="form-label">Fecha Inicio</label>
                        <input type="date" className="form-control" id="fechaInicio" required />
                    </div>
                    <div className="col">
                        <label htmlFor="fechaFin" className="form-label">Fecha Fin</label>
                        <input type="date" className="form-control" id="fechaFin" required />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="presupuesto" className="form-label">Presupuesto</label>
                    <input type="number" className="form-control" id="presupuesto" placeholder="Ingresa el monto estimado para tu viaje" />
                </div>
                <div className="mb-3">
                    <label htmlFor="motivo" className="form-label">Motivo de Viaje</label>
                    <textarea className="form-control" id="motivo" rows="3" placeholder="Ingresa el motivo del viaje (opcional)"></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="nota" className="form-label">Nota</label>
                    <textarea className="form-control" id="nota" rows="3" placeholder="Información importante para tu viaje (opcional)"></textarea>
                </div>

                <div className="mb-3 text-center">
                    <div className="p-3 bg-info bg-opacity-10 border border-info border-start-0 rounded-end rounded-4">
                        <h5 className="text-dark">¡Invita a tus amigos!</h5>
                        <input type="email" className="form-control" id="invitar" placeholder="Ingresa correo electrónico" />
                    </div>
                </div>

                <div className="mb-3">
                    <button type="submit" className="btn btn-primary w-100 mb-5">¡Listo!</button>
                    <div className="d-flex justify-content-start">
                        <Link to="/" className="btn btn-secondary mt-2 d-flex align-items-center">
                            <i className="fa-solid fa-circle-chevron-left me-2"></i> Inicio
                        </Link>
                    </div>
                </div>


            </form>
        </div>
    );

}

export default NewTrip;