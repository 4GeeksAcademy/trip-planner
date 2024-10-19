import '../../styles/viajes.css';
import React from 'react';
import { Link } from "react-router-dom";


// datos para llenar los componentes en la vista. Hay que modificarlos para sacarlos del back-end

const trips = [
    {
        destination: 'Caracas, Venezuela',
        date: '22/12/2024',
        duration: "7 dias",
        people: 4,
        tripBudget: 5000,
        personalBudget: 1250,
        imgURL: "https://www.tripsavvy.com/thmb/j5_cp1Jg5lQqet7_Vl1v_7tbGqw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-501861673-03562637fcef434eb02e677cd87c8a17.jpg"
    },
    {
        destination: 'Lisboa, Portugal',
        date: '13/02/2025',
        duration: "20 dias",
        people: 1,
        tripBudget: 6000,
        personalBudget: 6000,
        imgURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfuD1Kk-Jdz_ic7L4JdUBvTne5hvJuM3y6zg&s"
    }
];


const usuario = {
    name: "Luis Rene Silva",
    username: "LuisRe",
    viajes: trips.length,
    imgURL: "https://img.freepik.com/foto-gratis/cerrar-hombre-sonriente-tomando-selfie_23-2149155156.jpg"
}

const Viajes = () => {

    // aqui contamos la cantidad de grupos basado en los viajes
    const countGroups = () => {
        let groupNumber = 0;
        trips.forEach((trip) => {
            if (trip.people > 1) {
                groupNumber += 1;
            }
        })
        return groupNumber
    }


    return (
        <>
            {/* User Banner */}

            <div className="d-flex flex-column flex-md-row align-items-center justify-content-center">

                <div className="container rounded d-flex bg-light p-4 shadow ms-5 me-3 mb-3 mb-md-0" style={{ maxWidth: "80%", width: "100%", marginTop: "20px" }}>
                    <div className="d-flex flex-column align-items-start flex-grow-1 mx-3" >
                        <h5 className="colorNaranja">@{usuario.username}</h5>
                        <p>{usuario.name}</p>
                    </div>
                    <div className="mx-4 text-end">
                        <p className="mb-1"><i class="iconos fa-solid fa-map-location-dot me-2"></i>Proximos viajes: <span className="colorAzul fw-bold">{usuario.viajes}</span></p>
                        <p className="mb-3"><i class="iconos fa-solid fa-user-group me-2"></i>Grupos: <span className="colorAzul fw-bold">{countGroups()}</span></p>
                    </div>

                </div>

                <img src={usuario.imgURL} className="rounded-circle ms-0 me-5 shadow" style={{ objectFit: 'cover', width: "120px", height: "120px" }} />

            </div>



            {/* individual trips*/}

            {trips.map((item, index) => {
                return (<div key={index} className="viaje container d-flex mb-3 my-5 rounded-pill p-2 bg-light " style={{ width: "100%", maxWidth: "65%" }}>
                    <img src={item.imgURL} className="ima rounded-circle shadow" style={{ objectFit: 'cover', width: "100px", height: "100px" }} />
                    <div className="mt-1 flex-grow-1">
                        <h6 className="mb-2">{item.destination}</h6>
                        <p className="mb-0 mt-3">{item.date}</p>
                        <p className="mb-0 mt-1">
                            <i class="iconos fa-solid fa-clock me-2"></i>
                            {item.duration}
                        </p>
                    </div>
                    <div className="d-flex flex-column justify-content-end ms-auto p-3">
                        <p className="mb-0 fw-normal">Presupuesto: <span className="colorAzul fw-bold">{item.tripBudget}</span></p>
                        <p className="mb-0 fw-normal">Presupuesto personal: <span className="colorAzul fw-bold">{item.personalBudget}</span></p>
                        <p className="mb-0 fw-normal">Número de personas: <span className="colorAzul fw-bold">{item.people}</span></p>
                    </div>

                    <div className="d-flex align-items-center ms-3 me-3 fs-3">
                        <Link to="/individual-trip" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <i className="fa-solid fa-chevron-right opacity-50"></i>
                        </Link>
                    </div>
                </div>)
            })}

            <div className="d-flex justify-content-evenly">

                <Link to="/add-new-trip" className="btn bg-light mt-5 p-3 mx-3 shadow w-50">
                    <i class="fa-solid fa-circle-plus me-2 text-success"></i>
                    Añadir un nuevo viaje
                </Link>

            </div>


        </>
    )
}

export default Viajes