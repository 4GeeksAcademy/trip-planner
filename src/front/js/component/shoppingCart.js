import React from "react";
import "../../styles/shoppingCart.css"
import { useContext } from "react";
import { Context } from "../store/appContext";



const ShoppingCart = (props) => {
    
    const { store, actions } = useContext(Context);
    

    const calculateTotalCost = () => {
        return store.selected_trip.filter(activity=>activity.viaje_id == props.viaje_id).reduce((total, item) => total + item.cost, 0);
        
    };

    const calculateCostPerMember = () => {
        let tripMembersLength = store.miembros.filter(miembro=>miembro.viaje_id == props.viaje_id).length;
        const totalCost = calculateTotalCost();
        const numberOfMembers = tripMembersLength + 1 || 1; // Asegurarse de que no se divida por cero
        return totalCost / numberOfMembers;
    };
    

    return (
    <div className = "container-fluid d-flex justify-content-end p-0">
        <div className="btn-group">
            <button type="button" className="fondoAzul text-white dropdown-toggle fw-bold custom-rounded px-5 py-4" style={{ margin: 0 }} data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                Tu viaje
            </button>
            <ul className="dropdown-menu dropdown-menu-end rounded-3">
                {store.selected_trip.length == 0 ? (
                    <p className="d-flex flex justify-content-center text-secundary mx-3">Agrega una actividad a tu viaje</p>
                ) : (
                    store.selected_trip.filter(activity=>activity.viaje_id == props.viaje_id).map((item, index) => (
                        <React.Fragment key={index}>
                                <li><hr className="dropdown-divider"/></li>
                                <li className="trip">
                                    <div className="new-trip d-flex flex">
                                        <div className="image d-flex flex">
                                            <img src={item.imagenes} className="img-viaje" alt="Imagen" />
                                        </div>
                                        <div className="activity-text">
                                            <span className="activity-name item" style={{ fontSize: '16px', fontWeight: '300', overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 1 }}>{item.name}</span>
                                            <span className="trip-cost dropdown-item">Costo $ {item.cost}</span>
                                        </div>
                                        <div className="delete d-flex flex">
                                            <i className="delete-trip fa-solid fa-trash-can" role="button"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    console.log("Click on delete");
                                                    actions.deleteActivity({name: item.name})
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
                        <p className="total-costs-price p-2">$ {actions.sumCostosTotales(props.viaje_id)}</p>
                    </li>
                    <li><hr className="dropdown-divider"/></li>
                    <li className="personal-costs d-flex flex">
                        <span className="personal-costs-text p-2">Gastos personales</span>
                        <span className="personal-costs-price p-2">$ {calculateCostPerMember().toFixed(2)}</span>
                    </li>
            </ul>
        </div>
    </div>
    );
}

export default ShoppingCart;