import React from "react";
import "../../styles/expaises.css";
import { Link } from "react-router-dom";
export default function Mexico() {
    return (
        <div>
            <div id="pais">
                <img id="cancun" src="https://blogskystorage.s3.amazonaws.com/2023/06/que-hacer-en-cancun.jpeg" className="img-fluid rounded-pill" />
            </div>
            <div>
                <p className="text-center fs-1 fw-bold">Cancún, México</p>
            </div>
            <div id="borde" className="mt-5">
                <img id="patron" src="https://static.vecteezy.com/system/resources/previews/007/816/364/non_2x/mayan-patchwork-seamless-pattern-bright-multicolor-background-vector.jpg" className="img-fluid rounded-pill" />
            </div>
            <div className="activity-list">
                <div className="activity-card">
                    <div className="image-container">
                        <img src="https://www.hotelescancun.mx/wp-content/uploads/2017/04/actividades-en-cancun.jpg" alt="Fly board" />
                    </div>
                    <div className="description">
                        <p>Flyboard en Cancún</p>
                    </div>
                    <button className="add-btn ">
                        <Link to="/login" className="link">❤️ agregar</Link>
                    </button>
                </div>
                <div className="activity-card">
                    <div className="image-container">
                        <img src="https://revistaiberica.com/wp-content/uploads/2020/08/cancun_activividades.jpg" alt="Kayak" />
                    </div>
                    <div className="description">
                        <p>Kayak en Cancún</p>
                    </div>
                    <button className="add-btn ">
                        <Link to="/login" className="link">❤️ agregar</Link>
                    </button>
                </div>
                <div className="activity-card">
                    <div className="image-container">
                        <img src="https://excursionesenlarivieramaya.com/wp-content/uploads/2018/11/disfrutar-de-actividades-en-cancun-en-xcaret.jpg" alt="Xcaret" />
                    </div>
                    <div className="description">
                        <p>Xcaret</p>
                    </div>
                    <button className="add-btn ">
                        <Link to="/login" className="link">❤️ agregar</Link>
                    </button>
                </div>
            </div>
        </div>
    )
}