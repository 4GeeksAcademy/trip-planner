import React from 'react';
import "../../styles/expaises.css";
export default function Colombia(){
    return (
        <div>
            <div id="pais">
                <img id="cancun" src="https://www.medellin.travel/wp-content/uploads/2021/02/Guatape3-1.png" className="img-fluid rounded-pill" />
            </div>
            <div>
                <p className="text-center fs-1 fw-bold">Guatapé, Colombia</p>
            </div>
            <div id="borde" className="mt-5">
                <img id="patron" src="https://www.shutterstock.com/image-vector/awesome-geometric-seamless-pattern-art-260nw-2353820725.jpg" className="img-fluid rounded-pill" />
            </div>
            <div className="activity-list">
                <div className="activity-card">
                    <div className="image-container">
                        <img src="https://boatohotel.com/wp-content/uploads/2023/03/BOATO-16-5-activiades_blog.jpg" alt="kayak en guatape" />
                    </div>
                    <div className="description">
                        <p>Kayak en Guatapé</p>
                    </div>
                    <button className="add-btn">❤️ agregar</button>
                </div>
                <div className="activity-card">
                    <div className="image-container">
                        <img src="https://cdn.getyourguide.com/img/tour/fd506e23fd6fb66d.jpeg/97.jpg" alt="El peñon" />
                    </div>
                    <div className="description">
                        <p>El peñon</p>
                    </div>
                    <button className="add-btn">❤️ agregar</button>
                </div>
                <div className="activity-card">
                    <div className="image-container">
                        <img src="https://imagenes.eltiempo.com/files/image_1200_600/uploads/2024/03/07/65e9dd6eb5e78.jpeg" alt="Antioquia" />
                    </div>
                    <div className="description">
                        <p>Antioquia</p>
                    </div>
                    <button className="add-btn">❤️ agregar</button>
                </div>
            </div>
        </div>
    )
}