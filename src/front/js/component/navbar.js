import React, {useContext} from "react";
import { Link } from "react-router-dom"
import {Context} from "../store/appContext"

export const Navbar = () => {

	const {store, actions} = useContext(Context);

	return (
		<nav className="d-flex px-5 mt-2">
			<div className="container ps-5 mt-1">
				<p>LOGO</p>
			</div>
			<div className="d-flex">
				<button className="border border-0 bg-transparent mx-2">INICIO</button>
				<button className="border border-0 bg-transparent mx-2">GRUPOS</button>
				<button className="border border-0 bg-transparent mx-2">VIAJES</button>
				<button className="border border-0 bg-transparent mx-2">EXPLORA</button>
				{!store.token && <Link to="/login">
					<button className="border border-0 bg-transparent mx-4">INGRESAR</button>
				</Link>}
				{store.token && <button className="border border-0 bg-transparent mx-4 text-danger" onClick={()=> actions.logout()}>SALIR</button>}
				<button className="border border-0 bg-transparent mx-2">REGISTRATE</button>
			</div>
		</nav>
	);
};
