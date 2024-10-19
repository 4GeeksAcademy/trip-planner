import React, {useState, useContext, useSyncExternalStore} from 'react';
import "../../styles/addActivityCard.css"
import { Context } from "../store/appContext.js"

const AddActivity = (props) => {
    const [activity, setActivity] = useState({
        name: "",
        author: "",
        costo: 0,
        description: "",
        imageURL: ""
        
    })
    const { actions } = useContext(Context);
    
    return (
        <div className="col-md-3">
            <div className="card rounded shadow h-100" style={{ width: '100%' }}>
                <img src="https://www.shutterstock.com/image-vector/add-icon-new-item-plus-600nw-1315566653.jpg" className="card-img-top" alt="..." style={{ height: '230px', objectFit: 'cover' }} />
                <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h5 className="card-title mb-0">
                            <input type="text" className="form-control add-form" placeholder="Nombre de la Actividad" 
                            onChange={(e) => {
                                setActivity({...activity, name: e.target.value})
                            }} />
                        </h5>
                        <p className="mb-0 text-muted small">
                            <input type="text" className="form-control add-form" placeholder="Creador"
                            onChange={(e) => {
                                setActivity({...activity, author: e.target.value})
                            }} />
                        </p>
                    </div>
                    <p className="card-text">
                        <input type="text" className="form-control add-form" placeholder="Descripccion"
                        onChange={(e) => {
                            setActivity({...activity, description: e.target.value})
                        }} />
                    </p>
                    <input type="text" className="form-control add-form" placeholder="URL de imagen" 
                            onChange={(e) => {
                                setActivity({...activity, imageUrl: e.target.value})
                            }} />
                        <div className="input-group d-flex justify-content-end align-items-center border-black border-bottom border-3  my-2">
                            <span className="p-2 rounded input-group-text">$</span>
                            <input type="text" className="form-control add-form" placeholder="Costo"
                            onChange={(e) => {
                                setActivity({...activity, cost: parseInt(e.target.value)})
                            }} />
                        </div>
                    <div className="d-flex justify-content-between align-items-center mt-auto text-center">
                        <div className="d-flex align-items-center">
                            <button className="detalles text-light btn-sm px-4"
                            onClick={()=>{actions.addActivity(activity)}} >Agregar actividad</button>
                        </div>
                    </div>
                </div>
                    <div className="card-footer text-center bg-secondary text-light p-2">
                    <p> A viajar! </p>                  
                    </div>
            </div>
        </div>
            
    )
}

export default AddActivity;