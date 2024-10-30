import React, { useState, useContext, useSyncExternalStore } from 'react';
import "../../styles/addActivityCard.css"
import { Context } from "../store/appContext.js"
import { useNavigate } from "react-router-dom";
import "../../styles/index.css";

const AddActivity = ({ viajeId }) => {
    const { actions } = useContext(Context);
    const [idViaje, setIdViaje] = useState(viajeId)


    const navigate = useNavigate();

    const handleImageClick = () => {
        actions.guardarId(idViaje)
        navigate("/add-activity")
    }



    return (
        <div className="col-md-3">
        <div className="card shadow fondoAzul border border-light border-3" style={{ width: '100%', borderRadius: "30px", position: 'relative', overflow: 'hidden', height:'430px' }}>
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
                <button className="btn shadow w-100 p-2 m-1 mb-3 py-3 text-dark bg-light rounded-pill fw-bold" onClick={() => {/* Acción 2 */ }}>
                    <i className="fa-solid fa-circle-plus me-1 colorNaranja text-center fs-5" ></i> Explora nuevas actividades
                </button>
            </div>
        </div>
    </div>

    )
}

export default AddActivity;