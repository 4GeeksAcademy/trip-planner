import React, {useState, useContext} from "react";
import { Context } from "../store/appContext.js"
import { Link } from "react-router-dom";


const NewTrip = () => {

    const [image, setImage] = useState(null);

    const { store, actions } = useContext(Context);

    const [viaje, setViaje] = useState({
        destino:"",
        fecha_inicio:"",
        fecha_fin:"",
        presupuesto_grupo:"",
        motivo:"",
        nota:"",
        presupuesto_personal:"",
        user_id:"",
    })

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
                        value={viaje.destino} 
                            onChange={
                                (event) => setViaje({
                                    ...viaje,
                                    destino: event.target.value
                                })
                            }
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
                    <label htmlFor="presupuesto" className="form-label text-light">Presupuesto</label>
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
                </div>

                <div className="mb-3">
                    <label className="form-label text-light">Imagen ref</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="form-control opacity-50 bg-light border-0 rounded-3"
                        id="img-destino"
                        placeholder="Sube una imagen de tu destino"
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