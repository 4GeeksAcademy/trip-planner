import React from "react";

const TripScore = () => {
    return (
        <div className="container mt-5" style={{ width: "40%" }}>
            <div className="border p-3 rounded shadow bg-light">
                <button type="button" class="btn-close" disabled aria-label="Close"></button>
                <h4 className="text-center ">¡Felicidades tu viaje ha finalizado!</h4>
                <p className="text-center mb-5">Nos gustaría conocer tu opinión acerca de las actividades realizadas:</p>
                <div className="shadow-sm p-3 mb-2 bg-body-tertiary rounded">
                    <h5>Actvividad 1</h5>
                    <p>descripción breve de actividad</p>
                </div>
                <div className="shadow-sm p-3 mb-2 bg-body-tertiary rounded">
                    <h5>Actvividad 1</h5>
                    <p>descripción breve de actividad</p>
                </div>
                <div className="shadow-sm p-3 mb-2 bg-body-tertiary rounded">
                    <h5>Actvividad 1</h5>
                    <p>descripción breve de actividad</p>
                </div>
                <h6 className="text-center mt-5">¡Gracias por compartir tus experiencias con nosotros!</h6>
                <div className="d-flex justify-content-between mt-5">
                    <button className="btn btn-danger shadow">Mantener privado</button>
                    <button className="btn btn-success shadow">Publicar</button>
                </div>
                <div className="mt-4">
                <div class="card-footer w-100">
                    <button className="btn btn-warning shadow w-100">
                        <i className="fa-solid fa-circle-plus"></i> Iniciar una nueva aventura
                    </button>
                </div>
                </div>
            </div>
        </div>

    );
}

export default TripScore;