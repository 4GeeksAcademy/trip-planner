import '../../styles/viajes.css';
import React, { useContext, useState, useEffect } from 'react';
import { Context } from "../store/appContext.js"
import { Link } from "react-router-dom";
import "../../styles/index.css";


const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', timeZone: 'UTC' };
    return date.toLocaleDateString('es-ES', options);
};


const Viajes = () => {

    const { store, actions } = useContext(Context);

    const [longitudViaje, setLongitudViaje] = useState();

    const [isLoading, setIsLoading] = useState(false);




    useEffect(() => {

        const fetchData = async () => {
            setIsLoading(true)
            try {
                const data = await actions.get_trips();
                setLongitudViaje(store.viajes.length)
            } catch (error) {
                console.error(error); // Handle any errors
            } finally {
                setIsLoading(false); // Finalizar la carga
            }
        }
        fetchData()
    }, [store.upDate]);

    const trips = store.viajes || [];


    const countGroups = () => {
        let groupNumber = 0;
        trips.forEach((trip) => {
            if (trip.people > 1) {
                groupNumber += 1;
            }
        })
        return groupNumber
    }

    const sortedTrips = trips.sort((a, b) => new Date(a.fecha_inicio) - new Date(b.fecha_inicio));

    console.log(store.viajes)

    return (
        <div className="PaginaPrincipal">
            {/* User Banner */}
            {console.log(store.user)}
            <div className="d-flex flex-column flex-md-row align-items-center justify-content-center">

                <div className="container d-flex bg-light p-4 shadow ms-5 me-3 mb-3 mb-md-0" style={{ maxWidth: "80%", width: "100%", marginTop: "20px", borderRadius: "30px" }}>
                    <div className="d-flex flex-column align-items-start flex-grow-1 mx-3" >
                        <h5 className='colorAzul'>@{store.user.username}</h5>
                        <p>{store.user.name}</p>
                    </div>
                    <div className="mx-4 text-end">
                        <p className="mb-1"><i className="iconos fa-solid fa-map-location-dot me-2"></i>Proximos viajes: <span className="colorAzul fw-bold">{longitudViaje}</span></p>
                        <p className="mb-3"><i className="iconos fa-solid fa-user-group me-2"></i>Grupos: {countGroups}<span className="colorAzul fw-bold">{ }</span></p>
                    </div>

                </div>

                <img src={store.user.profile_image_url || 'https://i.pinimg.com/550x/a8/0e/36/a80e3690318c08114011145fdcfa3ddb.jpg'} className="rounded-circle ms-0 me-5 shadow" style={{ objectFit: 'cover', width: "120px", height: "120px" }} />

            </div>



            {/* individual trips*/}
            {isLoading == true ? <div className="text-center">
                <div className="spinner-border m-5" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div> :

                <div>

                    {trips.map((item, index) => {

                        // Para calcular los días transcurridos entre fecha y fecha en número entero
                        const fechaInicio = new Date(item.fecha_inicio);
                        const fechaFin = new Date(item.fecha_fin);
                        const dias = parseInt((fechaFin - fechaInicio) / (1000 * 60 * 60 * 24), 10);

                        return (<div key={index} className="viaje container d-flex mb-3 my-5 rounded-pill p-2 bg-light " style={{ width: "100%", maxWidth: "65%" }}>
                            <img src={item.trip_image_url || "https://firebasestorage.googleapis.com/v0/b/trippy-proyecto.appspot.com/o/fondoDestino.png?alt=media&token=c65fa4ed-494d-410b-bd9a-68e74ef3e456"} className="ima rounded-circle shadow" style={{ objectFit: 'cover', width: "100px", height: "100px" }} />
                            <div className="mt-1 flex-grow-1">
                                <h6 className="mb-2">{item.destino}</h6> 
                                <p className="mb-0 mt-3">{formatDate(item.fecha_inicio)} - {formatDate(item.fecha_fin)}</p>
                                <p className="mb-0 mt-1">
                                    <i className="iconos fa-solid fa-clock me-2"></i>
                                    {dias >= 0 ? dias : 0} días
                                </p>
                            </div>
                            <div className="d-flex flex-column justify-content-end ms-auto p-3">
                                <p className="mb-0 fw-normal">Presupuesto: <span className="colorAzul fw-bold">$ {item.presupuesto || "0"}</span></p>
                                <p className="mb-0 fw-normal">Presupuesto personal: <span className="colorAzul fw-bold">$ {item.presupuesto_personal}</span></p>
                                <p className="mb-0 fw-normal">Número de personas: <span className="colorAzul fw-bold">0</span></p>
                            </div>

                            <div className="d-flex align-items-center ms-3 me-3 fs-3">
                                <Link to={`/trip/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <i className="fa-solid fa-chevron-right opacity-50"></i>
                                </Link>
                            </div>
                        </div>)
                    })}
                </div>
            }

            <div className="d-flex justify-content-evenly">

                <Link to="/add-new-trip" className="btn bg-light mt-5 p-3 mx-3 shadow w-50 rounded-pill border border-3">
                    <i className="fa-solid fa-circle-plus me-2 text-success"></i>
                    Añadir un nuevo viaje
                </Link>

            </div>




        </div>
    )
}

export default Viajes