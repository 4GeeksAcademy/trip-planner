import React, { useContext } from 'react'
import { Context } from "../store/appContext.js"
import { Link } from 'react-router-dom';
import "../../styles/index.css";


const Recomendaciones = (props) => {
    const { store, actions } = useContext(Context);
    

    
    return (<>
        <div className="d-flex w-100">
            <button
                type="button"
                className="btn fondoNaranja btn-lg w-100 rounded rounded-pill p-0 text-white"
                data-bs-toggle="modal"
                data-bs-target="#modalRecmendaciones"
                onClick={() => { actions.loadRecommendations(props.location) }}
            >
                <i className="bi bi-star-fill"></i> Explora nuevas actividades
            </button>
        </div>

        <div className="modal fade" id="modalRecmendaciones" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Recomendaciones para lugar</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body container">
                        <div className="row justify-content-center g-3">
                            {store.recomendacionPorLugar.map((item, index) => {
                                return (
                                    <div key={index} className="col-md-3">

                                        <div className="card rounded shadow h-100 bg-light text-black" style={{ width: '100%' }}>
                                            <img src={item.pictures[0]} className="card-img-top" alt="..." style={{ height: '280px', objectFit: 'cover' }} />
                                            <div className="card-body d-flex flex-column">
                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                    <h5 className="card-title mb-0">{item.name}</h5>
                                                </div>

                                                <div className="d-flex justify-content-end align-items-center border-black border-bottom border-3  my-2">
                                                    <span className="p-2 rounded">${item.cost}</span>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center mt-auto">
                                                    <Link to="/details" className="detalles text-light btn-sm px-4">Ver más</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>

    </>)
}

export default Recomendaciones;