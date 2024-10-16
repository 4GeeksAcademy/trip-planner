import React, { useContext } from 'react';
import { Context } from "../store/appContext.js"
import '../../styles/viajes.css';
import {Link} from 'react-router-dom';
import ShoppingCart from "../component/shoppingCart.js"


const IndividualTrip = () => {

    const { store, actions } = useContext(Context);


    return (
        <>
            <div className="container">

                <div className=" rounded d-flex flex-column flex-md-row justify-content-between bg-light p-4 shadow">
                    <div className="d-flex flex-column flex-md-row justify-content-between" style={{ width: "80%" }} >
                        <h5 className="mb-1">Nombre de Viaje</h5>
                        <p className="mb-1">DD/MM/AAAA</p>
                        <p className="mb-1">Presupuesto</p>

                    </div>
                    <div className="mx-4 mt-3 mt-md-0">
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle shadow" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa-solid fa-user-group me-2"></i>
                                Miembros
                            </button>
                            <ul className="dropdown-menu dropdown-menu-dark p-1" aria-labelledby="dropdownMenuButton2">
                                {store.miembros.map((item, index) => {
                                    return (<li key={index}><p className="dropdown-item d-flex justify-content-between align-items-center" href="#">{item.name}<i className="fa-solid fa-circle-info fs-5"></i></p></li>)
                                })}
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <p className="dropdown-item" href="#"> <i className="fa-solid fa-user-plus me-2"></i>Agregar miembro</p>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <ShoppingCart />
            </div>
            <div className="container">
                <div className="row justify-content-center g-4">
                    {store.activities.map((item, index) => {
                        return (
                            // <Card className="col" key={index} actividad={item.name} costo={item.cost} autor={item.author} likes={item.likes} image={item.imageUrl} />
                            <div key={index} className="col-md-3">
                                <div className="card rounded shadow h-100" style={{ width: '100%' }}>
                                    <img src={item.imageUrl} className="card-img-top" alt="..." style={{ height: '280px', objectFit: 'cover' }} />
                                    <div className="card-body d-flex flex-column">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <h5 className="card-title mb-0">{item.name}</h5>
                                            <p className="mb-0 text-muted small"><i className="fa-solid fa-user me-2"></i>{item.author}</p>
                                        </div>
                                        <p className="card-text">{item.description}</p>
                                            <div className="d-flex justify-content-end align-items-center border-black border-bottom border-3  my-2">
                                                <span className="p-2 rounded">${item.cost}</span>
                                            </div>
                                        <div className="d-flex justify-content-between align-items-center mt-auto">
                                            <Link to="/details" className="detalles text-light btn-sm px-4">Ver más</Link>
                                            <div className="d-flex align-items-center">
                                                <button className="bg-transparent border-0"><i className="text-danger fa-solid fa-heart me-2"></i>{item.likes}</button>
                                            </div>
                                        </div>
                                    </div>
                                        <div className="card-footer text-center bg-secondary text-light p-2">
                                            <button className={`btn btn btn-light btn-sm px-4 shadow ${actions.isViaje({name: item.name, id: item.id, type: "tripDetail"}) && "btn-danger"} `}
                                            onClick={() => actions.addViaje( {name: item.name, id: item.id, type: "tripDetail", cost: item.cost, imageUrl: item.imageUrl} )}>
                                            {actions.isViaje( {name: item.name, id: item.id, type: "tripDetail", cost: item.cost, imageUrl: item.imageUrl}) ? 
                                                <>
                                                    <i className="text-danger delete-trip fa-solid fa-trash-can p-1"></i>
                                                    <span className="text-danger">Quitar viaje</span> 
                                                </>
                                                : 
                                                <>
                                                    <i className="text-success fa-solid fa-circle-plus p-1"></i>
                                                    <span>Agregar Viaje</span>
                                                </>
                                            }
                                            </button>
                                        </div>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </>
    )
}
export default IndividualTrip

{/* <div class="row row-cols-1 row-cols-md-3 g-4">
  <div class="col">
    <div class="card">
      <img src="..." class="card-img-top" alt="...">
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div> */}