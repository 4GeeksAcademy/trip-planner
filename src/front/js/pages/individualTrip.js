import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../store/appContext.js"
import '../../styles/viajes.css';
import { Link, useParams } from 'react-router-dom';
import ShoppingCart from "../component/shoppingCart.js"
import toast from "react-hot-toast";
import AddActivity from "../component/AddActivity.js"
import Recomendaciones from '../component/recomendaciones.js';
import "../../styles/index.css";

const IndividualTrip = () => {
    
    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [newMember, setNewMember] = useState({ email: "" });
    const [selectedMember, setSelectedMember] = useState("null");
    const [like, setLike] = useState(false);

    // const handleClick = (actividades_id, user_id) => {
    //     console.log("Este es el actividades_id", actividades_id)
    //     if (!user_id) {
    //         console.log("No proporcionado el user_id");
    //         return;
    //     }
    //     if (actions.isLike(actividades_id, user_id)) {
    //         actions.deleteLike(actividades_id, user_id)
    //         console.log(`Like eliminado para actividad ID: ${actividades_id} por usuario ID: ${user_id}`)
    //     } else {
    //         actions.addLike (actividades_id, user_id)
    //         console.log(`Like agregado para actividad ID: ${actividades_id} por usuario ID: ${user_id}`)
    //     }
    // };

    const handleClick = (index) => {
        if (actions.isLike(index)) {
            actions.deleteLike(index)
        } else {
            actions.addLike(index)
        }
    };

    // useEffect(() => {
    //     const loadLikes = async () => {
    //         await actions.get_likes(id);
    //         console.log("Likes de la actividad:", store.likes);
    //     };
    //     loadLikes();
    // }, [id]);

    useEffect(() => {
        actions.setCurrentId(parseInt(id));
        actions.getActivities(id);
    }, [id]);
    
    
    useEffect(() => {
        if (store.viajes.length > 0) {
            setLoading(false);
        }
    }, [store.viajes]);
    
    const viaje = store.viajes.find(v => v.id === parseInt(id));
    
  

    if (loading) {
        return <div className="text-center">
            <div className="spinner-border m-5" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>;
    }

    if (!viaje) {
        return <p>Viaje no encontrado</p>;
    }


    const handleInputChange = (e) => {
        setNewMember({ ...newMember, [e.target.name]: e.target.value });
    }

    const handleAddMemeber = () => {
        console.log(id)
        console.log("Estos son los user", store.users)
        if (!newMember.email) {
            alert("Por favor, ingresa un correo electrónico válido.");
            return;
        }
        
        const usuario = store.users.find(usuario => usuario.email === newMember.email)
        console.log(store.users)
        if (usuario) {
            actions.addMember(usuario, id);
            setNewMember({ email: "" });
            toast.success("Miembro agregado correctamente!")
        } else {
            alert("No se encontró un usuario con ese correo.")
        }
    }
    // let membersByTrip = store.miembros.filter((miembro)=> {miembro.viaje_id === id})
    // console.log("miembros por viaje",membersByTrip)
    //Formato de fecha sin horas
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', timeZone: 'UTC' };
        return date.toLocaleDateString('es-ES', options);
    };


    return (
        <div className="PaginaPrincipal">
            <div className="container">

                <div className=" d-flex flex-column flex-md-row justify-content-between bg-light shadow p-4" style={{ borderRadius: "30px" }}>
                    <div className="d-flex flex-column flex-md-row justify-content-between" style={{ width: "80%" }} >
                        <h5 className="colorNaranja mb-1">Destino<div className="colorAzul mb-1 fs-4">{viaje.destino}</div></h5>
                        <div className="mb-1 colorAzul">Fecha de salida: {formatDate(viaje.fecha_inicio)}</div>
                        <div className="mb-1 colorAzul">Presupuesto: $ {viaje.presupuesto}</div>
                    </div>


                    {/* Dropdown de MIEMBROS */}
                    <div className="mx-4 mt-3 mt-md-0">
                        <div className="dropdown">
                            <button className="fondoAzul dropdown-toggle shadow rounded-pill px-5 py-2 text-light" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                                <i className="fa-solid fa-user-group me-2 text-white"></i>
                                Miembros
                            </button>
                            <ul className="dropdown-menu dropdown-menu-dark p-1 " aria-labelledby="dropdownMenuButton2">
                                {store.miembros.length == 0 ? (
                                    <span className="d-flex flex justify-content-center text-secundary m-3">No tienes ningún miembro en tu grupo</span>
                                ) : (
                                    store.miembros.filter(x=>x.viaje_id == id).map((item, index) => (
                                        <React.Fragment key={index}>
                                            <li className="d-flex flex">
                                                <p className="dropdown-item d-flex flex justify-content-between align-items-center" href="#">{item.miembro.name}</p>
                                                <i className="d-flex flex fa-solid justify-content-end fa-circle-info fs-5 m-1" type="button"
                                                    data-bs-toggle="popover"
                                                    title={item.miembro.more_info}
                                                    data-bs-content="pedro"
                                                ></i>
                                                <i className="d-flex flex delete-trip align-item-center fa-solid fa-trash-can m-1 " role="button"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#deleteModal"
                                                    onClick={() => setSelectedMember(item)}
                                                ></i>
                                            </li>
                                            <li><hr className="dropdown-divider" /></li>
                                        </React.Fragment>
                                    ))
                                )}

                                <li className="add-member text">
                                    <button className="dropdown-item cursor-pointer" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">
                                        <i className="fa-solid fa-user-plus me-2"></i>Agregar miembro
                                    </button>
                                </li>
                            </ul>

                            {/* modal para eliminar miembro */}
                            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <React.Fragment>
                                            <div className="modal-header">
                                                <h1 className="modal-title d-flex flex justify-content-center align-center fs-5" id="deleteModalLabel">Eliminar miembro</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                {selectedMember ? `¿Estás seguro de eliminar a ${selectedMember.name} de tu grupo?` : "...Cargando"}
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                                <button type="button" className="btn btn-success" data-bs-dismiss="modal"
                                                    onClick={() => {
                                                        actions.deleteMember(selectedMember)
                                                        setSelectedMember(null)
                                                        toast.success("Miembro borrado correctamente")
                                                    }}
                                                >Eliminar</button>
                                            </div>
                                        </React.Fragment>
                                    </div>
                                </div>
                            </div>

                            {/* modal para agregar miembro */}
                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Invita a un amigo</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="">
                                                <div className="mb-3">
                                                    <label htmlFor="recipient-name" className="col-form-label">Email:</label>
                                                    <input type="email" className="email form-control" id="recipient-email" name="email" value={newMember.email} onChange={handleInputChange} />
                                                </div>
                                                {/* <div className="mb-3">
                                                        <label htmlFor="message-text" className="col-form-label">Nombre:</label>
                                                        <input type="text" className="name form-control" id="recipient-name" name="name" value={newMember.name} onChange={handleInputChange} />
                                                        </div> */}
                                            </div>
                                        </div>

                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                                            <button type="button" className="btn btn-success"
                                                data-bs-dismiss="modal"
                                                onClick={handleAddMemeber}
                                            >Agregar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div >
                    <ShoppingCart />
                
            </div>


            <div className="container">
                <div className="row justify-content-center g-4">
                <AddActivity viajeId={viaje.id} viajeDestino={viaje.destino} />

                    {/* CARDS */}
                    
                    {store.activities.map((item, index) => {
                        return (

                            <div key={index} className="col-md-3">
                                <div className="card shadow bg-light text-black" style={{ width: '100%', borderRadius: "30px", height:'440px' }}>
                                    <img src={item.imagenes || 'https://firebasestorage.googleapis.com/v0/b/trippy-proyecto.appspot.com/o/Dise%C3%B1o%20sin%20t%C3%ADtulo%20(14).png?alt=media&token=2703929a-4977-498e-91de-0ab70b68d609'} className="card-img-top" alt="..." style={{ minHeight: '230px', maxHeight: '230px', objectFit: 'cover' }} />
                                    <div className="card-body d-flex flex-column p-1">
                                        <div className="d-flex justify-content-between align-items-center ">
                                            <div className="card-title mb-0 mx-1 mt-1" style={{ fontSize: '20px', fontWeight: '500', overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 }}>
                                                {item.nombre_actividad}</div>
                                        </div>
                                        <p className="card-text mx-1 p-1 description"  style={{fontSize: '14px'}}>{item.descripcion}</p>
                                            <div className="d-flex justify-content-end align-items-center border-black border-bottom border-2">
                                                <p className="p-2 rounded" style={{fontSize: '13px'}}>${item.precio}</p>
                                            </div>
                                        <div className="d-flex justify-content-between align-items-center mt-2 mb-1">
                                            <Link to="/details" state={item} className="detalles fondoNaranja text-light btn-sm px-4 rounded-pill">Ver más</Link>
                                            <div className="d-flex align-items-center">
                                                <button className="bg-transparent border-0" onClick={() => handleClick(index)}>
                                                { actions.isLike(index) ?
                                                    <i className={`text-danger fa-solid fa-heart me-2`}></i> :
                                                    <i className={`text-danger fa-regular fa-heart me-2`}></i>
                                                }
                                                    {item.likes}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                        <div className="d-flex flex-column justify-content-end align-items-center fondoAzul text-light">
                                            <div className={`p-1  ${actions.isViaje({name: item.name, id: item.id, type: "tripDetail"}) && "btn-danger"} `}
                                            onClick={() => actions.addViaje( {name: item.nombre_actividad, id: item.id, type: "tripDetail", cost: item.precio, imagenes: item.imagenes} )}>
                                            {actions.isViaje( {name: item.nombre_actividad, id: item.id, type: "tripDetail", cost: item.precio, imagenes: item.imagenes}) ? 
                                                <>
                                                    <i className="colorNaranja delete-trip fa-solid fa-trash-can p-1" style={{ color: 'orange' }}></i>
                                                    <span className="text-light">Quitar</span>
                                                </>
                                                :
                                                <>
                                                    <i className="colorNaranja fa-solid fa-circle-plus p-1" style={{ color: 'orange' }}></i>
                                                    <span className="text-light">Agregar</span>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
               
            </div>
        </div>
    )
}

export default IndividualTrip;



