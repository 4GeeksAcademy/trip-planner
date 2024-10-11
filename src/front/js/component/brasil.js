import React from "react";
import "../../styles/expaises.css";
export default function Brasil() {
    return(
        <div>
            <div id="pais">
                <img id="cancun" src="https://c4.wallpaperflare.com/wallpaper/43/779/691/sugar-loaf-mountain-botafogo-beach-rio-de-janeiro-sunrise-wallpaper-preview.jpg" className="img-fluid rounded-pill" />
            </div>
            <div>
                <p className="text-center fs-1 fw-bold">Río de Janeiro, Brasil</p>
            </div>
            <div id="borde" className="mt-5">
                <img id="patron" src="https://m.media-amazon.com/images/I/71Etlmv1Z2L._AC_UF894,1000_QL80_.jpg" className="img-fluid rounded-pill" />
            </div>
            <div className="activity-list">
                <div className="activity-card">
                    <div className="image-container">
                        <img src="https://freewalkertours.com/wp-content/uploads/Escalera-Selaron5-1-600x401.jpeg" alt="Escalera Selarón" />
                    </div>
                    <div className="description">
                        <p>Escalera Selarón</p>
                    </div>
                    <button className="add-btn">❤️ agregar</button>
                </div>
                <div className="activity-card">
                    <div className="image-container">
                        <img src="https://estaticos.elmundo.es/assets/multimedia/imagenes/2016/08/07/14705726498526.jpg" alt="Cristo redentor" />
                    </div>
                    <div className="description">
                        <p>Cristo redentor</p>
                    </div>
                    <button className="add-btn">❤️ agregar</button>
                </div>
                <div className="activity-card">
                    <div className="image-container">
                        <img src="https://content.skyscnr.com/m/28b2f34b194d5ba1/original/GettyImages-457745659.jpg?resize=1800px:1800px&quality=100" alt="Montaña pan de azucar" />
                    </div>
                    <div className="description">
                        <p>Montaña pan de azucar</p>
                    </div>
                    <button className="add-btn">❤️ agregar</button>
                </div>
            </div>
        </div>
    )
}