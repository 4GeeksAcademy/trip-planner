import '../../styles/viajes.css';
import React, { useState, useContext, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import "../../styles/index.css";
import { Context } from "../store/appContext.js"





const TripDetail = () => {

    const { store, actions } = useContext(Context);
    const [comentarios, setComentarios] = useState([]);

    const [nuevoComentario, setNuevoComentario] = useState('');
    let { state } = useLocation();
    const { id, nombre_actividad, descripcion, precio, imagenes } = state

    const loadComments = async () => {
        const response = await fetch(process.env.BACKEND_URL + "api/get-comments/" + id + "/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${store.token}`
            }

        });
        const data = await response.json()
        setComentarios(data)
    };

    useEffect(() => {    
        loadComments();
    }, [id]);
    


    // para subir el comentario
    const handleCommentSubmit = async () => {
        if (nuevoComentario.trim()) {
            const result = await actions.post_comment(id, nuevoComentario);
            if (result) {
                setNuevoComentario(''); // Limpiar el campo de entrada
                loadComments()
            }
        }
    };

    // const comentariosActividad = store.comentarios.filter(comentario => comentario.actividades_id === id);




    return (
        <div className="PaginaPrincipal">
            <div className="container-fluid mx-auto p-2">
                <div className="d-flex justify-content-center mt-4">
                    <div className="shadow-sm" style={{ width: "80%", borderRadius: "30px", overflow: "hidden"}}>
                        <img src={imagenes || 'https://firebasestorage.googleapis.com/v0/b/trippy-proyecto.appspot.com/o/Dise%C3%B1o%20sin%20t%C3%ADtulo%20(14).png?alt=media&token=2703929a-4977-498e-91de-0ab70b68d609'}
                            style={{ width: "100%", height: "400px", objectFit: "cover" }} alt="Paisaje" />
                        <div className="fondoAzul rounded-bottom p-4 ">
                            <h2 className="fw-semibold text-light">{nombre_actividad}</h2>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-center mt-5">
                    <div className="d-flex m-3" style={{ width: "80%" }}>
                        <div className="me-3 border-black border-end border-3 border-dark flex-grow-1" style={{ maxWidth: "900px", minHeight: "120px"}}>
                            <h5 className="mb-3">Descripción</h5>
                            <div>
                            <blockquote className="blockquote mb-0">
                                <p>{descripcion}</p>
                            </blockquote>
                            </div>
                        </div>

                        <div className="card bg-light" style={{ maxWidth: "350px", maxHeight: "100px", borderRadius: "30px"}}>
                            <div className="card-header text-center colorAzul">
                                Costo aproximado
                            </div>
                            <div className="card-body text-center p-2">
                                <h2 className="card-text colorNaranja">${precio}</h2>
                            </div>
                        </div>
                    </div>
                </div>



                <div className="d-flex justify-content-center mt-5">
                    <div className="d-flex" style={{ width: "80%" }}>
                        <h5 className="margin-left colorNaranja">Comentarios</h5>

                        <div className="container m-3 p-0">
                            <div className=" p-2">

                                <div className="media mb-4">
                                    <div className=" rounded-pill border shadow-sm bg-light m-2 p-2">
                                        <h6 className="mt-0 text-secondary mx-3">@{store.user.username}</h6>
                                        <div className="d-flex justify-content-between align-items-center">

                                            <textarea className="form-control rounded-pill mb-2 mx-2 bg-light" value={nuevoComentario} id="floatingTextarea" placeholder="Agrega un comentario" rows="1"

                                                onChange={(event) => setNuevoComentario(event.target.value)}
                                                onKeyUp={(event) => {
                                                    if (event.key === 'Enter') {
                                                        event.preventDefault();
                                                        handleCommentSubmit();
                                                    }
                                                }}

                                            ></textarea>


                                            <button type="button" className="btn btn-transparent p-0 mx-2" onClick={handleCommentSubmit}
                                            ><i className="fa-solid fa-circle-arrow-up fs-4 colorNaranja me-2 mb-2"></i></button>
                                        </div>
                                    </div>
                                </div>

                                 {comentarios.map(comentario => (
                                    <div className="media mb-4 mx-4" key={comentario.id}>
                                        <div className="rounded-pill mb-2 border shadow-sm bg-light p-2">
                                            <h6 className="mt-0 colorNaranja mx-4">@{comentario.usuario}</h6>
                                            <div className="d-flex justify-content-between align-items-center rounded-pill mx-4">
                                                <span>{comentario.comentario}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div >
        </div>



    );
}

export default TripDetail;