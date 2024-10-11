import React from 'react';
import "../../styles/expaises.css";
export default function RepublicaDominicana(){
    return (
        <div>
            <div id="pais">
                <img id="cancun" src="https://media.staticontent.com/media/pictures/83239c0a-50e5-44c5-bbb2-bea8292543e4" className="img-fluid rounded-pill" />
            </div>
            <div>
                <p className="text-center fs-1 fw-bold">Punta Cana, República Dominicana</p>
            </div>
            <div id="borde" className="mt-5">
                <img id="patron" src="https://img.freepik.com/vector-gratis/patron-peruano-diseno-plano_23-2149666637.jpg" className="img-fluid rounded-pill" />
            </div>
            <div className="activity-list">
                <div className="activity-card">
                    <div className="image-container">
                        <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/2e/48/b6/caption.jpg?w=600&h=600&s=1" alt="Cueva del agua" />
                    </div>
                    <div className="description">
                        <p>Excursion en buggy a la cueva del agua</p>
                    </div>
                    <button className="add-btn">❤️ agregar</button>
                </div>
                <div className="activity-card">
                    <div className="image-container">
                        <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/24/21/86/caption.jpg?w=600&h=600&s=1" alt="Excursion a isla Saona" />
                    </div>
                    <div className="description">
                        <p>Excursion en barco a la isla Saona</p>
                    </div>
                    <button className="add-btn">❤️ agregar</button>
                </div>
                <div className="activity-card">
                    <div className="image-container">
                        <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/3b/25/8c/caption.jpg?w=600&h=600&s=1" alt="Scape Park Cap Cana" />
                    </div>
                    <div className="description">
                        <p>Scape Park Cap Cana</p>
                    </div>
                    <button className="add-btn">❤️ agregar</button>
                </div>
            </div>
        </div>
    )
}