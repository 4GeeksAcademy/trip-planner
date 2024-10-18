import React, { useContext } from "react";
import "../../styles/expaises.css";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { useLocation } from 'react-router-dom'

export default function Destination() {
    let { state } = useLocation();
    const { country, city, imagenCentral, data } = state
    const { isLoggedIn } = useContext(Context);
    const navigate = useNavigate();

    const handleAddActivity = (item) => {
        if (isLoggedIn) {
            navigate('/viajes', { state: item })
        } else {
            navigate("/login")
        }
    };
    return (
        <div>
            <div className="container-fluid mx-auto p-2">
                <div className="d-flex justify-content-center mt-4" >
                    <img id="destination" src={imagenCentral} className="img-fluid rounded rounded-3 shadow" style={{ width: "85%", height: "500px", objectFit: "cover" }} />
                </div>
            </div>

            <div>
                <p className="text-center fs-1 fw-bold my-3">{city}, {country}</p>
            </div>

            <div className="divider rounded-pill"></div>

            <div className="activity-list">
                {data.map((item, index) => {
                    return (
                        <div className="activity-card">
                            <div className="image-container">
                                <img src={item.pictures[0]} alt="img activity" />
                            </div>
                            <div className="description">
                                <h3>{item.name}</h3>
                                <p>{item.shortDescription}</p>
                            </div>
                           
                                <button className="btn bg-secondary" onClick={() => handleAddActivity({name: 'Flyboard en Cancun'})}>
                                    <Link to="/login" className="link"><i class="fa-solid fa-heart me-2 text-danger"></i> agregar</Link>
                                </button>
                                </div>
                            
                    
                    )
                })}
            </div>
        </div>
    )
}