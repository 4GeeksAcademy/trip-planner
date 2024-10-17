import React from "react";
import "../../styles/destinationCards.css";
import { Link } from "react-router-dom";
import suggestions from "../store/suggestions";


const DestinationCards = () => {
   
    return(
        <div className="container destination-grid">
            {suggestions.map((item, index) => {
                
                return (
                    <div className="card text-bg-dark border border-0 bg-transparent">
                        <img src={item.imagenCentral} className="card-img" alt="Cancún" />
                        <div className="card-img-overlay">
                            <h5 className="card-title text-white">{item.country}</h5>
                            <p className="card-text text-white">{item.city}</p>
                        </div>
                        <Link to="/destination" state={item} className="stretched-link"></Link>
                    </div>
                )
                
            })}
            
            
        </div>
    );
}

export default DestinationCards;