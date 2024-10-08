import React from "react";
import "../../styles/shoppingCart.css"


const ShoppingCart = () => {
    

    return (
    <div className = "container">
        <div className="btn-group">
            <button type="button" className="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Tu viaje
            </button>
            <ul className="dropdown-menu">

                <li className="group-name"><span className="dropdown-item" href="#">Nombre del grupo</span></li>

                <li className="trip d-flex flex">
                    <div className="image">
                        <img src="https://blogskystorage.s3.amazonaws.com/2023/06/que-hacer-en-cancun.jpeg" className="img-viaje" alt="Cancún" />
                    </div>
                    <div>
                        <span className="activity-name dropdown-item">Nombre de la actividad</span>
                        <span className="trip-cost dropdown-item">Total + numero</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    )

    
}

export default ShoppingCart;