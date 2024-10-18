import React from "react";
import "../../styles/firstview.css"
import "../../styles/destinationCards.css";
import { Link } from "react-router-dom";
import { Carousel } from 'react-bootstrap';
import suggestions from "../store/suggestions";
export default function FirstView() {
    return (
        <div id="view" className="container-fluid">
            <div className="video-container">
                <video autoPlay loop muted playsInline className="video-background">
                    <source src="https://firebasestorage.googleapis.com/v0/b/trippy-proyecto.appspot.com/o/videorpueba1.mp4?alt=media&token=20d4816e-6c25-4a6b-b960-0bdd4644586b" type="video/mp4" />
                </video>
            </div>

            <div className="h-100 d-flex align-items-center pt-5">
                <div className="ms-5 mt-2">
                    <h1 className="text-white fw-bold mt-3">CREA RECUERDO QUE TE ACOMPAÑEN TODA TU VIDA...</h1>
                    <p className="text-white fs-5 fw-semibold fst-italic ms-5">Your perfect journey in one step from you</p>
                </div>
            </div>
            <div className="carousel-container">
                <div className="carousel">
                    {suggestions.map((item, index) => (
                        <div key={index} className="card">
                            <img
                                src={item.imagenCentral}
                                className="card-img"
                                alt={item.city}
                            />
                            <div className="card-overlay">
                                <h5 className="card-title">{item.country}</h5>
                                <p className="card-text">{item.city}</p>
                            </div>
                            <Link to="/destination" state={item} className="stretched-link"></Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}