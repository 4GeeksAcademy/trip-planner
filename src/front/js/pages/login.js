import React, { useState, useContext, useEffect } from "react"; // Importa useState
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext.js";


const Login = () => {
    const { store, actions } = useContext(Context);


    const [user, setUser] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (store.token) {
            navigate("/");
        }
    }, [])

    return (
        <>
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <div className="rounded shadow-lg p-4 bg-dark" style={{ width: '450px' }}>
                    <h1 className="text-center text-light">Log in</h1>
                    <div className="mb-3">
                        <label className="form-label text-light">Email address</label>
                        <input
                            type="email"
                            placeholder="email@example.co"
                            className="form-control"
                            onChange={(event) => setUser({
                                ...user,
                                email: event.target.value
                            })}
                        />
                        <div className="form-text text-light">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-1">
                        <label className="form-label text-light">Password</label>
                        <div className="d-flex">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                onChange={(event) => setUser({
                                    ...user,
                                    password: event.target.value
                                })}
                            />
                            <button className="btn btn-dark ms-1" style={{ width: '60px' }}
                                onClick={() => setShowPassword(!showPassword)}
                            >{showPassword ? (<i className="fa-solid fa-eye"></i>) : (<i className="fa-solid fa-eye-slash"></i>)}</button>
                        </div>
                        <button className="btn btn-link">Forgot your password?  </button>
                    </div>
                    <button
                        onClick={() => actions.login(user.email, user.password)}
                        className="btn btn-primary w-100 mt-1"
                    >
                        Log in
                    </button>
                    <Link to="/register" className="btn btn-link">Don't you have an account yet? Register here</Link>
                    <div className="d-flex justify-content-start opacity-50">
                        <Link to="/" className="btn btn-secondary mt-2 d-flex align-items-center rounded-3">
                            <i className="fa-solid fa-circle-chevron-left me-2"></i> Inicio
                        </Link>
                    </div>
                </div>
            </div >
        </>
    );
};

export default Login;
