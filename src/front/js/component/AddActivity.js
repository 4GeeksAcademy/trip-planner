import React, { useState, useContext, useSyncExternalStore } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/addActivityCard.css"
import { Context } from "../store/appContext.js"
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/index.css";

const AddActivity = ({ viajeId, viajeDestino }) => {
    const { store, actions } = useContext(Context);
    const {id} = useParams();
    const [idViaje, setIdViaje] = useState(viajeId);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);



    const navigate = useNavigate();

    const handleImageClick = () => {
        actions.guardarId(idViaje)
        navigate("/add-activity")
    }

    const handleOpenModal = () => {
        setLoading(true); // Iniciar loading
        actions.loadRecommendations(viajeDestino)
            .then(() => {
                setLoading(false); // Finalizar loading
            })
            .catch(() => {
                setLoading(false); // Finalizar loading en caso de error
            });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };



    return (
        <div className="col-md-3">
            <div className="card shadow fondoAzul border border-light border-3" style={{ width: '100%', borderRadius: "30px", position: 'relative', overflow: 'hidden', height: '430px' }}>
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/trippy-proyecto.appspot.com/o/Dise%C3%B1o%20sin%20t%C3%ADtulo%20(15).png?alt=media&token=86c65a3f-2f74-49b0-81cf-944deda510f4"
                    className="card-img"
                    alt="..."
                    style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
                    onClick={handleImageClick}
                />

                <div className="d-flex flex-column justify-content-end align-items-center" style={{ position: 'absolute', bottom: 0, width: '100%', padding: '10px' }}>
                    <button className="btn shadow w-100 m-1 p-2 py-3 text-dark bg-light rounded-pill fw-bold" onClick={handleImageClick}>
                        <i className="fa-solid fa-circle-plus me-1 colorNaranja text-center fs-5" onClick={handleImageClick}></i> Agrega una aventura
                    </button>
                    <button className="btn shadow w-100 p-2 m-1 mb-3 py-3 text-dark bg-light rounded-pill fw-bold" onClick={handleOpenModal}>
                        <i className="fa-solid fa-circle-plus me-1 colorNaranja text-center fs-5" ></i> Explora nuevas actividades
                    </button>
                </div>
            </div>

            {/* modal */}

            {showModal && (
                <div className="modal fade show" style={{ display: 'block' }} id="modalRecmendaciones" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h6 className="modal-title colorAzul" id="exampleModalLabel">Recomendaciones</h6>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body container">
                                <div className="row justify-content-center g-3">
                                    {loading ? ( // Mostrar loading
                                        <div className="col-12 text-center">
                                            <p>Cargando recomendaciones...</p>
                                        </div>) :
                                        store.recomendacionPorLugar.length > 0 ? (
                                            store.recomendacionPorLugar.map((item, index) => (
                                                <div key={index} className="col-md-4 mb-4">

                                                    <div className="card border border-3 rounded rouded-3 h-100 bg-light text-black" style={{ maxWidth: '245px', height: 'auto' }}>
                                                        <img src={item.pictures[0] || 'https://firebasestorage.googleapis.com/v0/b/trippy-proyecto.appspot.com/o/Trippy2c.png?alt=media&token=25671603-96e8-4704-a6a5-a8139f24a23e'} className="card-img-top" alt="..." style={{ height: '100px', objectFit: 'cover' }} />
                                                        <div className="card-body d-flex flex-column flex-grow-1">
                                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                                <h5 className="card-title mb-0">{item.name}</h5>
                                                            </div>

                                                            {/* Agregar función que se sume a la actividades */}

                                                            <div className="mt-auto fondoAzul rounded-3 p-1 text-center">
                                                                <button className="detalles text-light btn-sm px-4" onClick={ async ()=>{
                                                                        actions.addActivity({
                                                                            "viaje_id": parseInt(id),
                                                                            "name": item.name,
                                                                            "imagenes": item.pictures[0],
                                                                            "descripcion": item.shortDescription,
                                                                            "precio": 0,
                                                                            "likes": 0,
                                                                            "comentarios": "",
                                                                            "duracion": 0,
                                                                        })

                                                                }}>Agregar</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="col-12 text-center">
                                                <p>Pronto tendremos disponibles recomendaciones</p>
                                            </div>
                                        )}

                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseModal}>Cerrar</button>
                                <button type="button" className="btn fondoAzul text-light">¡Listo!</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
};

export default AddActivity;