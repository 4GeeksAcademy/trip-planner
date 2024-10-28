import React from "react";
import "../../styles/shoppingCart.css"
import { useContext } from "react";
import { Context } from "../store/appContext";


const ShoppingCart = () => {
    
    const { store, actions } = useContext(Context);

    return (
    <div className = "container d-flex flex justify-content-end">
        <div className="btn-group">
            <button type="button" className="fondoAzul text-white btn dropdown-toggle fw-bold" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                Tu viaje
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
                {store.selected_trip.length == 0 ? (
                    <p className="d-flex flex justify-content-center text-secundary mx-3">Agrega una actividad a tu viaje</p>
                ) : (
                    store.selected_trip.map((item, index) => (
                        <React.Fragment key={index}>
                                <li><hr className="dropdown-divider"/></li>
                                <li className="trip">
                                    <div className="new-trip d-flex flex">
                                        <div className="image d-flex flex">
                                            <img src={item.imageUrl} className="img-viaje" alt="Cancún" />
                                        </div>
                                        <div className="activity-text">
                                            <span className="activity-name item">{item.name}</span>
                                            <span className="trip-cost dropdown-item">Costo $ {item.cost}</span>
                                        </div>
                                        <div className="delete d-flex flex">
                                            <i className="delete-trip fa-solid fa-trash-can" role="button"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    console.log("Click on delete");
                                                    actions.deleteViaje({name: item.name})
                                                }}>
                                            </i>
                                        </div>
                                    </div>
                            </li>
                        </React.Fragment>
                    ))
                )}
                    <li><hr className="dropdown-divider"/></li>
                    <li className="costs d-flex flex">
                        <p className="total-costs-text p-2">Total costos</p>
                        <p className="total-costs-price p-2">$ {actions.sumCostosTotales()}</p>
                    </li>
                    <li><hr className="dropdown-divider"/></li>
                    <li className="personal-costs d-flex flex">
                        <span className="personal-costs-text p-2">Gastos personales</span>
                        <span className="personal-costs-price p-2">$ </span>
                    </li>
            </ul>
        </div>
    </div>
    );
}

export default ShoppingCart;