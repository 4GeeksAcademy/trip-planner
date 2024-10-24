import React, { useContext } from "react";
import { Link , useLocation} from "react-router-dom"
import { Context } from "../store/appContext"
import "../../styles/home.css";
import logo from "../../img/logo-trippy.png"
import "../../styles/footer.css"

export const Navbar = ({ isLandingPage }) => {

	const { store, actions } = useContext(Context);
	const location = useLocation();

	const islanding = location.pathname === "/";

	const textColorClass = islanding ? "text-white" : "text-dark";

	return (
		<nav id="navbar" className="d-flex px-5 justify-content-center align-items-center relative">
			<Link className="container ps-5 mt-1" to="/">
				<img src={logo} className="logo" style={{ width: '120px' }} />
			</Link>
			<div className="d-flex">
				<Link to="/">
					<button className={`border border-0 bg-transparent mx-3 fw-bold ${textColorClass}`}>INICIO</button>
				</Link>
				<Link to="/viajes">
					<button className={`border border-0 bg-transparent mx-3 fw-bold ${textColorClass}`}>VIAJES</button>
				</Link>
				{!store.token && <Link to="/login">
					<button className={`border border-0 bg-transparent mx-3 fw-bold ${textColorClass}`}>INGRESAR</button>
				</Link>}

				{store.user && store.token && (
					<div className="dropdown">
						<button className="border border-0 bg-transparent mx-3  fw-bold dropdown-toggle text-white" type="button" data-bs-toggle="dropdown" aria-expanded="false">
							{store.user?.username?.toUpperCase()}
						</button>
						<ul className="dropdown-menu dropdown-menu-dark">
							<li><a className={`dropdown-item text-danger ${textColorClass}`} onClick={() => actions.logout()}>SALIR</a></li>
						</ul>
					</div>)}
				{
					!store.token && <Link to="/register"><button className={`border border-0 bg-transparent mx-3 fw-bold ${textColorClass}`}>REGISTRATE</button></Link>
				}
			</div>
		</nav>
	);
};
