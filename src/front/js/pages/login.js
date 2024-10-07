import React, { useState } from "react"; // Importa useState
import { Navbar } from "../component/navbar.js";

const Login = () => {
    const [user, setUser] = useState({});
    const [showPassword, setShowPassword] = useState(false);


    return (
        <>
            <Navbar />
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <div className="rounded shadow-lg p-4 bg-dark" style={{ width: '300px' }}>
                    <h1 className="text-center text-light">Login</h1>
                    <div className="mb-3">
                        <label className="form-label text-light">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            onChange={(event) => setUser({
                                ...user,
                                email: event.target.value
                            })}
                        />
                        <div className="form-text text-light">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
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
                            >{showPassword ? (<i class="fa-solid fa-eye"></i>) : (<i className="fa-solid fa-eye-slash"></i>)}</button>
                        </div>
                        <button className="btn btn-link">Forgot your password?  </button>
                    </div>
                    <button
                        onClick={() => console.log(user)}
                        className="btn btn-primary w-100 mt-2"
                    >
                        Login
                    </button>
                    <button className="btn btn-secondary w-100 mt-2">Register</button>
                </div>
            </div >
        </>
    );
};

export default Login;
