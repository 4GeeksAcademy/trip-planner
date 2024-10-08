import React, { useContext } from "react";
import { Link } from "react-router-dom"
import { Context } from "../store/appContext"

export const Navbar = () => {

	const { store, actions } = useContext(Context);

	return (
		<nav className="d-flex px-5 mt-2 justify-content-center align-items-center">
			<div className="container ps-5 mt-1">
				<p>LOGO</p>
			</div>
			<div className="d-flex">
				<Link to="/">
					<button className="border border-0 bg-transparent mx-2">INICIO</button>
				</Link>
				<button className="border border-0 bg-transparent mx-2">GRUPOS</button>
				<Link to="/viajes">
					<button className="border border-0 bg-transparent mx-2">VIAJES</button>
				</Link>
				<button className="border border-0 bg-transparent mx-2">EXPLORA</button>
				{!store.token && <Link to="/login">
					<button className="border border-0 bg-transparent mx-2">INGRESAR</button>
				</Link>}
				{store.token && <button className="border border-0 bg-transparent mx-4 text-danger" onClick={() => actions.logout()}>SALIR</button>}
				{
					store.user && <p className="mx-2 mb-0 text-dark">{store.user?.username?.toUpperCase()}</p>
				}
				{
					!store.token && <button className="border border-0 bg-transparent mx-2">REGISTRATE</button>
				}
			</div>
		</nav>
	);
};
