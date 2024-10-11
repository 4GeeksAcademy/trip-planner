import React from 'react';
import "../../styles/expaises.css";
export default function Peru(){
    return (
        <div>
            <div id="pais">
                <img id="cancun" src="https://trexperienceperu.com/sites/default/files/llama_at_the_top_of_machu_picchu_trexperience.jpg" className="img-fluid rounded-pill" />
            </div>
            <div>
                <p className="text-center fs-1 fw-bold">Machu Picchu, Peru</p>
            </div>
            <div id="borde" className="mt-5">
                <img id="patron" src="https://img.freepik.com/vector-gratis/patron-peruano-diseno-plano_23-2149666637.jpg" className="img-fluid rounded-pill" />
            </div>
            <div className="activity-list">
                <div className="activity-card">
                    <div className="image-container">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBRrvqaL2YxeqXTvuls_FZegMZ5CtaHQvWYA&s" alt="Santuario Machu Picchu" />
                    </div>
                    <div className="description">
                        <p>Santuario de Macchu Picchu</p>
                    </div>
                    <button className="add-btn">❤️ agregar</button>
                </div>
            </div>
        </div>
    )
}