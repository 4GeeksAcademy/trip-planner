import React from 'react';
import { Link } from "react-router-dom"


// datos para llenar los componentes en la vista. Hay que modificarlos para sacarlos del back-end

const trips = [
    {
        destination: 'Caracas',
        date: '22/12/2024',
        duration: "7 dias",
        people: 4,
        tripBudget: 5000,
        personalBudget: 1250,
        imgURL: "https://www.tripsavvy.com/thmb/j5_cp1Jg5lQqet7_Vl1v_7tbGqw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-501861673-03562637fcef434eb02e677cd87c8a17.jpg"
    },
    {
        destination: 'Lisboa',
        date: '13/02/2025',
        duration: "20 dias",
        people: 1,
        tripBudget: 6000,
        personalBudget: 6000,
        imgURL:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfuD1Kk-Jdz_ic7L4JdUBvTne5hvJuM3y6zg&s"
    }
];


const usuario = {
    name: "Luis Rene Silva",
    username: "LuisRe",
    viajes: trips.length,
    imgURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlsMtYnZNq08cwaY79-mFE2seVyYZ77atE5vyFUkhpLiuoKuOM"
}

const Viajes = () => {

    // aqui contamos la cantidad de grupos basado en los viajes
    const countGroups = ()=>{
        let groupNumber = 0;
            trips.forEach((trip)=>{
                if(trip.people>1){
                    groupNumber += 1;
                }
            })
        return groupNumber
    }
        
        
    return (
        <>
             {/* User Banner */}
            <div className="d-flex m-3 p-1">
                <div className="container rounded d-flex justify-content-between me-1" style={{backgroundColor: "lightgrey"}}>
                    <div className="mx-4">
                        <h5>@{usuario.username}</h5>
                        <p>{usuario.name}</p>
                    </div>
                    <div className="mx-4">
                        <p>Proximos viajes {usuario.viajes}</p>
                        <p>grupos {countGroups()}</p>
                    </div>
                    
                </div>
                <img src={usuario.imgURL} className="rounded-circle" style={{objectFit: 'contain', height: "80px"}} />
            </div>

            {/* individual trips*/}
            
            {trips.map((item, index)=>{
                return (<div key={index} className="container d-flex justify-content-around rounded-pill my-5"  style={{backgroundColor: "lightgrey", width: "60%"}}>
                    <img src={item.imgURL} className="rounded-circle" style={{objectFit: 'contain', height: "80px"}} />
                        <div className="mt-1">
                            <h6>{item.destination} {item.date}</h6>
                            <p>{item.duration}</p>
                        </div>
                        <div>
                            <p className="mb-0 fw-lighter">Trip budget: {item.tripBudget}</p>
                            <p className="mb-0 fw-lighter">Personal budget: {item.personalBudget}</p>
                            <p className="mb-0 fw-lighter"># of people: {item.people}</p>
                        </div>
                    </div>)
            })}
            <div className="container d-flex justify-content-evenly rounded-pill my-5"  
            style={{backgroundColor: "lightgrey", width: '40%'}} >
                <Link to="/add-new-trip">
                    <h1 className="align-items-center">+</h1>
                    <h3 className="align-items-center mt-2">Add a new trip</h3>
                </Link>
            </div>
            
        </>
    )
}

export default Viajes