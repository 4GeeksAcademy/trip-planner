import React from 'react';
import {Link} from 'react-router-dom';
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
            <div className="d-flex m-3 p-1">
                <div className="container rounded d-flex justify-content-around" style={{backgroundColor: "lightgrey"}}>
                    <div className="d-flex justify-content-between" style={{width: "50%"}} >
                        <h5>Nombre de Viaje</h5>
                        <p>DD/MM/AAAA</p>
                        <p>Presupuesto</p>

                    </div>
                    <div className="mx-4">
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                            Miembros
                        </button>
                        <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                            {miembros.map((item, index)=>{
                                return (<li key={index}><p className="dropdown-item" href="#">{item.name}</p></li>)
                            })}
                                                    </ul>
                        </div>
                    </div>
                    
                </div>
                
            </div>
            <div>
                <ShoppingCart />
            </div>
            <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 text-center g-6">
                {activities.map((item, index)=>{
                    return (
                    // <Card className="col" key={index} actividad={item.name} costo={item.cost} autor={item.author} likes={item.likes} image={item.imageUrl} />
                    <div key={index} className="col">
                    <div className="card h-100">
                      <img src={item.imageUrl} className="card-img-top" alt="..." />
                      <div className="card-body">
                        <div className="card-title d-flex  justify-content-around">
                            <h5>{item.name}</h5>
                            <span className="border">{item.author}</span>
                        </div>
                        <p className="card-text">{item.description}</p>
                        <div className="d-flex justify-content-around">
                            <Link to="/details" className="btn btn-primary">Detalles</Link>
                            <span className="border mt-2">{item.cost}</span>
                            <span className="border">{item.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
                })}
                
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