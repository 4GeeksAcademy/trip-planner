import React from 'react';
import {Link} from 'react-router-dom';
import { Link } from 'react-router-dom';
import ShoppingCart from "../component/shoppingCart.js"

const activities = [
    {
        name: "Cafecito",
        cost: 20,
        likes: 0,
        author: "LuisR",
        description: "Cafe oro. Horario de 9 am a 3 pm. tiene wifi",
        duration: "",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOc7EaMLv5mZsW_kQ5PNCWvZjMDAP8kjwmVQ&s"
    },
    {
        name: "Cafecito",
        cost: 20,
        likes: 0,
        author: "LuisR",
        description: "Cafe oro. Horario de 9 am a 3 pm. tiene wifi",
        duration: "",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOc7EaMLv5mZsW_kQ5PNCWvZjMDAP8kjwmVQ&s"
    },
    {
        name: "Parque",
        cost: 0,
        likes: 2,
        author: "LuisR",
        description: "Caminata en el parque. Horario de 6 am a 6 pm.",
        duration: "",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1QMAB9axRPNNiyX37JpBDrL6VZmU7zTG9cA&s"
    },
    {
        name: "CCS Meat Co",
        cost: 180,
        likes: 1000,
        author: "LuisR",
        description: "Cafe oro. Horario de 9 am a 10 pm. tiene wifi",
        duration: "",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiuQNA-Q4I_Z68GX3XHx_CGKY7iBTYq4Z6hA&s"
    },
    {
        name: "Parque",
        cost: 0,
        likes: 2,
        author: "LuisR",
        description: "Caminata en el parque. Horario de 6 am a 6 pm.",
        duration: "",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1QMAB9axRPNNiyX37JpBDrL6VZmU7zTG9cA&s"
    },
    {
        name: "Parque",
        cost: 0,
        likes: 2,
        author: "LuisR",
        description: "Caminata en el parque. Horario de 6 am a 6 pm.",
        duration: "",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1QMAB9axRPNNiyX37JpBDrL6VZmU7zTG9cA&s"
    },
    {
        name: "CCS Meat Co",
        cost: 180,
        likes: 1000,
        author: "LuisR",
        description: "Cafe oro. Horario de 9 am a 10 pm. tiene wifi",
        duration: "",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiuQNA-Q4I_Z68GX3XHx_CGKY7iBTYq4Z6hA&s"
    },
    {
        name: "CCS Meat Co",
        cost: 180,
        likes: 1000,
        author: "LuisR",
        description: "Cafe oro. Horario de 9 am a 10 pm. tiene wifi",
        duration: "",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiuQNA-Q4I_Z68GX3XHx_CGKY7iBTYq4Z6hA&s"
    }
]

const miembros = [
    {
        name: "Cesar",

    },
    {
        name: "Adriana",

    },
    {
        name: "Carlos",

    },
    {
        name: "Kevin",

    }
]

const IndividualTrip = () => {
    return (
        <>
            <div className="container">

                <div className=" rounded d-flex flex-column flex-md-row justify-content-between  bg-opacity-10 bg-dark p-4 shadow">
                    <div className="d-flex flex-column flex-md-row justify-content-between" style={{ width: "80%" }} >
                        <h5 className="mb-1">Nombre de Viaje</h5>
                        <p className="mb-1">DD/MM/AAAA</p>
                        <p className="mb-1">Presupuesto</p>

                    </div>
                    <div className="mx-4 mt-3 mt-md-0">
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle shadow" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-solid fa-user-group me-2"></i>
                                Miembros
                            </button>
                            <ul className="dropdown-menu dropdown-menu-dark p-1" aria-labelledby="dropdownMenuButton2">
                                {miembros.map((item, index) => {
                                    return (<li key={index}><p className="dropdown-item d-flex justify-content-between align-items-center" href="#">{item.name}<i class="fa-solid fa-circle-info fs-5"></i></p></li>)
                                })}
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <p className="dropdown-item" href="#"> <i class="fa-solid fa-user-plus me-2"></i>Agregar miembro</p>
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
                    {activities.map((item, index) => {
                        return (
                            // <Card className="col" key={index} actividad={item.name} costo={item.cost} autor={item.author} likes={item.likes} image={item.imageUrl} />
                            <div key={index} className="col-md-3">
                                <div className="card rounded shadow h-100" style={{ width: '100%' }}>
                                    <img src={item.imageUrl} className="card-img-top" alt="..." style={{ height: '280px', objectFit: 'cover' }} />
                                    <div className="card-body d-flex flex-column">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <h5 className="card-title mb-0">{item.name}</h5>
                                            <p className="mb-0 text-muted small"><i class="fa-solid fa-user me-2"></i>{item.author}</p>
                                        </div>
                                        <p className="card-text">{item.description}</p>
                                            <div className="d-flex justify-content-end align-items-center border-black border-bottom border-3  my-2">
                                                <span className="p-2 rounded">${item.cost}</span>
                                            </div>
                                        <div className="d-flex justify-content-between align-items-center mt-auto">
                                            <Link to="/details" className="btn btn-primary btn-sm px-4">Detalles</Link>
                                            <div className="d-flex align-items-center">
                                                <button className="bg-transparent border-0"><i class="fa-solid fa-heart me-2"></i>{item.likes}</button>
                                            </div>
                                        </div>
                                    </div>
                                        <div class="card-footer text-center bg-dark bg-opacity-10 text-light p-2">
                                            <button className="btn btn btn-light btn-sm px-4 shadow-sm">
                                            <i class="fa-solid fa-circle-plus me-2"></i>
                                             Agregar a mi viaje
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
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div> */}