import '../../styles/viajes.css';
import React from "react";


const infoComentarios = [
    { id: 1, usuario: '@maria', mensaje: '¡Este post es muy interesante!' },
    { id: 2, usuario: '@pedro', mensaje: 'Estoy de acuerdo con lo que dices' },
    { id: 2, usuario: '@pedro', mensaje: 'Me gusta la idea' },

];

const TripDetail = () => {
    return (

        <div className="container-fluid mx-auto p-2">
            <div className="d-flex justify-content-center mt-4 rounded">
                <div className="rounded rounded-3 border shadow-sm" style={{ width: "80%" }}>
                    <img src="https://images.unsplash.com/photo-1606574977100-456d9a074578?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TW9udW1lbnRvcyUyMGN1bHR1cmFsZXN8ZW58MHx8MHx8fDA%3D" 
                    style={{ width: "100%", height: "450px", objectFit: "cover" }} alt="Paisaje" />
                    <div className="fondoNaranja rounded-bottom rounded-3 p-3 text-light">
                        <h3 className="fw-semibold">Ciudad, País</h3>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-center mt-5">
                <div className="d-flex m-3" style={{ width: "80%" }}>
                    <div className="me-3 border-black border-end border-3 border-dark">
                        <h5 className="mb-3">Descripción</h5>
                        <blockquote className="blockquote mb-0">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lobortis nisi sit amet eros pharetra, id lobortis lectus ultricies. Quisque lectus urna, lobortis in risus eget, rutrum sagittis magna. Aenean euismod sapien erat, non volutpat metus egestas et. Donec tempus ex nec imperdiet convallis. Vestibulum venenatis nisi elit, vitae porta tellus blandit ac. Nullam lobortis arcu eget tellus elementum rhoncus. Sed in elit ut velit accumsan hendrerit.</p>
                        </blockquote>
                    </div>

                    <div className="card bg-light " style={{ width: "60rem", height: "7rem" }}>
                        <div className="card-header text-center">
                            Costo aproximado
                        </div>
                        <div className="card-body text-center p-2">
                            <h2 className="card-text colorAzul">1000 $</h2>
                        </div>
                    </div>
                </div>
            </div>



            <div className="d-flex justify-content-center mt-5">
                <div className="d-flex" style={{ width: "80%" }}>
                    <h5 className="margin-left">Comentarios</h5>

                    <div className="container m-3 p-0">

                        <div className=" p-2">
                            {infoComentarios.map(comentario => (
                                <div className="media mb-4" key={comentario.id}>
                                    <div className=" rounded rounded-3 border shadow-sm bg-light m-2 p-2">
                                        <h6 className="mt-0 colorNaranja">{comentario.usuario}</h6>
                                        {comentario.mensaje}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>



    );
}

export default TripDetail;