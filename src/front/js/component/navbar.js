import React, { useContext } from "react";
import { Link } from "react-router-dom"
import { Context } from "../store/appContext"
import "../../styles/home.css";
import logo from "../../img/logo-trippy.png"
import "../../styles/footer.css"

export const Navbar = ({ isLandingPage }) => {

	const { store, actions } = useContext(Context);

	return (
		<nav id="navbar" className="d-flex px-5 justify-content-center align-items-center relative">
			<Link className="container ps-5 mt-1" to="/">
				<img src={logo} className="logo" style={{ width: '120px' }}/>
			</Link>
			<div className="d-flex white">
				<Link to="/">
					<button className="border border-0 bg-transparent mx-3 text-light fw-bold">INICIO</button>
				</Link>
				<button className="border border-0 bg-transparent mx-3 text-light fw-bold">GRUPOS</button>
				<Link to="/viajes">
					<button className="border border-0 bg-transparent mx-3 text-light fw-bold">VIAJES</button>
				</Link>
				<button className="border border-0 bg-transparent mx-3 text-light fw-bold">EXPLORA</button>
				{!store.token && <Link to="/login">
					<button className="border border-0 bg-transparent mx-3 text-light fw-bold">INGRESAR</button>
				</Link>}
				{
					store.user && store.token && <p className="mx-2 mb-0 text-secondary" style={{ padding: '1px 6px' }}>{store.user?.username?.toUpperCase()}</p>
				}
				{store.token && <button className="border border-0 bg-transparent mx-2 text-danger" onClick={() => actions.logout()}>SALIR</button>}
				{
					!store.token && <Link to="/register"><button className="border border-0 bg-transparent mx-3 text-light fw-bold">REGISTRATE</button></Link>
				}
			</div>
		</nav>
	);
};
