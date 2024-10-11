import React from 'react';
import "../../styles/expaises.css";
import { Link } from "react-router-dom";
export default function Argentina(){
    return (
        <div>
            <div id="pais">
                <img id="cancun" src="https://humanidades.com/wp-content/uploads/2019/02/Buenos-aires-2-e1585704113704-800x416.jpg" className="img-fluid rounded-pill" />
            </div>
            <div>
                <p className="text-center fs-1 fw-bold">Buenos Aires, Argentina</p>
            </div>
            <div id="borde" className="mt-5">
                <img id="patron" src="https://www.shutterstock.com/shutterstock/photos/2189348225/display_1500/stock-vector-argentina-flag-pattern-design-sunshine-background-vector-illustration-2189348225.jpg" className="img-fluid rounded-pill" />
            </div>
            <div className="activity-list">
                <div className="activity-card">
                    <div className="image-container">
                        <img src="https://assets.turismocity.com/cdn-cgi/image/format=auto,width=1400,fit=scale-down/img/1679595981993_teatro%20colon.jpeg" alt="Teatro Collón" />
                    </div>
                    <div className="description">
                        <p>Teatro Colón</p>
                    </div>
                    <button className="add-btn">❤️ agregar </button>
                </div>
                <div className="activity-card">
                    <div className="image-container">
                        <img src="https://assets.turismocity.com/cdn-cgi/image/format=auto,width=1400,fit=scale-down/img/1679596035257_obelisco%20Buenos%20Aires.jpeg" alt="Obelisco" />
                    </div>
                    <div className="description">
                        <p>Visitar el Obelisco</p>
                    </div>
                    <button className="add-btn">❤️ agregar</button>
                </div>
                <div className="activity-card">
                    <div className="image-container">
                        <img src="https://assets.turismocity.com/cdn-cgi/image/format=auto,width=1400,fit=scale-down/img/1679592733086_caminito%20buenos%20aires.jpeg" alt="Recorrer el caminito" />
                    </div>
                    <div className="description">
                        <p>Recorrer el caminito</p>
                    </div>
                    <button className="add-btn">❤️ agregar</button>
                </div>
            </div>
        </div>
    )
}