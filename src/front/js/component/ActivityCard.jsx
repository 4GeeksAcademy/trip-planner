import React from 'react'

const ActivityCard = (props)=> {
    return (
        <>
            <div className="card" style={{width: "18rem"}}>
                <img src={props.image} className="card-img-top" alt="..." />
                <div className="card-body">
                    <div className="card-title d-flex justify-content-around"><h5>{props.actividad}</h5><span className="border">{props.autor}</span></div>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <div className="d-flex justify-content-around">
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                        <span className="border mt-2">{props.costo}</span>
                        <span className="border">{props.likes}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ActivityCard;