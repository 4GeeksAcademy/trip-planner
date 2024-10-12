import React from "react";
import "../../styles/shoppingCart.css"


const ShoppingCart = () => {
    
    

    return (
    <div className = "container d-flex flex  justify-content-end">
        <div className="btn-group">
            <button type="button" className="btn btn-danger btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Tu viaje
            </button>
            <ul className="dropdown-menu">
                <li className="group-name"><span className="dropdown-item" href="#">Nombre del grupo</span></li>
                <li><hr class="dropdown-divider"/></li>
                <li className="trip">
                    <div className="new-trip d-flex flex">
                        <div className="image d-flex flex">
                            <img src="https://blogskystorage.s3.amazonaws.com/2023/06/que-hacer-en-cancun.jpeg" className="img-viaje" alt="Cancún" />
                        </div>
                        <div className="activity-text">
                            <span className="activity-name item">Nombre de la actividad</span>
                            <span className="trip-cost dropdown-item">Precio viaje</span>
                        </div>
                        <div className="delete d-flex flex">
                            <i className="delete-trip fa-solid fa-trash-can"></i>
                        </div>
                    </div>
                </li>
                <li><hr class="dropdown-divider"/></li>
                <li className="costs d-flex flex">
                    <p className="total-costs-text">Total costos</p>
                    <p className="total-costs-price">$0,0</p>
                </li>
            </ul>
        </div>
    </div>
    )

    
}

export default ShoppingCart;