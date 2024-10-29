import React from "react";
import "../../styles/adventureSection.css"



const AdventureSections = () => {
    return(
        <div className="container1 container">
            <div className="text-card">
                <div className="title-adventure">
                    <h1 className="title-text fs-bold fs-1">Atrévete a vivir una nueva aventura</h1>
                    <p className="text my-3">Te ayudamos a coordinar cada detalle de tu aventura, desde la creación de presupuestos hasta la selección de atracciones, restaurantes y actividades variadas.</p> 
                    <h6> ¡Haz que viajar sea más fácil, organizado y divertido para ti y tus compañeros de viaje!</h6>
                </div>
                <div className="activity">
                    <div className="task d-flex flex my-3">
                        <div className="icon m-2">
                            <img src="https://cdn-icons-png.flaticon.com/512/2798/2798097.png" className="icon-activity"/>
                        </div>
                        <div className="text-activity p-2">
                            <h4 className="title-activity m-0 mt-1 fs-bold">Planificación de viajes</h4>
                            <p className="description-activity">Organiza tus destinos, actividades y tiempos de manera sencilla.</p>    
                        </div> 
                    </div>
                    
                    <div className="task d-flex flex my-3">
                        <div className="icon m-2">
                            <img src="https://cdn-icons-png.flaticon.com/512/3564/3564854.png" className="icon-activity"/>
                        </div>
                        <div className="text-activity p-2"> 
                            <h4 className="title-activity m-0 mt-1">Presupuesto</h4>
                            <p className="description-activity">Mantén control de los gastos estimados y ajusta tu plan según tu presupuesto.</p>    
                        </div>
                    </div>

                    <div className="task d-flex flex my-3">
                        <div className="icon m-2">
                            <img src="https://cdn-icons-png.flaticon.com/512/45/45924.png" className="icon-activity"/>
                        </div>
                        <div className="text-activity p-2">
                            <h4 className="title-activity m-0 mt-1">Lugares para visitar</h4>
                            <p className="description-activity"> Explora los mejores puntos turísticos y experiencias únicas.</p>    
                        </div>
                    </div>
                </div>
            </div>
            <div className="image-card ms-2">
                <img src="https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
            </div>
        </div>

    )
}

export default AdventureSections;