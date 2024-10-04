import React from "react";

export const Navbar = () => {
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
				<button className="border border-0 bg-transparent mx-4">INICIAR SESIÓN</button>
				<button className="border border-0 bg-transparent mx-2">REGISTRATE</button>
			</div>
		</nav>
	);
};
