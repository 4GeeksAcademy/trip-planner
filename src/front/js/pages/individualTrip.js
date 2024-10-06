import React from 'react';
import { Navbar } from "../component/navbar.js";
import Card from "../component/ActivityCard.jsx"

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
    }
]


const IndividualTrip = () => {
    return (
        <>
            <Navbar />
            <div className="container d-flex">
                {activities.map((item, index)=>{
                    return (<Card key={index} actividad={item.name} costo={item.cost} autor={item.author} likes={item.likes} image={item.imageUrl} />)
                })}
                
            </div>
        </>
    )
}
export default IndividualTrip