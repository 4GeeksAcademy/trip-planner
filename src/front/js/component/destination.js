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
                <div className="d-flex justify-content-center">
                    <div className="position-relative" style={{ width: "80%", height: "250px" }}>
                        <img id="destination" src={imagenCentral} className="img-fluid rounded rounded-3 shadow" style={{ width: "100%", height: "300px", objectFit: "cover" }} />
                        <div className="overlay"></div>
                        <p className="destinationDetail text-center fs-1 fw-bold my-3 text-white position-absolute top-50 start-50 translate-middle text-nowrap">{city}, {country}</p>
                    </div>
                </div>
            </div>



            <div className="activity-list d-flex flex-column align-items-center">
                {data.map((item, index) => {
                    return (
                        <div className="activity-card" style={{ width: "80%", height: "170px" }}>
                            <div className="image-container">
                                <img src={item.pictures[0]} alt="img activity" className="rounded-top" />
                            </div>
                            <div className="description p-4 d-flex flex-column">
                                <h3>{item.name}</h3>
                                <p>{item.shortDescription}</p>
                            </div>

                          
                                <button className="btn fondoAzul shadow rounded-0 rounded-end" style={{ width: "7%" }} onClick={() => handleAddActivity({ name: 'Flyboard en Cancun' })}>
                                    <Link to="/login" className="link" style={{ height: "100%" }}>
                                    <i class="fa-solid fa-circle-plus me-2 fs-2 text-light"></i></Link>
                                </button>
                          
                        </div>



                    )
                })}
            </div>
        </div>
    )
}