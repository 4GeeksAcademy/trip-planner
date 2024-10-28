import React, { Component } from "react";
import logo from "../../img/logo-landing.png"
import "../../styles/footer.css"
import { Link } from 'react-router-dom';

export const Footer = () => (
<footer className="text-white pt-3 mt-5" style={{backgroundColor: '#111d4a'}}>
    <div className="container d-flex justify-content-between p-0 mb-1 mt-2">
        <div>
        <p><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Explora destinos</Link></p>
        <p><Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Iniciar sesión</Link></p>
        <p><Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Registrate</Link></p>
        </div>
    <div className="d-flex justify-content-end">
        <img src={logo} alt="Logo" style={{ height: '60px' }} />
    </div>
    </div>

    <div className="d-flex justify-content-center">
        <p className=" mt-1 fst-italic text-center opacity-50" style={{fontSize: '14px'}}>Compartiendo experiencias, creando recuerdos...</p>
    </div>

</footer>
	
);

export default Footer
