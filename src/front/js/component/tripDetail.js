import '../../styles/viajes.css';
import React, { useState, useContext } from "react";
import { useLocation } from 'react-router-dom';
import "../../styles/index.css";
import { Context } from "../store/appContext.js"





const TripDetail = () => {

    const { store, actions } = useContext(Context);
    


    const [nuevoComentario, setNuevoComentario] = useState('');
    const [comentarios, setComentarios] = useState(
        [{
            id: 1,
            usuario: '@maria',
            mensaje: '¡Este post es muy interesante!'
        }]
    )
    let { state } = useLocation();
    const { id, nombre_actividad, descripcion, precio, imagenes } = state

    // para subir el comentario
    const handleCommentSubmit = async () => {
        console.log("ID de actividad:", id); 
        if (nuevoComentario.trim()) {
            const result = await actions.post_comment(id, nuevoComentario);

            if (result) {
                setComentarios([...comentarios, { id: Date.now(), usuario: store.user.username, mensaje: nuevoComentario }]);
                setNuevoComentario(''); // Limpiar el campo de entrada
            }
        }
    };



    return (
        <div className="PaginaPrincipal">
            <div className="container-fluid mx-auto p-2">
                <div className="d-flex justify-content-center mt-4 rounded">
                    <div className="rounded rounded-3 border shadow-sm" style={{ width: "80%" }}>
                        <img src={imagenes}
                            style={{ width: "100%", height: "450px", objectFit: "cover" }} alt="Paisaje" />
                        <div className="fondoNaranja rounded-bottom rounded-3 p-3 text-light">
                            <h3 className="fw-semibold">{nombre_actividad}</h3>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-center mt-5">
                    <div className="d-flex m-3" style={{ width: "80%" }}>
                        <div className="me-3 border-black border-end border-3 border-dark">
                            <h5 className="mb-3">Descripción</h5>
                            <blockquote className="blockquote mb-0">
                                <p>{descripcion}</p>
                            </blockquote>
                        </div>

                        <div className="card bg-light " style={{ width: "60rem", height: "7rem" }}>
                            <div className="card-header text-center">
                                Costo aproximado
                            </div>
                            <div className="card-body text-center p-2">
                                <h2 className="card-text colorAzul">${precio}</h2>
                            </div>
                        </div>
                    </div>
                </div>



                <div className="d-flex justify-content-center mt-5">
                    <div className="d-flex" style={{ width: "80%" }}>
                        <h5 className="margin-left">Comentarios</h5>

                        <div className="container m-3 p-0">
                            <div className=" p-2">

                                <div className="media mb-4">
                                    <div className=" rounded rounded-3 border shadow-sm bg-light m-2 p-2">
                                        <h6 className="mt-0 text-secondary">@{store.user.username}</h6>
                                        <div className="d-flex justify-content-between align-items-center">

                                            <textarea className="form-control mb-2" value={nuevoComentario} id="floatingTextarea" placeholder="Agrega un comentario" rows="1"

                                                onChange={(event) => setNuevoComentario(event.target.value)}
                                                onKeyUp={(event) => {
                                                    if (event.key === 'Enter') {
                                                        event.preventDefault();
                                                        handleCommentSubmit();
                                                    }
                                                }}

                                            ></textarea>


                                            <button type="button" className="btn btn-transparent p-0 mx-2" onClick={handleCommentSubmit}
                                            ><i className="fa-solid fa-circle-arrow-up fs-4 colorNaranja"></i></button>
                                        </div>
                                    </div>
                                </div>

                                {comentarios.map(comentario => (
                                    <div className="media mb-4" key={comentario.id}>
                                        <div className="rounded rounded-3 border shadow-sm bg-light m-2 p-2">
                                            <h6 className="mt-0 colorNaranja">{comentario.usuario}</h6>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span>{comentario.mensaje}</span> <i className="fa-solid fa-trash-can d-flex justify-content-end mx-2 text-secondary"></i> {/*falta agregar para eliminar comentarios */}
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