import React, { useState, useContext, useEffect } from "react"; // Importa useState
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext.js";
import "../../styles/index.css";


const Login = () => {
    const { store, actions } = useContext(Context);


    const [user, setUser] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (store.token) {
            navigate("/viajes");
        }
    }, [store.token])

    return (
        <div className="PaginaPrincipal">
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <div className="shadow-lg p-4 bg-dark" style={{ width: '450px', borderRadius: "30px"}}>
                    <h2 className="text-center text-white">Ingresar</h2>
                    <div className="mb-3">
                        <label className="form-label text-light">Correo electrónico</label>
                        <input
                            type="email"
                            placeholder="correo@ejemplo.co"
                            className="form-control rounded"
                            onChange={(event) => setUser({
                                ...user,
                                email: event.target.value
                            })}
                        />
                        <div className="form-text text-secondary opacity-75">No compartiremos tu contraseña</div>
                    </div>
                    <div className="mb-1">
                        <label className="form-label text-light ">Contraseña</label>
                        <div className="d-flex">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control rounded"
                                onChange={(event) => setUser({
                                    ...user,
                                    password: event.target.value
                                })}
                            />
                            <button className="btn btn-dark ms-1" style={{ width: '60px' }}
                                onClick={() => setShowPassword(!showPassword)}
                            >{showPassword ? (<i className="fa-solid fa-eye"></i>) : (<i className="fa-solid fa-eye-slash"></i>)}</button>
                        </div>
                    </div>
                    <button
                        onClick={() => actions.login(user.email, user.password)}
                        className="btn btn-primary w-100 mt-1 rounded-pill mt-3"
                    >
                        Ingresar
                    </button>
                    <Link to="/register" className="btn btn-link">¿No tienes una cuenta aún? Registrate aquí</Link>
                    <div className="d-flex justify-content-start">
                        <Link to="/" className="btn btn-secondary mt-2 d-flex align-items-center rounded-pill">
                            <i className="fa-solid fa-circle-chevron-left me-2"></i> Inicio
                        </Link>
                    </div>
                </div>
            </div >
        </div>
    );
};

export default Login;
