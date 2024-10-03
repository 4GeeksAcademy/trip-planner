import React from "react";
import "../../styles/adventureSection.css"



const AdventureSections = () => {
    return(
        <div className="container">
            <div className="text-card">
                <div className="title-adventure">
                    <h1 className="title-text">Atrévete a vivir una nueva Aventura</h1>
                    <p className="text">Te ayudamos a coordinar cada detalle de tu aventura, desde la creación de presupuestos hasta la selección de atracciones, restaurantes y alojamiento. ¡Haz que viajar sea más fácil, organizado y divertido para ti y tus compañeros de viaje!</p>
                </div>
                <div className="activity">
                    <div className="task d-flex flex">
                        <div className="icon m-2">
                            <img src="https://cdn-icons-png.flaticon.com/512/2798/2798097.png" className="icon-activity"/>
                        </div>
                        <div className="text-activity">
                            <h4 className="title-activity">Planificación de Viajes</h4>
                            <p className="description-activity">Organiza tus destinos, actividades y tiempos de manera sencilla.</p>    
                        </div> 
                    </div>
                    
                    <div className="task d-flex flex">
                        <div className="icon m-2">
                            <img src="https://cdn-icons-png.flaticon.com/512/3564/3564854.png" className="icon-activity"/>
                        </div>
                        <div className="text-activity">
                            <h4 className="title-activity">Presupuesto</h4>
                            <p className="description-activity">Mantén control de los costos estimados y ajusta tu plan según tu presupuesto.</p>    
                        </div>
                    </div>

                    <div className="task d-flex flex">
                        <div className="icon m-2">
                            <img src="https://cdn-icons-png.flaticon.com/512/45/45924.png" className="icon-activity"/>
                        </div>
                        <div className="text-activity">
                            <h4 className="title-activity">Lugares para Visitar</h4>
                            <p className="description-activity"> Explora los mejores puntos turísticos y experiencias únicas.</p>    
                        </div>
                    </div>
                </div>
            </div>
            <div className="image-card">
                <img src="https://www.getaway.co.za/wp-content/uploads/2024/01/pexels-te-lensfix-1371360-1-719x431.webp" className="imagen-adventure" alt="Adventur-image.jpg"/>
            </div>
        </div>

    )
}

export default AdventureSections;