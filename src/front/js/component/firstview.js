import React from "react";
import "../../styles/firstview.css"
export default function FirstView() {
    return (
        <div id="view" className="container-fluid p-5">
            <div className="h-100 d-flex align-items-center pb-5">
                <div className="ms-5 mt-2">
                    <p className="text-white fw-bold fs-2 mt-3">CREA RECUERDO QUE TE ACOMPAÑEN TODA TU VIDA...</p>
                    <p className="text-white fs-5 fw-semibold fst-italic ms-5">Your perfect journey in one step from you</p>
                </div>
            </div>
            <div className="d-flex justify-content-around mt-5">
                <div id="motocross" className="card text-bg-dark">
                    <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/6b/a4/9b/caption.jpg?w=500&h=400&s=1" className="card-img" alt="motocross" />
                </div>
                <div id="snorkeling" className="card text-bg-dark">
                    <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/b5/f8/15/caption.jpg?w=500&h=400&s=1" className="card-img" alt="motocross" />
                </div>
                <div id="hiking" className="card text-bg-dark">
                    <img src="https://res.cloudinary.com/worldpackers/image/upload/c_limit,f_auto,q_auto,w_1140/algoi8queob4aluhjkgd" className="card-img" alt="motocross" />
                </div>
                <div id="streets" className="card text-bg-dark">
                    <img src="https://imagenes.razon.com.mx/files/image_940_470/uploads/2024/07/29/66a7c545c89dd.jpeg" className="card-img" alt="motocross" />
                </div>
                <div id="hiking 2" className="card text-bg-dark">
                    <img src="https://cdn1.intriper.com/wp-content/uploads/2021/11/30112534/Paisaje-Cultural-Cafetero.jpg" className="card-img" alt="motocross" />
                </div>
            </div>
        </div>
        
    )
}